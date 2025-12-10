import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {PressableBase, type PressableBaseProps} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'

/**
 * ButtonVariant
 * Visual variants for the Button component
 */
export type ButtonVariant = 'primary' | 'secondary'

/**
 * ButtonProps
 * Props for the Button component
 */
export type ButtonProps = Omit<PressableBaseProps, 'style' | 'children'> & {
  /**
   * variant - Button visual variant
   */
  variant?: ButtonVariant
  /**
   * label - Text content of Button
   */
  label: string
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
  label,
  disabled,
  ...rest
}: ButtonProps): React.JSX.Element => (
  <PressableBase
    disabled={disabled}
    style={({pressed}) => [
      styles.base,
      styles[variant]({pressed, disabled: !!disabled}),
    ]}
    {...rest}>
    <Text.Label color={variant === 'primary' ? 'inverse' : 'default'}>
      {label}
    </Text.Label>
  </PressableBase>
)

const styles = StyleSheet.create(theme => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: (state: {pressed: boolean; disabled?: boolean}): object => ({
    backgroundColor: state.pressed
      ? theme.color.pressable.primary.pressed.background
      : theme.color.pressable.primary.default.background,
    borderColor: state.pressed
      ? theme.color.pressable.primary.pressed.border
      : theme.color.pressable.primary.default.border,
    borderWidth: 1,
    borderRadius: theme.size.lg,
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.md,
    opacity: state.disabled ? 0.5 : 1,
  }),
  secondary: (state: {pressed: boolean; disabled?: boolean}): object => ({
    backgroundColor: state.pressed
      ? theme.color.pressable.secondary.pressed.background
      : theme.color.pressable.secondary.default.background,
    borderColor: state.pressed
      ? theme.color.pressable.secondary.pressed.border
      : theme.color.pressable.secondary.default.border,
    borderWidth: 1,
    borderRadius: theme.size.lg,
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.md,
    opacity: state.disabled ? 0.5 : 1,
  }),
}))
