import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import graphqlEslint from '@graphql-eslint/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'src/generated/**']),
  {
    files: ['**/*.{ts,tsx}'],
    processor: graphqlEslint.processor,
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{graphql,gql}'],
    plugins: {
      '@graphql-eslint': graphqlEslint,
    },
    languageOptions: {
      parser: graphqlEslint.parser,
      parserOptions: {
        graphQLConfig: {
          schema: './graphql.schema.json',
        },
      },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/fields-on-correct-type': 'error',
      '@graphql-eslint/known-fragment-names': 'error',
      '@graphql-eslint/known-directives': 'error',
      '@graphql-eslint/no-deprecated': 'warn',
      '@graphql-eslint/no-undefined-variables': 'error',
      '@graphql-eslint/no-unused-variables': 'warn',
    },
  },
])
