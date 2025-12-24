import globals from 'globals'

/**
 * ESLint configuration override for config files and eslint-rules
 * @returns {import('eslint').Linter.Config}
 */
export const configFilesOverride = () => ({
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
})
