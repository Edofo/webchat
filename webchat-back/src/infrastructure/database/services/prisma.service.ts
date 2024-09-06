import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit, Scope } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { LoggerService } from '@infrastructure/logger/services/logger.service'

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new LoggerService()

  async onModuleInit() {
    try {
      this.logger.info('Connecting to the database', this.constructor.name)
      await this.$connect()
    } catch (error) {
      this.logger.error('Error connecting to the database', this.constructor.name, String(error))
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      this.logger.info('Disconnecting from the database', this.constructor.name)
      await app.close()
    })
  }
}
