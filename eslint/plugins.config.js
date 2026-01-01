import tseslint from '@typescript-eslint/eslint-plugin'
import queryPlugin from '@tanstack/eslint-plugin-query'
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

import enforceFeatureStructure from '../eslint-rules/enforce-feature-structure.js'
import splitTypeDeclarations from '../eslint-rules/split-type-declarations.js'
import requireDocComment from '../eslint-rules/require-doc-comment.js'
import folderDocsRule from '../eslint-rules/require-folder-docs.js'
import requireTypeDocComment from '../eslint-rules/require-type-doc-comment.js'

/**
 * All ESLint plugins configuration
 * @returns {Record<string, unknown>}
 */
export const createPluginsConfig = () => ({
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
      'split-type-declarations': splitTypeDeclarations,
      'require-folder-docs': folderDocsRule,
    },
  },
})
