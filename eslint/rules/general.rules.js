/**
 * General JavaScript/TypeScript rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const generalRules = () => ({
  'no-debugger': 'error',
  'no-empty-function': 'error',
  'no-console': 'warn',
  'no-warning-comments': [
    'warn',
    {terms: ['todo', 'fixme', 'xxx'], location: 'anywhere'},
  ],
  'no-var': 'error',
  'prefer-const': 'error',
})
