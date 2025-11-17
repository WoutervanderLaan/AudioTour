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
import folderDocsRule from './eslint-rules/require-folder-docs.js'
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
      'babel.config.js',
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
          'require-folder-docs': folderDocsRule,
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
        {type: 'store', pattern: 'src/store/**'},
        {type: 'themes', pattern: 'src/themes/**'},
      ],
    },

    rules: {
      /** --- React --- **/
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-no-leaked-render': ['warn', {validStrategies: ['coerce']}],
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      /** --- React Hooks --- **/
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      /** --- React Native --- **/
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-single-element-style-arrays': 'error',

      /** --- General JS / TS --- **/
      'no-debugger': 'error',
      'no-empty-function': 'error',
      'no-console': 'warn',
      'no-warning-comments': [
        'warn',
        {terms: ['todo', 'fixme', 'xxx'], location: 'anywhere'},
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
        },
      ],
      'local/require-doc-comment': 'error',
      'local/require-type-doc-comment': 'error',
      'local/require-folder-docs': [
        'error',
        {
          include: ['src', 'features', 'components'],
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',

      /** --- Code style / Quality --- **/
      'max-lines': ['warn', {max: 300, skipBlankLines: true}],
      complexity: ['error', {max: 12}],
      'max-nested-callbacks': ['error', 3],
      'max-depth': ['error', 4],
      'max-lines-per-function': [
        'error',
        {
          max: 120,
          skipComments: true,
          skipBlankLines: true,
        },
      ],
      'max-params': ['error', 4],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': [
        'warn',
        {
          allowNullableString: true,
          // allowNullableObject: true,
          // allowNumber: true,
          allowNullableBoolean: true,
        },
      ],

      /** --- Folder structure --- **/
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'local/enforce-feature-structure': [
        'error',
        {
          allowedFolders: ['features', 'shared', 'app', 'store', 'themes'],
        },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['app'],
              allow: ['shared', 'features', 'store', 'themes'],
            },
            {from: ['features'], allow: ['shared', 'store']},
            {from: ['shared'], allow: ['themes']},
            {from: ['store'], allow: ['shared']},
          ],
        },
      ],

      /** --- Unused imports & vars --- **/
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      /** --- Imports --- **/
      // 'import/no-relative-parent-imports': 'error',
      'import/no-cycle': ['error', {maxDepth: 1}],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^react-native'],
            ['^@?\\w'],
            ['^src/'],
            ['^\\.'],
          ],
        },
      ],

      'simple-import-sort/exports': 'warn',
      'import/no-default-export': 'error',

      /** --- Promise / Security / Quality --- **/
      'promise/always-return': 'off',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'security/detect-object-injection': 'off',
      'sonarjs/no-duplicate-string': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',

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
          paths: [
            {
              name: 'react-native',
              importNames: ['StyleSheet'],
              message:
                'Do not use StyleSheet from react-native. Use StyleSheet from react-native-unistyles instead.',
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
  // Turn off no-undef for eslint-rules folder
  {
    files: ['eslint-rules/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
]
