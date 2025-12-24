/**
 * Code quality and complexity rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const codeQualityRules = () => ({
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
})
