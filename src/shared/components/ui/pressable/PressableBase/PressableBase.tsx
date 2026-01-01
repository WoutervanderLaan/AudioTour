import type React from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as RNPressable,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {PressableBaseProps} from './PressableBase.types'

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
  testID,
  ...rest
}: PressableBaseProps): React.JSX.Element => {
  return (
    <RNPressable
      testID={testID}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={state => [
        state.pressed && styles.pressable,
        rest.disabled && styles.disabled,
        style?.({...state, disabled: rest.disabled || undefined}),
      ]}
      {...rest}>
      {children}
    </RNPressable>
  )
}

const styles = StyleSheet.create(theme => ({
  pressable: {
    opacity: theme.opacity.pressed,
  },
  disabled: {
    opacity: theme.opacity.disabled,
  },
}))
