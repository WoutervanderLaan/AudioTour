/**
 * ESLint configuration
 * For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
 *
 * This configuration is now modularized for better maintainability.
 * See the ./eslint directory for individual rule configurations.
 */
import js from '@eslint/js'
import storybook from 'eslint-plugin-storybook'

import {createMainConfig} from './eslint/main.config.js'
import {
  configFilesOverride,
  storybookOverride,
  testsOverride,
} from './eslint/overrides/index.js'

export default [
  js.configs.recommended,
  ...storybook.configs['flat/recommended'],
  createMainConfig(),
  configFilesOverride(),
  ...storybookOverride(),
  testsOverride(),
]
