import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { LoginInput, RegisterInput } from '../interfaces/auth.dto'
import { LoginResponse, RegisterResponse } from '../models/auth.model'
import { AuthService } from '../services/auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
