import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '@infrastructure/database/services/prisma.service'

import { FriendResponse } from '../models/friend-object.model'

@Injectable()
export class FriendService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyFriends(userId: string): Promise<FriendResponse[]> {
    const friendsList = await this.prismaService.friend.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }]
      },
      select: {
        sender: { select: { id: true, pseudo: true, isOnline: true } },
        receiver: { select: { id: true, pseudo: true, isOnline: true } }
      }
    })

    return friendsList.map(({ sender, receiver }) => {
      if (sender.id === userId) return receiver
      return sender
    })
  }

  async addFriend(
    userId: string,
    pseudo: string
  ): Promise<{ sender: FriendResponse; receiver: FriendResponse }> {
    const friend = await this.prismaService.user.findUniqueOrThrow({
      where: { pseudo, AND: { NOT: { id: userId } } },
      select: { id: true }
    })

    const checkRelation = await this.prismaService.friend.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: friend.id },
          { senderId: friend.id, receiverId: userId }
        ]
      }
    })
    if (checkRelation) throw new ConflictException('You are already friend with this user')

    const { sender, receiver } = await this.prismaService.friend.create({
      data: {
        senderId: userId,
        receiverId: friend.id
      },
      select: {
        sender: { select: { id: true, pseudo: true, isOnline: true } },
        receiver: { select: { id: true, pseudo: true, isOnline: true } }
      }
    })
    return { sender, receiver }
  }
}
