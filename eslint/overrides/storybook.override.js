/**
 * ESLint configuration override for Storybook files
 * @returns {import('eslint').Linter.Config}
 */
export const storybookOverride = () => ({
  files: ['**/*.stories.{tsx,jsx}'],
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
})
