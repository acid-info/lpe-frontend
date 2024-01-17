import { CodegenConfig } from '@graphql-codegen/cli'

const graphqlEndpoint = process.env.STRAPI_GRAPHQL_URL || ''
const token = process.env.STRAPI_API_KEY || ''

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [graphqlEndpoint]: {
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    },
  ],
  documents: ['src/services/strapi/*.{ts,tsx}'],
  generates: {
    'src/lib/strapi/strapi.graphql': {
      plugins: ['schema-ast'],
    },
    'src/lib/strapi/strapi.generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      presetConfig: {
        fragmentMasking: false,
        maybeValue: 'T',
      },
      config: {
        withHooks: true,
        enumsAsTypes: true,
        useImplementingTypes: true,
        maybeValue: 'T',
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
      },
    },
  },
}

export default config
