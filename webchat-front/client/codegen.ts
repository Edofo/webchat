import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      }
    },
    'src/__generated__/introspection.json': {
      plugins: ['introspection']
    },
    'src/__generated__/graphql-operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  },
  ignoreNoDocuments: false
}

export default config
