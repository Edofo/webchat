import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { print } from 'graphql'

import api from './api'

interface GraphQLResponse<TResult> {
  data: TResult
  errors?: any[]
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): UseQueryResult<TResult> {
  return useQuery({
    queryKey: [(document.definitions[0] as any).name.value, variables],
    queryFn: async () => {
      try {
        const response = await api.post<GraphQLResponse<TResult>>('/graphql', {
          query: print(document),
          variables
        })

        if (response.data.errors) {
          throw new Error(JSON.stringify(response.data.errors))
        }

        return response.data.data
      } catch (error) {
        throw new Error(`GraphQL query failed: ${error}`)
      }
    }
    // Optionally add retry or caching options here
  })
}
