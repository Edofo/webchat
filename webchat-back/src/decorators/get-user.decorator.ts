import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AuthUser } from '@/types/modules/auth.types'

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (req.user) return req.user as AuthUser

    throw new NotFoundException()
  }
)
