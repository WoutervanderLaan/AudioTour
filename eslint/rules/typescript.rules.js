/**
 * TypeScript rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const typescriptRules = () => ({
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: false,
      allowTypedFunctionExpressions: true,
    },
  ],
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
      allowNullableBoolean: true,
    },
  ],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
})
