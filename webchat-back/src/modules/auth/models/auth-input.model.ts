import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class RegisterInput {
  @Field()
  email: string

  @Field()
  pseudo: string

  @Field()
  password: string
}
