import type React from 'react'
// eslint-disable-next-line no-restricted-imports
import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

/**
 * PressableBaseProps
 * Base props for the Pressable component with accessibility features
 */
export type PressableBaseProps = RNPressableProps & {
  /**
   * children - Content to display inside the pressable
   */
  children?: React.ReactNode
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
      style={[styles.pressable, style]}
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
