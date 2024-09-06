import { Plugin } from '@nestjs/apollo'
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    return {
      async willSendResponse() {}
    }
  }
}
