import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginResponse {
  @Field(() => ID)
  id: string

  @Field()
  token: string
}

@ObjectType()
export class RegisterResponse {
  @Field(() => ID)
  id: string

  @Field()
  token: string
}
