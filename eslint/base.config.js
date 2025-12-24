import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import jestPlugin from 'eslint-plugin-jest'

/**
 * Base ESLint configuration with language options, parser, and globals
 * @returns {import('eslint').Linter.Config}
 */
export const createBaseConfig = () => ({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {jsx: true},
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname + '/..',
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      ...jestPlugin.environments.globals.globals,
      __DEV__: true,
      NodeJS: true,
    },
  },
})
