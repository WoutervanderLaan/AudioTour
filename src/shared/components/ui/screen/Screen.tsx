import type React from 'react'
import {useMemo} from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

/**
 * ScreenProps
 * Props for the Screen component
 */
export type ScreenProps = {
  /**
   * children - Content to be rendered inside the screen
   */
  children: React.ReactNode
  /**
   * scroll - Whether the screen content should be scrollable
   */
  scroll?: boolean
  /**
   * testID - Test identifier for testing
   */
  testID?: string
  /**
   * gutterBottom - Whether to add bottom gutter padding
   */
  gutterBottom?: boolean
  /**
   * gutterTop - Whether to add top gutter padding
   */
  gutterTop?: boolean
  /**
   * gutterHorizontal - Whether to add horizontal gutter padding
   */
  gutterHorizontal?: boolean
  /**
   * withBottomInset - Whether to include safe area bottom inset
   */
  withBottomInset?: boolean
  /**
   * withTopInset - Whether to include safe area top inset
   */
  withTopInset?: boolean
  /**
   * keyboardAvoidingView - Whether to use keyboard avoiding view
   */
  keyboardAvoidingView?: boolean
  /**
   * backgroundColor - Background color key from theme
   */
  backgroundColor?: 'default' | 'settings'
} & ViewProps

/**
 * calculatePaddingTop
 * Calculates the top padding based on gutter and inset settings
 *
 * @param {object} params - Parameters for calculation
 * @returns {number} Calculated padding value
 */
const calculatePaddingTop = (params: {
  withTopInset: boolean
  gutterTop: boolean
  insetsTop: number
  spacing: number
}): number => {
  const {withTopInset, gutterTop, insetsTop, spacing} = params
  if (withTopInset) {
    return insetsTop + (gutterTop ? spacing : 0)
  }
  return gutterTop ? spacing : 0
}

/**
 * calculatePaddingBottom
 * Calculates the bottom padding based on gutter and inset settings
 *
 * @param {object} params - Parameters for calculation
 * @returns {number} Calculated padding value
 */
const calculatePaddingBottom = (params: {
  withBottomInset: boolean
  gutterBottom: boolean
  insetsBottom: number
  spacing: number
}): number => {
  const {withBottomInset, gutterBottom, insetsBottom, spacing} = params
  if (withBottomInset) {
    return insetsBottom + (gutterBottom ? spacing : 0)
  }
  return gutterBottom ? spacing : 0
}

/**
 * wrapWithScroll
 * Wraps content with ScrollView if scroll is enabled
 *
 * @param {React.ReactNode} content - Content to wrap
 * @param {boolean} scroll - Whether to wrap with ScrollView
 * @returns {React.JSX.Element} Wrapped or unwrapped content
 */
const wrapWithScroll = (
  content: React.ReactNode,
  scroll: boolean,
): React.JSX.Element => {
  if (scroll) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    )
  }
  return content as React.JSX.Element
}

/**
 * wrapWithKeyboardAvoidingView
 * Wraps content with KeyboardAvoidingView if enabled
 *
 * @param {React.ReactNode} content - Content to wrap
 * @param {boolean} scroll - Whether to enable scroll
 * @returns {React.JSX.Element} Wrapped content
 */
const wrapWithKeyboardAvoidingView = (
  content: React.ReactNode,
  scroll: boolean,
): React.JSX.Element => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </KeyboardAvoidingView>
  )
}

/**
 * Screen
 * A reusable screen wrapper component that handles safe areas, scrolling,
 * keyboard avoidance, and consistent padding. Integrates with react-navigation
 * and uses unistyles for theming.
 *
 * @param {ScreenProps} props - Component props
 * @returns {React.JSX.Element} Rendered screen component
 */
export const Screen = ({
  children,
  scroll = false,
  testID,
  gutterBottom = true,
  gutterTop = true,
  gutterHorizontal = true,
  withBottomInset = true,
  withTopInset = false,
  keyboardAvoidingView = false,
  backgroundColor = 'default',
  style,
  ...rest
}: ScreenProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const insets = useSafeAreaInsets()

  const containerStyle = useMemo(
    (): ViewStyle[] => [
      styles.container,
      {
        backgroundColor: theme.color.screen.background[backgroundColor],
        paddingTop: calculatePaddingTop({
          withTopInset,
          gutterTop,
          insetsTop: insets.top,
          spacing: theme.size.spacing.md,
        }),
        paddingBottom: calculatePaddingBottom({
          withBottomInset,
          gutterBottom,
          insetsBottom: insets.bottom,
          spacing: theme.size.spacing.md,
        }),
        paddingHorizontal: gutterHorizontal ? theme.size.spacing.md : 0,
      },
      style,
    ],
    [
      backgroundColor,
      gutterBottom,
      gutterHorizontal,
      gutterTop,
      insets.bottom,
      insets.top,
      style,
      theme.color.screen.background,
      theme.size.spacing.md,
      withBottomInset,
      withTopInset,
    ],
  )

  const content = (
    <View
      accessible={false}
      testID={testID}
      style={containerStyle}
      {...rest}>
      {children}
    </View>
  )

  if (keyboardAvoidingView) {
    return wrapWithKeyboardAvoidingView(content, scroll)
  }

  return wrapWithScroll(content, scroll)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
})
