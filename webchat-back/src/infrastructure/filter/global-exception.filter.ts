import { Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express'
import { red } from 'chalk'
import { inspect } from 'util'

import { LoggerService } from '@infrastructure/logger/services/logger.service'

const LOG_PREFIX = red('Response/Error')

function getGraphQLExceptionMessage(exception: HttpException): string {
  const response = exception.getResponse()
  if (typeof response === 'object') {
    if ('message' in response) {
      if (typeof response.message === 'string') return response.message
      if (
        Array.isArray(response.message) &&
        response.message.every(message => typeof message === 'string')
      )
        return response.message.join('\n')
    }
  }
  if (typeof response === 'string') return response
  return exception.message
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  private readonly logger: LoggerService

  constructor(logger: LoggerService) {
    this.logger = logger
  }

  catch(exception: unknown) {
    if (exception instanceof Error) {
      if (exception instanceof HttpException) {
        const statusCode = exception.getStatus()
        const message = getGraphQLExceptionMessage(exception)
        this.logger.error(
          LOG_PREFIX + ' ' + JSON.stringify({ statusCode, message }),
          this.constructor.name,
          exception.message
        )
        // Map HttpException to ApolloError with proper status code
        if (statusCode === 400) {
          throw new UserInputError(message)
        } else if (statusCode === 401) {
          throw new AuthenticationError(message)
        } else {
          throw new ApolloError(message, String(statusCode))
        }
      } else {
        const error = new Error(`Unexpected internal error, ${inspect(exception)}`)
        this.logger.error(
          LOG_PREFIX + ' ' + error.message,
          this.constructor.name,
          error.stack ?? String(error)
        )
        throw new ApolloError('Please contact the administrator', '500')
      }
    } else if (exception instanceof Object) {
      const { message, error } = exception as {
        message?: string
        error: { message: string; statusCode: number }
      }
      const errMsg = message ?? 'Internal server error'
      const errStatusCode = error.statusCode ?? 500
      this.logger.error(
        LOG_PREFIX + ' ' + JSON.stringify({ statusCode: errStatusCode, message: errMsg }),
        this.constructor.name
      )
      throw new ApolloError(errMsg, String(errStatusCode))
    } else {
      // This should never happen: it means that the exception itself is not a JS error; rethrow it as an unexpected error type
      const error = new Error(`Unexpected error type, ${inspect(exception)}`)
      this.logger.error(
        LOG_PREFIX + ' ' + error.message,
        this.constructor.name,
        error.stack ?? String(error)
      )
      throw new ApolloError('Please contact the administrator', '500')
    }
  }
}
