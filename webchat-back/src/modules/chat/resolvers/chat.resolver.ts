import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'

import { GetUser } from '@decorators/get-user.decorator'

import { ChatMessage } from '../models/chat-object.model'
import { ChatService } from '../services/chat.service'
import { pubSub } from '@/pubsub'
import { AuthUser } from '@/types/modules/auth.types'

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [ChatMessage])
  async getRoomMessages(@Args('friendId') friendId: string): Promise<ChatMessage[]> {
    return await this.chatService.getRoomMessages(friendId)
  }

  @Mutation(() => ChatMessage)
  async sendMessage(
    @GetUser() user: AuthUser,
    @Args('friendId') friendId: string,
    @Args('message') message: string
  ): Promise<ChatMessage> {
    const messageSent = await this.chatService.sendMessage(user.id, friendId, message)
    const payload: ChatMessage = {
      id: messageSent.id,
      content: messageSent.content,
      createdAt: new Date(messageSent.createdAt),
      user: {
        id: user.id,
        pseudo: user.pseudo
      }
    }
    const roomId = [user.id, friendId].sort().join('-')
    pubSub.publish(`userJoinedRoom-${roomId}`, payload)
    return messageSent
  }

  @Subscription(() => ChatMessage, {
    resolve: payload => payload
  })
  userJoinedRoom(@GetUser() { id: userId }: AuthUser, @Args('friendId') friendId: string) {
    const roomId = [userId, friendId].sort().join('-')
    return pubSub.asyncIterator(`userJoinedRoom-${roomId}`)
  }
}
