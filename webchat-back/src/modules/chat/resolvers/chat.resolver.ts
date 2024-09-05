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
  async getRoomMessages(@Args('roomId') roomId: string): Promise<ChatMessage[]> {
    return await this.chatService.getRoomMessages(roomId)
  }

  @Mutation(() => ChatMessage)
  async sendMessage(
    @GetUser() user: AuthUser,
    @Args('roomId') roomId: string,
    @Args('message') message: string
  ): Promise<ChatMessage> {
    const messageSent = await this.chatService.sendMessage(user, roomId, message)
    pubSub.publish('userJoinedRoom-' + roomId, {
      id: messageSent.id,
      text: messageSent.text,
      createdAt: new Date(messageSent.createdAt),
      user: {
        id: user.id,
        pseudo: user.pseudo
      }
    })
    return messageSent
  }

  @Subscription(() => ChatMessage, {
    resolve: payload => payload
  })
  userJoinedRoom(@Args('roomId') roomId: string) {
    return pubSub.asyncIterator(`userJoinedRoom-${roomId}`)
  }
}
