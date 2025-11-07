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
import requireDocComment from './eslint-rules/require-doc-comment.js'
import requireTypeDocComment from './eslint-rules/require-type-doc-comment.js'
import queryPlugin from '@tanstack/eslint-plugin-query'
import enforceFeatureStructure from './eslint-rules/enforce-feature-structure.js'
import jestPlugin from 'eslint-plugin-jest'

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
      'eslint-rules/**',
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
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
        process: true,
        __DEV__: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@tanstack/query': queryPlugin,
      react,
      jest: jestPlugin,
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
      local: {
        rules: {
          'require-doc-comment': requireDocComment,
          'require-type-doc-comment': requireTypeDocComment,
          'enforce-feature-structure': enforceFeatureStructure,
        },
      },
    },
    settings: {
      react: {version: 'detect'},
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
      },
      'boundaries/elements': [
        {type: 'app', pattern: 'src/app/**'},
        {type: 'shared', pattern: 'src/shared/**'},
        {type: 'features', pattern: 'src/features/**'},
        {type: 'lib', pattern: 'src/lib/**'},
        {type: 'store', pattern: 'src/store/**'},
      ],
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
      '@typescript-eslint/no-explicit-any': 'warn',
      'local/require-doc-comment': 'error',
      'local/require-type-doc-comment': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'max-lines': ['warn', {max: 300, skipBlankLines: true}],

      /** --- Folder structure --- **/
      'local/enforce-feature-structure': [
        'error',
        {
          allowedFolders: ['features', 'lib', 'shared', 'app', 'store'],
        },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // app can depend on anything
            {
              from: ['app'],
              allow: ['shared', 'features', 'lib', 'store'],
            },

            // lib can import only from app
            {from: ['lib'], allow: ['app']},

            // features can use shared and entities, but not other features
            {from: ['features'], allow: ['shared', 'lib', 'store']},

            // shared cannot import from anything above it
            {from: ['shared'], allow: []},

            // store cannot import from anything above it
            {from: ['store'], allow: ['shared']},
          ],
        },
      ],

      /** --- Unused imports & vars --- **/
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
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
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

      // Jest
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]
