import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthService } from '../services/auth.service'
import { ConfigurationService } from '@/infrastructure/configuration/services/configuration.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigurationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: configService.jwtConfig.jwtSecret
    })
  }

  private static extractJwtFromCookie(req: Request) {
    if (!req?.cookies) return null
    return req.cookies['jwt']
  }

  async validate({ id }: { id: string }) {
    const user = await this.authService.authenticateUser(id)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
