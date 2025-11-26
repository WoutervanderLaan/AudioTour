import type React from 'react'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {PressableBase, type PressableBaseProps} from './PressableBase'

/**
 * ButtonVariant
 * Visual variants for the Button component
 */
export type ButtonVariant = 'primary' | 'secondary'

/**
 * ButtonProps
 * Props for the Button component
 */
export type ButtonProps = Omit<PressableBaseProps, 'style'> & {
  /**
   * variant - Button visual variant
   */
  variant?: ButtonVariant
  /**
   * style - Custom style overrides
   */
  style?: PressableBaseProps['style']
}

/**
 * Button
 * Interactive button component with predefined styling variants.
 * Uses the base PressableBase component with theme-based button styles.
 *
 * @param {ButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered button element
 */
export const Button = ({
  variant = 'primary',
  children,
  disabled,
  style,
  ...rest
}: ButtonProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  const variantStyles = StyleSheet.create({
    primary: (state: {pressed: boolean}): object => ({
      backgroundColor: state.pressed
        ? theme.color.pressable.primary.pressed.background
        : theme.color.pressable.primary.default.background,
      borderColor: state.pressed
        ? theme.color.pressable.primary.pressed.border
        : theme.color.pressable.primary.default.border,
      borderWidth: 1,
      borderRadius: theme.size.xs,
      paddingVertical: theme.size.sm,
      paddingHorizontal: theme.size.md,
      opacity: disabled ? 0.5 : 1,
    }),
    secondary: (state: {pressed: boolean}): object => ({
      backgroundColor: state.pressed
        ? theme.color.pressable.secondary.pressed.background
        : theme.color.pressable.secondary.default.background,
      borderColor: state.pressed
        ? theme.color.pressable.secondary.pressed.border
        : theme.color.pressable.secondary.default.border,
      borderWidth: 1,
      borderRadius: theme.size.xs,
      paddingVertical: theme.size.sm,
      paddingHorizontal: theme.size.md,
      opacity: disabled ? 0.5 : 1,
    }),
  })

  return (
    <PressableBase
      disabled={disabled}
      style={({pressed}): object[] => [
        variantStyles[variant]({pressed}),
        typeof style === 'function' ? style({pressed}) : style,
      ]}
      {...rest}>
      {children}
    </PressableBase>
  )
}
