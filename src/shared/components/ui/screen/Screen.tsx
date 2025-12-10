import React, {ReactNode, useMemo} from 'react'
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  // eslint-disable-next-line no-restricted-imports
  View,
  ViewStyle,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {useKeyboard} from '@/shared/hooks/useKeyboard'
import {useNavigationInsets} from '@/shared/hooks/useNavigationInsets'

/**
 * Base props shared by all Screen variants.
 */
type BaseScreenProps = {
  /**
   * Child elements to render within the screen.
   */
  children: ReactNode
  /**
   * Optional style to apply to the screen container.
   */
  style?: ViewStyle
}

/**
 * Configuration options for keyboard avoiding behavior.
 */
type KeyboardAvoidingConfig = {
  /**
   * Whether to add padding when the keyboard is visible.
   * @default false
   */
  keyboardAvoiding?: boolean
  /**
   * Additional padding to add beyond the keyboard height (useful for buttons or bottom-fixed elements).
   * @default 0
   */
  extraPadding?: number
  /**
   * Whether to animate the padding changes when the keyboard appears/disappears.
   * When true, uses smooth animations. When false, padding changes instantly.
   * @default true
   */
  animated?: boolean
}

/**
 * Props for the Static screen variant.
 */
type StaticScreenProps = BaseScreenProps & KeyboardAvoidingConfig

/**
 * Props for the Scrollable screen variant.
 */
type ScrollableScreenProps = {
  /**
   * Style to apply to the ScrollView's content container.
   */
  contentContainerStyle?: ViewStyle
  /**
   * Whether to show the vertical scroll indicator.
   * @default false
   */
  showsVerticalScrollIndicator?: boolean
  /**
   * Additional ScrollView props (excludes style and contentContainerStyle which are handled separately).
   */
  scrollViewProps?: Omit<ScrollViewProps, 'style' | 'contentContainerStyle'>
} & BaseScreenProps &
  KeyboardAvoidingConfig

/**
 * Static screen variant that doesn't scroll.
 * Useful for simple screens with fixed content or forms that need keyboard avoiding.
 *
 * @param props - The static screen properties
 * @returns A non-scrollable screen component
 */
const Static = ({
  children,
  style,
  keyboardAvoiding = false,
  extraPadding = 0,
  animated = true,
}: StaticScreenProps): React.JSX.Element => {
  const {keyboardHeight, animatedKeyboardHeight} = useKeyboard()
  const {top, bottom} = useNavigationInsets()

  // Memoize the animated padding to avoid recreating on every render
  const animatedPaddingBottom = useMemo(
    () => Animated.add(animatedKeyboardHeight, extraPadding + bottom),
    [animatedKeyboardHeight, extraPadding, bottom],
  )

  // No keyboard avoiding - use simple View with navigation insets
  if (!keyboardAvoiding) {
    return (
      <View
        style={[
          styles.container,
          {paddingTop: top, paddingBottom: bottom},
          style,
        ]}>
        {children}
      </View>
    )
  }

  // Keyboard avoiding with animation
  if (animated) {
    return (
      <Animated.View
        style={[
          styles.container,
          {paddingTop: top},
          style,
          {
            paddingBottom: animatedPaddingBottom,
          },
        ]}>
        {children}
      </Animated.View>
    )
  }

  // Keyboard avoiding without animation
  return (
    <View
      style={[
        styles.container,
        {paddingTop: top},
        style,
        {paddingBottom: keyboardHeight + extraPadding + bottom},
      ]}>
      {children}
    </View>
  )
}

/**
 * Scrollable screen variant with ScrollView wrapper.
 * Useful for screens with content that may exceed viewport height or need keyboard avoiding with scrolling.
 *
 * @param props - The scrollable screen properties
 * @returns A scrollable screen component
 */
