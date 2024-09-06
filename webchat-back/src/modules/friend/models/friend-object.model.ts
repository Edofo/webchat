import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FriendResponse {
  @Field(() => ID)
  id: string

  @Field(() => String)
  pseudo: string

  @Field(() => Boolean)
  isOnline: boolean
}
