/**
 * Import rules configuration for sorting and unused imports
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const importsRules = () => ({
  /** --- Unused imports & vars --- **/
  'unused-imports/no-unused-imports': 'error',

  /** --- Imports --- **/
  'import/no-cycle': ['error', {maxDepth: 1}],
  'simple-import-sort/imports': [
    'error',
    {
      groups: [['^react', '^react-native'], ['^@?\\w'], ['^src/'], ['^\\.']],
    },
  ],
  'simple-import-sort/exports': 'warn',
  'import/no-default-export': 'error',
})