const Scrollable = ({
  children,
  style,
  contentContainerStyle,
  keyboardAvoiding = false,
  extraPadding = 0,
  animated = true,
  showsVerticalScrollIndicator = false,
  scrollViewProps,
}: ScrollableScreenProps): React.JSX.Element => {
  const {keyboardHeight, animatedKeyboardHeight} = useKeyboard()
  const {top, bottom} = useNavigationInsets()

  // Calculate padding based on keyboard avoiding and animation settings
  const paddingBottom = useMemo(() => {
    const basePadding = bottom
    if (!keyboardAvoiding) return basePadding
    if (animated) {
      return Animated.add(animatedKeyboardHeight, extraPadding + basePadding)
    }
    return keyboardHeight + extraPadding + basePadding
  }, [
    keyboardAvoiding,
    animated,
    animatedKeyboardHeight,
    extraPadding,
    keyboardHeight,
    bottom,
  ])

  // Use Animated.ScrollView when animation is enabled with keyboard avoiding
  const Component =
    animated && keyboardAvoiding ? Animated.ScrollView : ScrollView

  return (
    <Component
      style={[styles.container, style]}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: top},
        contentContainerStyle,
        {paddingBottom},
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...scrollViewProps}>
      {children}
    </Component>
  )
}

/**
 * Base screen component - simple wrapper with flex container.
 * This is the default export when using `<Screen>` without a variant.
 *
 * @param props - The base screen properties
 * @returns A basic screen wrapper component
 */
const BaseScreen = ({children, style}: BaseScreenProps): React.JSX.Element => {
  const {top, bottom} = useNavigationInsets()

  return (
    <View
      style={[
        styles.container,
        {paddingTop: top, paddingBottom: bottom},
        style,
      ]}>
      {children}
    </View>
  )
}

/**
 * A general Screen component to wrap each individual screen with three variants:
 *
 * - `<Screen>` - Basic wrapper with flex container
 * - `<Screen.Static>` - Non-scrollable screen with optional keyboard avoiding
 * - `<Screen.Scrollable>` - Scrollable screen with optional keyboard avoiding
 *
 * All variants support keyboard avoiding behavior that automatically adds padding
 * when the keyboard appears, with optional animation. The keyboard height is
 * automatically adjusted for safe area insets.
 *
 * @example Basic static screen
 * ```tsx
 * <Screen>
 *   <Text>Simple static content</Text>
 * </Screen>
 * ```
 *
 * @example Static screen with keyboard avoiding
 * ```tsx
 * <Screen.Static keyboardAvoiding extraPadding={20}>
 *   <TextInput placeholder="Email" />
 *   <TextInput placeholder="Password" secureTextEntry />
 *   <Button title="Login" />
 * </Screen.Static>
 * ```
 *
 * @example Scrollable screen without keyboard avoiding
 * ```tsx
 * <Screen.Scrollable>
 *   <Text>Long article content...</Text>
 *   <Text>More content...</Text>
 * </Screen.Scrollable>
 * ```
 *
 * @example Scrollable screen with keyboard avoiding
 * ```tsx
 * <Screen.Scrollable
 *   keyboardAvoiding
 *   extraPadding={20}
 *   showsVerticalScrollIndicator
 * >
 *   <FlatList
 *     data={comments}
 *     renderItem={renderComment}
 *     scrollEnabled={false} // Disable nested scroll
 *   />
 *   <TextInput
 *     placeholder="Add a comment..."
 *     multiline
 *   />
 * </Screen.Scrollable>
 * ```
 *
 * @example Access keyboard state anywhere in the app
 * ```tsx
 * const { isKeyboardVisible, keyboardHeight } = useKeyboard();
 *
 * return (
 *   <View>
 *     <Text>Keyboard is {isKeyboardVisible ? 'visible' : 'hidden'}</Text>
 *     <Text>Height: {keyboardHeight}px</Text>
 *   </View>
 * );
 * ```
 *
 * @example Custom scroll view props
 * ```tsx
 * const scrollViewRef = React.useRef<ScrollView>(null);
 *
 * return (
 *   <Screen.Scrollable
 *     keyboardAvoiding
 *     animated
 *     scrollViewProps={{
 *       ref: scrollViewRef,
 *       onContentSizeChange: () => {
 *         scrollViewRef.current?.scrollToEnd({ animated: true });
 *       },
 *     }}
 *   >
 *     {messages.map(renderMessage)}
 *     <TextInput placeholder="Type a message..." />
 *   </Screen.Scrollable>
 * );
 * ```
 */
export const Screen = Object.assign(BaseScreen, {
  Static,
  Scrollable,
})

const styles = StyleSheet.create(({color}) => ({
  container: {
    flex: 1,
    backgroundColor: color.screen.background.settings,
  },
  scrollContent: {
    flexGrow: 1,
  },
}))
