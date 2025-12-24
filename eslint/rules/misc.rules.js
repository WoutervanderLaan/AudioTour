/**
 * Miscellaneous rules (promise, security, sonarjs, unicorn)
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const miscRules = () => ({
  /** --- Promise / Security / Quality --- **/
  'promise/always-return': 'off',
  'promise/no-return-wrap': 'error',
  'promise/param-names': 'error',
  'security/detect-object-injection': 'off',
  'sonarjs/no-duplicate-string': 'warn',
  'unicorn/prefer-optional-catch-binding': 'warn',
})
