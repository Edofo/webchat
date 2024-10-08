import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

// URL de votre serveur GraphQL
const httpLink = new HttpLink({
  uri: `http://${import.meta.env.VITE_API_URL}/graphql`,
  credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
  const cookies = document.cookie
  return {
    headers: {
      ...headers,
      cookie: cookies
    }
  }
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${import.meta.env.VITE_API_URL}/subscriptions`,
    connectionParams: () => ({
      authorization: document.cookie
        .split(';')
        .find(cookie => cookie.includes('jwt'))
        ?.slice(4)
    }),
    on: {
      connected: () => console.log('WebSocket connected'),
      error: error => console.error('WebSocket error', error),
      closed: event => console.log('WebSocket closed', event)
    }
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export const getClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      ssrForceFetchDelay: 100,
      link: splitLink,
      cache: new InMemoryCache()
    })
  }
  return apolloClient
}
