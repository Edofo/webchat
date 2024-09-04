import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { LoginInput, RegisterInput } from '../interfaces/auth.dto'
import { LoginResponse, RegisterResponse } from '../models/auth.model'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('data') data: LoginInput): Promise<LoginResponse> {
    const user = await this.authService.validateUser(data)
    return this.authService.login(user)
  }

  @Mutation(() => RegisterResponse)
  async register(@Args('data') data: RegisterInput): Promise<RegisterResponse> {
    const user = await this.authService.register(data)
    return this.authService.login(user)
  }
}
