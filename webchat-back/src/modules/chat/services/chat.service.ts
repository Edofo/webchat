import { Injectable } from '@nestjs/common'

import { ChatMessage } from '../models/chat-object.model'
import { PrismaService } from '@/infrastructure/database/services/prisma.service'

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoomMessages(friendId: string): Promise<ChatMessage[]> {
    const messages = await this.prismaService.message.findMany({
      where: {
        OR: [{ senderId: friendId }, { receiverId: friendId }]
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        sender: { select: { id: true, pseudo: true } }
      }
    })

    return messages.map(message => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      user: {
        id: message.sender.id,
        pseudo: message.sender.pseudo
      }
    }))
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
