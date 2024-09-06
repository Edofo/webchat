import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { Context } from 'graphql-ws'
import { join } from 'path'

import { ConfigurationModule } from '@infrastructure/configuration/configuration.module'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { LoggerModule } from '@infrastructure/logger/logger.module'

import { AuthModule } from '@modules/auth/auth.module'

import { upperDirectiveTransformer } from '@common/directives/uper-case.directive'

import { ChatModule } from './modules/chat/chat.module'
import { FriendModule } from './modules/friend/friend.module'

@Module({
  imports: [
    AuthModule,
    ChatModule,
    FriendModule,

    // CORE
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      playground: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION]
          })
        ]
      },
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
          onConnect: (context: Context<any>) => {
            const { connectionParams, extra } = context
            const authToken = connectionParams?.authorization

            if (authToken) {
              // @ts-expect-error - The request object is not defined in the context
              extra.request.cookies = {
                jwt: authToken
              }
            }
          }
        }
      },
      context: context => {
        if (context?.req === undefined) {
          // The jwt strategy requires a request with headers to perform jwt
          // validation. If no request exists in the context object then we're
          // dealing with a websocket connection. In that case pass along the
          // request object provided by the `graphql-ws` context for validation.
          context.req = context.extra.request
        }

        // return the context object.
        return context
      }
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
