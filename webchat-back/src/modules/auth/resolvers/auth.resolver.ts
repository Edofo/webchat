import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { LoginInput, RegisterInput } from '../models/auth-input.model'
import { AuthUser, LoginResponse, RegisterResponse } from '../models/auth-object.model'
import { AuthService } from '../services/auth.service'
import { GetUser } from '@/decorators/get-user.decorator'
import { Public } from '@/decorators/public.decorator'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthUser)
  async getMe(@GetUser() user: AuthUser): Promise<AuthUser> {
    return user
  }

  @Public()
  @Mutation(() => LoginResponse)
  async login(@Args('data') data: LoginInput): Promise<LoginResponse> {
    const user = await this.authService.login(data)
    return {
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      },
      token: await this.authService.generateAccessToken(user.id)
    }
  }

  @Public()
  @Mutation(() => RegisterResponse)
  async register(@Args('data') data: RegisterInput): Promise<RegisterResponse> {
    const user = await this.authService.register(data)
    return {
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      },
      token: await this.authService.generateAccessToken(user.id)
    }
  }
}
