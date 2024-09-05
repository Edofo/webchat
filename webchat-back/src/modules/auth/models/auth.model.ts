import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthUser {
  @Field(() => ID)
  id: string

  @Field()
  pseudo: string

  @Field()
  email: string
}

@ObjectType()
export class LoginResponse {
  @Field(() => AuthUser)
  user: AuthUser

  @Field()
  token: string
}

@ObjectType()
export class RegisterResponse {
  @Field(() => AuthUser)
  user: AuthUser

  @Field()
  token: string
}
