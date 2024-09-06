import { Injectable } from '@nestjs/common'

import { ChatMessage } from '../models/chat-object.model'
import { PrismaService } from '@/infrastructure/database/services/prisma.service'

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoomMessages(roomId: string): Promise<ChatMessage[]> {
    // return await this.prismaService.message.findMany({
    //   where: {
    //     roomId
    //   },
    //   include: {
    //     user: true
    //   }
    // })
    return [
      {
        id: '1',
        content: 'Hello',
        createdAt: new Date(),
        user: {
          id: '1',
          pseudo: 'JohnDoe'
        }
      }
    ]
  }

  async sendMessage(userId: string, friendId: string, message: string): Promise<ChatMessage> {
    const newMessage = await this.prismaService.message.create({
      data: {
        senderId: userId,
        receiverId: friendId,
        content: message
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        sender: { select: { id: true, pseudo: true } }
      }
    })

    return {
      id: newMessage.id,
      content: newMessage.content,
      createdAt: newMessage.createdAt,
      user: {
        id: newMessage.sender.id,
        pseudo: newMessage.sender.pseudo
      }
    }
  }
}
