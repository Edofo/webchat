import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserMessage {
  @Field()
  id: string

  @Field()
  pseudo: string
}

@ObjectType()
export class ChatMessage {
  @Field()
  id: string

  @Field()
  text: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => UserMessage)
  user: UserMessage
}
