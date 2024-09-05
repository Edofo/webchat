import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { ConfigurationService } from '@infrastructure/configuration/services/configuration.service'
import { PrismaService } from '@infrastructure/database/services/prisma.service'

import { LoginInput, RegisterInput } from '../interfaces/auth.dto'
import { AuthUser } from '@/types/modules/auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigurationService
  ) {}

  async generateAccessToken(userId: string) {
    const payload = { id: userId }
    return jwt.sign(payload, this.configService.jwtConfig.jwtSecret)
  }

  async authenticateUser(id: string): Promise<AuthUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        pseudo: true,
        email: true
      }
    })
    if (!user) return null
    return user
  }

  async register(data: RegisterInput): Promise<AuthUser> {
    const checkUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ pseudo: data.pseudo }, { email: data.email }]
      }
    })

    if (checkUser) throw new ConflictException('User already exists')

    const hashedPassword = await bcrypt.hash(data.password, 10)

    return await this.prismaService.user.create({
      data: {
        pseudo: data.pseudo,
        email: data.email,
        password: hashedPassword
      },
      select: {
        id: true,
        pseudo: true,
        email: true
      }
    })
  }

  async login(data: LoginInput): Promise<AuthUser> {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email }
    })

    if (!user) throw new ConflictException('Invalid credentials')

    const validPassword = await bcrypt.compare(data.password, user.password)
    if (!validPassword) throw new ConflictException('Invalid credentials')

    return {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email
    }
  }
}
