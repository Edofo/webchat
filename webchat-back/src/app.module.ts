import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { join } from 'path'

import { ConfigurationModule } from '@infrastructure/configuration/configuration.module'
import { DatabaseModule } from '@infrastructure/database/database.module'
import { LoggerModule } from '@infrastructure/logger/logger.module'

import { AuthModule } from '@modules/auth/auth.module'

import { upperDirectiveTransformer } from '@common/directives/uper-case.directive'

import { ChatModule } from './modules/chat/chat.module'

@Module({
  imports: [
    AuthModule,
    ChatModule,

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
      context: ({ req, res }) => ({ req, res }),
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
          path: '/subscriptions'
          // onConnect: () => {
          //   console.log('Connected to websocket')
          // }
        }
      }
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
