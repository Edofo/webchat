import { Module } from '@nestjs/common'

import { ChatResolver } from './resolvers/chat.resolver'
import { ChatService } from './services/chat.service'

@Module({
  providers: [ChatResolver, ChatService]
})
export class ChatModule {}
