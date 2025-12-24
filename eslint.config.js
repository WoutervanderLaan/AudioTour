// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js'
import queryPlugin from '@tanstack/eslint-plugin-query'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import security from 'eslint-plugin-security'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import storybook from 'eslint-plugin-storybook'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

import enforceFeatureStructure from './eslint-rules/enforce-feature-structure.js'
import requireDocComment from './eslint-rules/require-doc-comment.js'
import folderDocsRule from './eslint-rules/require-folder-docs.js'
import requireTypeDocComment from './eslint-rules/require-type-doc-comment.js'

export default [
  js.configs.recommended,
  ...storybook.configs['flat/recommended'],
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
      '.prettierrc.js',
      '.storybook/**',
      '.rnstorybook/**',
      '.jest/**',
      '*.config.js',
      '**/*.test.{ts,js,jsx,tsx}',
      '!.storybook',
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
        NodeJS: true,
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
      storybook,
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
        },
      },
      'boundaries/elements': [
        {type: 'app', pattern: 'src/app/**'},
        {type: 'shared', pattern: 'src/shared/**'},
        {type: 'modules', pattern: 'src/modules/**'},
        {type: 'store', pattern: 'src/store/**'},
        {type: 'themes', pattern: 'src/themes/**'},
        {type: 'core', pattern: 'src/core/**'},
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
          include: [
            'src',
            'app',
            'store',
            'themes',
            'modules',
            'core',
            'shared',
          ],
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',

      /** --- Code style / Quality --- **/
      'max-lines': ['warn', {max: 300, skipBlankLines: true}],
      complexity: ['error', {max: 16}],
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
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
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
          allowedFolders: [
            'modules',
            'shared',
            'app',
            'store',
            'themes',
            'core',
          ],
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
              allow: ['shared', 'store', 'themes', 'modules', 'core'],
            },
            {from: ['core'], allow: ['shared', 'modules']},
            {from: ['shared'], allow: ['themes', 'core']},
            {from: ['modules'], allow: ['shared', 'store', 'core']},
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
              group: ['../../*'],
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
            {
              name: 'react-native',
              importNames: ['Text', 'TextBase'],
              message:
                'Do not use Text from react-native. Use the Text component from @/shared/components/ui/typography instead.',
            },
            {
              name: '@/shared/components/ui/typography/TextBase',
              importNames: ['TextBase'],
              message:
                'Do not use TextBase directly. Use the Text component instead.',
            },
            {
              name: '@/shared/components/ui/typography/Label',
              importNames: ['Label'],
              message:
                'Do not use Label directly. Use the Text component instead.',
            },
            {
              name: '@/shared/components/ui/typography/Title',
              importNames: ['Title'],
              message:
                'Do not use Title directly. Use the Text component instead.',
            },
            {
              name: '@/shared/components/ui/typography/Paragraph',
              importNames: ['Paragraph'],
              message:
                'Do not use Paragraph directly. Use the Text component instead.',
            },
            {
              name: 'react-native',
              importNames: [
                'Pressable',
                'Button',
                'PressableBase',
                'TouchableOpacity',
                'TouchableHighlight',
                'TouchableWithoutFeedback',
                'TouchableNativeFeedback',
                'Touchable',
              ],
              message:
                'Do not use pressable components from react-native. Use a Pressable component from @/shared/components/ui/pressable instead.',
            },
            {
              name: 'react-native',
              importNames: ['View'],
              message:
                'Do not use View from react-native. Use a layout component from @/shared/components/ui/layout instead, or create a new layout element that meets a specific requirement (only if existing layout components do not suffice).',
            },
            {
              name: '@react-navigation/bottom-tabs',
              importNames: ['useBottomTabBarHeight'],
              message:
                'Do not import useBottomTabBarHeight from @react-navigation/bottom-tabs, use the custom useBottomTabBarHeight from @/shared/hooks/useBottomTabBarHeight.',
            },
            {
              name: '@react-navigation/elements',
              message:
                'Do not import from @react-navigation/elements, use custom elements and hooks instead.',
            },
            {
              name: '@react-navigation/native',
              importNames: ['useNavigation'],
              message:
                'Do not use useNavigation from @react-navigation/native, use the custom useNavigation from @/shared/hooks/useNavigation instead.',
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
  {
    files: [
      'eslint-rules/**/*.{js,ts}',
      '*.config.js',
      '.rnstorybook/**',
      '.jest/**',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.stories.{tsx,jsx}'],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
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
        tsconfigRootDir: import.meta.dirname,
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
  },
]
