import { Catch, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { red } from 'chalk'
import { GraphQLError } from 'graphql'

import { LoggerService } from '../logger/services/logger.service'

const LOG_PREFIX = red('Response/Error')

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private readonly logger: LoggerService

  constructor(logger: LoggerService) {
    this.logger = logger
  }

  catch(exception: unknown) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(
        `${LOG_PREFIX} Prisma Error: ${exception.code} - ${exception.message}`,
        this.constructor.name
      )

      return new GraphQLError('Prisma client error', {
        extensions: {
          code: exception.code,
          message: exception.message,
          exception
        }
      })
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse()
      const statusCode = exception.getStatus()

      this.logger.error(
        `${LOG_PREFIX} HTTP Exception: ${statusCode} - ${JSON.stringify(response)}`,
        this.constructor.name
      )

      return new GraphQLError(response['message'] || 'Internal server error', {
        extensions: {
          code: statusCode,
          exception: response
        }
      })
    }

    return new GraphQLError('Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        exception: exception
      }
    })
  }
}
