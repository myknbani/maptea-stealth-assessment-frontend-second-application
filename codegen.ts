import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3001/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.graphql', 'src/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    './src/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
