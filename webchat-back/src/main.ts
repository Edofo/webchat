import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'

import { ConfigurationService } from '@infrastructure/configuration/services/configuration.service'
import { GlobalExceptionFilter } from '@infrastructure/filter/global-exception.filter'
import { LoggerInterceptor } from '@infrastructure/logger/logger.interceptor'
import { LoggerService } from '@infrastructure/logger/services/logger.service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigurationService)
  const logger = app.get(LoggerService)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Middlewares
  app.use(morgan('dev'))
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  app.use(helmet({ contentSecurityPolicy: false }))
  app.enableCors({
    origin: ['http://localhost', 'http://localhost:5173', 'http://localhost:80'],
    credentials: true
  })
  app.use(cookieParser())

  app.useGlobalFilters(new GlobalExceptionFilter(logger))
  app.useGlobalInterceptors(new LoggerInterceptor(logger))

  await app.listen(config.appConfig.port)
  logger.info(`🚀 Application is running on: ${await app.getUrl()}`, 'bootstrap')
}
bootstrap()
