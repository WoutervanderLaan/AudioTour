/**
 * React and React Hooks rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const reactRules = () => ({
  /** --- React --- **/
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react/display-name': 'off',
  'react/jsx-no-leaked-render': ['warn', {validStrategies: ['coerce']}],
  'react/jsx-no-constructed-context-values': 'warn',
  'react/jsx-pascal-case': 'error',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'react/jsx-filename-extension': ['error', {extensions: ['.jsx', '.tsx']}],

  /** --- React Hooks --- **/
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
})
