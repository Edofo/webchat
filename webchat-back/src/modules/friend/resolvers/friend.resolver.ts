import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'

import { FriendResponse } from '../models/friend-object.model'
import { FriendService } from '../services/friend.service'
import { GetUser } from '@/decorators/get-user.decorator'
import { AuthUser } from '@/modules/auth/models/auth-object.model'
import { pubSub } from '@/pubsub'

@Resolver()
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => [FriendResponse])
  async getMyFriends(@GetUser() user: AuthUser): Promise<FriendResponse[]> {
    return await this.friendService.getMyFriends(user.id)
  }

  @Mutation(() => FriendResponse)
  async addFriend(
    @GetUser() user: AuthUser,
    @Args('pseudo') pseudo: string
  ): Promise<FriendResponse> {
    const { sender, receiver } = await this.friendService.addFriend(user.id, pseudo)
    pubSub.publish(`userFriend-${receiver.id}`, sender)
    return receiver
  }

  @Subscription(() => FriendResponse, {
    resolve: payload => payload
  })
  userFriend(@GetUser() user: AuthUser) {
    return pubSub.asyncIterator(`userFriend-${user.id}`)
  }
}
