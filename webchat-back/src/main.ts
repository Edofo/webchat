import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'

import { ConfigurationService } from '@infrastructure/configuration/services/configuration.service'
import { LoggerService } from '@infrastructure/logger/services/logger.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigurationService)
  const logger = app.get(LoggerService)

  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  // app.enableVersioning({ type: VersioningType.URI });

  // Middlewares
  app.use(morgan('dev'))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  app.use(helmet({ contentSecurityPolicy: false }))
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })
  app.use(cookieParser())

  await app.listen(config.appConfig.port)
  logger.info(`🚀 Application is running on: ${await app.getUrl()}`, 'bootstrap')
}
bootstrap()
