import globals from 'globals'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import promise from 'eslint-plugin-promise'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import security from 'eslint-plugin-security'
import boundaries from 'eslint-plugin-boundaries'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ignores: [
      'node_modules/**',
      'android/**',
      'ios/**',
      'build/**',
      'dist/**',
      '**/*.d.ts',
      'eslint.config.js',
      '.prettierrc.js',
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {jsx: true},
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: true,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      promise,
      sonarjs,
      unicorn,
      security,
      boundaries,
    },

    settings: {
      react: {version: 'detect'},
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      /** --- React --- **/
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-no-leaked-render': ['warn', {validStrategies: ['coerce']}],
      'react/jsx-no-constructed-context-values': 'warn',

      /** --- React Hooks --- **/
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /** --- React Native --- **/
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-single-element-style-arrays': 'error',

      /** --- General JS / TS --- **/
      'no-debugger': 'error',
      'no-console': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'max-lines': ['warn', {max: 300, skipBlankLines: true}],

      // Unused imports & vars
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      /** --- Imports --- **/
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      /** --- Promise / Security / Quality --- **/
      'promise/always-return': 'off',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'security/detect-object-injection': 'off',
      'sonarjs/no-duplicate-string': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        {
          allowNullableString: true,
          // allowNullableObject: true,
          // allowNumber: true,
          // allowNullableBoolean: true,
        },
      ],

      /** --- Architectural Conventions --- **/
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                'Avoid deep relative imports — use absolute imports from `src`.',
            },
          ],
        },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/components',
              from: ['./src/screens', './src/store', './src/services'],
              message:
                'Components should not import from screens, store, or services.',
            },
            {
              target: './src/hooks',
              from: ['./src/screens'],
              message: 'Hooks should not depend on screens.',
            },
            {
              target: './src/utils',
              from: [
                './src/components',
                './src/screens',
                './src/hooks',
                './src/store',
              ],
              message:
                'Utils must remain independent and not import app logic.',
            },
          ],
        },
      ],

      'react/jsx-filename-extension': ['error', {extensions: ['.jsx', '.tsx']}],
    },
  },
]
