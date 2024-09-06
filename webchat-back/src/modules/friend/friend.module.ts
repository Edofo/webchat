import { Module } from '@nestjs/common'

import { FriendResolver } from './resolvers/friend.resolver'
import { FriendService } from './services/friend.service'

@Module({
  providers: [FriendResolver, FriendService]
})
export class FriendModule {}
