import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { green, yellow } from 'chalk'
import { catchError, tap } from 'rxjs'

import { LoggerService } from './services/logger.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const contextType = context.getType()

    if (contextType === 'http') {
      const req = context.switchToHttp().getRequest()
      const { statusCode } = context.switchToHttp().getResponse()
      const { url, method, params, query, body } = req

      this.loggerService.info(
        yellow('Request'),
        JSON.stringify({ url, method, params, query, body })
      )

      return next
        .handle()
        .pipe(
          catchError(err => {
            throw err
          })
        )
        .pipe(
          tap(data => {
            this.loggerService.info(green('Response'), JSON.stringify({ statusCode, data }))
          })
        )
    }

    const args = context.getArgs()
    const req = args[3]
    const { key, typename } = req.path

    this.loggerService.info(
      yellow('Request ') + JSON.stringify({ key, typename }),
      this.constructor.name
    )

    return next
      .handle()
      .pipe(
        catchError(err => {
          throw err
        })
      )
      .pipe(
        tap(data => {
          this.loggerService.info(
            green('Response ') + JSON.stringify({ data }),
            this.constructor.name
          )
        })
      )
  }
}
