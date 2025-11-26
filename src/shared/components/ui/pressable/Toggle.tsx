import type React from 'react'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {PressableBase, type PressableBaseProps} from './PressableBase'

/**
 * ToggleProps
 * Props for the Toggle component
 */
export type ToggleProps = Omit<
  PressableBaseProps,
  'style' | 'accessibilityRole' | 'accessibilityState'
> & {
  /**
   * active - Whether the toggle is in active state
   */
  active?: boolean
  /**
   * style - Custom style overrides
   */
  style?: PressableBaseProps['style']
}

/**
 * Toggle
 * Interactive toggle component that can represent an on/off or selected state.
 * Uses the base PressableBase component with theme-based toggle styles.
 *
 * @param {ToggleProps} props - Component props
 * @returns {React.JSX.Element} Rendered toggle element
 */
export const Toggle = ({
  active = false,
  children,
  disabled,
  style,
  ...rest
}: ToggleProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  const toggleStyles = StyleSheet.create({
    toggle: (state: {pressed: boolean}): object => {
      const variant = active ? 'primary' : 'secondary'
      const colorState = state.pressed ? 'pressed' : 'default'

      return {
        backgroundColor: theme.color.pressable[variant][colorState].background,
        borderColor: theme.color.pressable[variant][colorState].border,
        borderWidth: 1,
        borderRadius: theme.size.xs,
        paddingVertical: theme.size.sm,
        paddingHorizontal: theme.size.md,
        opacity: disabled ? 0.5 : 1,
      }
    },
  })

  return (
    <PressableBase
      disabled={disabled}
      accessibilityRole="togglebutton"
      accessibilityState={{checked: active, disabled}}
      style={({pressed}): object[] => [
        toggleStyles.toggle({pressed}),
        typeof style === 'function' ? style({pressed}) : style,
      ]}
      {...rest}>
      {children}
    </PressableBase>
  )
}
