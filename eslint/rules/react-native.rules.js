/**
 * React Native rules configuration
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const reactNativeRules = () => ({
  'react-native/no-unused-styles': 'warn',
  'react-native/split-platform-components': 'error',
  'react-native/no-inline-styles': 'warn',
  'react-native/no-color-literals': 'warn',
  'react-native/no-single-element-style-arrays': 'error',
})
