import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jestPlugin from 'eslint-plugin-jest'
import react from 'eslint-plugin-react'
import globals from 'globals'

/**
 * ESLint configuration override for test files
 * @returns {import('eslint').Linter.Config}
 */
export const testsOverride = () => ({
  files: ['**/*.test.{ts,js,tsx,jsx}'],
  plugins: {
    '@typescript-eslint': tseslint,
    react,
    jest: jestPlugin,
  },
  settings: {
    react: {version: 'detect'},
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {jsx: true},
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname + '/../..',
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
      ...jestPlugin.environments.globals.globals,
      fail: true,
      __DEV__: true,
      NodeJS: true,
    },
  },
  rules: {
    'max-lines': 'off',
    complexity: 'off',
    'max-nested-callbacks': 'off',
    'max-depth': 'off',
    'max-lines-per-function': 'off',
    'max-params': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'no-unused-vars': 'off',
  },
})
