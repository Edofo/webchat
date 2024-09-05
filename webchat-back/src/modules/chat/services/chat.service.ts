import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/database/services/prisma.service'

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRoomMessages(roomId: string) {
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
        text: 'Hello',
        createdAt: new Date(),
        user: {
          id: '1',
          pseudo: 'JohnDoe'
        }
      }
    ]
  }

  async sendMessage(user, roomId, message) {
    // return await this.prismaService.message.create({
    //   data: {
    //     text: message,
    //     user: {
    //       connect: {
    //         id: user.id
    //       }
    //     },
    //     room: {
    //       connect: {
    //         id: roomId
    //       }
    //     }
    //   }
    // })
    return {
      id: '1',
      text: message,
      createdAt: new Date(),
      user: {
        id: user.id,
        pseudo: user.pseudo
      }
    }
  }
}
