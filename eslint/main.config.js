import {createBaseConfig} from './base.config.js'
import {createPluginsConfig} from './plugins.config.js'
import {createAllRules} from './rules/index.js'
import {createSettingsConfig} from './settings.config.js'

/**
 * Creates the main ESLint configuration object for source files
 * @returns {import('eslint').Linter.Config}
 */
export const createMainConfig = () => ({
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
  ...createBaseConfig(),
  plugins: createPluginsConfig(),
  settings: createSettingsConfig(),
  rules: createAllRules(),
})
