/**
 * Architectural conventions and import restrictions rules
 * @returns {import('eslint').Linter.RulesRecord}
 */
export const architecturalRules = () => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['../../*'],
          message:
            'Avoid deep relative imports — use absolute imports from `src`.',
        },
      ],
      paths: [
        {
          name: 'react-native',
          importNames: ['StyleSheet'],
          message:
            'Do not use StyleSheet from react-native. Use StyleSheet from react-native-unistyles instead.',
        },
        {
          name: 'react-native',
          importNames: ['Text', 'TextBase'],
          message:
            'Do not use Text from react-native. Use the Text component from @/shared/components/ui/typography instead.',
        },
        {
          name: '@/shared/components/ui/typography/TextBase',
          importNames: ['TextBase'],
          message:
            'Do not use TextBase directly. Use the Text component instead.',
        },
        {
          name: '@/shared/components/ui/typography/Label',
          importNames: ['Label'],
          message: 'Do not use Label directly. Use the Text component instead.',
        },
        {
          name: '@/shared/components/ui/typography/Title',
          importNames: ['Title'],
          message: 'Do not use Title directly. Use the Text component instead.',
        },
        {
          name: '@/shared/components/ui/typography/Paragraph',
          importNames: ['Paragraph'],
          message:
            'Do not use Paragraph directly. Use the Text component instead.',
        },
        {
          name: 'react-native',
          importNames: [
            'Pressable',
            'Button',
            'PressableBase',
            'TouchableOpacity',
            'TouchableHighlight',
            'TouchableWithoutFeedback',
            'TouchableNativeFeedback',
            'Touchable',
          ],
          message:
            'Do not use pressable components from react-native. Use a Pressable component from @/shared/components/ui/pressable instead.',
        },
        {
          name: 'react-native',
          importNames: ['View'],
          message:
            'Do not use View from react-native. Use a layout component from @/shared/components/ui/layout instead, or create a new layout element that meets a specific requirement (only if existing layout components do not suffice).',
        },
        {
          name: '@react-navigation/bottom-tabs',
          importNames: ['useBottomTabBarHeight'],
          message:
            'Do not import useBottomTabBarHeight from @react-navigation/bottom-tabs, use the custom useBottomTabBarHeight from @/shared/hooks/useBottomTabBarHeight.',
        },
        {
          name: '@react-navigation/elements',
          message:
            'Do not import from @react-navigation/elements, use custom elements and hooks instead.',
        },
        {
          name: '@react-navigation/native',
          importNames: ['useNavigation'],
          message:
            'Do not use useNavigation from @react-navigation/native, use the custom useNavigation from @/shared/hooks/useNavigation instead.',
        },
      ],
    },
  ],

  'import/no-restricted-paths': [
    'error',
    {
      zones: [
        {
          target: './src/components',
          from: ['./src/screens', './src/store', './src/services'],
          message:
            'Components should not import from screens, store, or services.',
        },
        {
          target: './src/hooks',
          from: ['./src/screens'],
          message: 'Hooks should not depend on screens.',
        },
        {
          target: './src/utils',
          from: [
            './src/components',
            './src/screens',
            './src/hooks',
            './src/store',
          ],
          message: 'Utils must remain independent and not import app logic.',
        },
      ],
    },
  ],
})
