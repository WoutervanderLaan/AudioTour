import type React from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

/**
 * PressableBaseProps
 * Base props for the Pressable component with accessibility features
 */
export type PressableBaseProps = Omit<RNPressableProps, 'style'> & {
  /**
   * children - Content to display inside the pressable
   */
  // children?: React.ReactNode
  style?: (state: PressableStateCallbackType) => StyleProp<ViewStyle>
}

/**
 * PressableBase
 * Base pressable component with accessibility features and theme integration.
 * All interactive pressable elements in the app should use this component or its variants.
 *
 * @param {PressableBaseProps} props - Component props
 * @returns {React.JSX.Element} Rendered pressable element
 */
export const PressableBase = ({
  children,
  accessible = true,
  accessibilityRole = 'button',
  style,
  ...rest
}: PressableBaseProps): React.JSX.Element => {
  return (
    <RNPressable
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={state => [styles.pressable, style?.(state)]}
      {...rest}>
      {children}
    </RNPressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    // Base styles can be added here if needed
  },
})
