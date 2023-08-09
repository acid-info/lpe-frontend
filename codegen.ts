import { CodegenConfig } from '@graphql-codegen/cli'

const graphqlEndpoint = 'https://graphql.unbody.io'
const projectId = process.env.UNBODY_LPE_PROJECT_ID || ''
const authorization = process.env.UNBODY_API_KEY || ''

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [graphqlEndpoint]: {
        headers: {
          authorization,
          'x-project-id': projectId,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    },
    'src/lib/unbody/unbody.extend.graphql',
  ],
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    'src/lib/unbody/unbody.generated.ts': {
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
