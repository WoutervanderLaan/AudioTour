import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {PressableBase, type PressableBaseProps} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * ButtonVariant
 * Visual variants for the Button component
 */
export type ButtonVariant = 'primary' | 'secondary'

/**
 * ButtonProps
 * Props for the Button component
 */
export type ButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  TestProps<'Button'> & {
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
  testID,
  ...rest
}: ButtonProps): React.JSX.Element => (
  <PressableBase
    testID={`${testID}Pressable`}
    disabled={disabled}
    style={({pressed}) => [
      styles.base({pressed, disabled: !!disabled}),
      styles[variant]({pressed, disabled: !!disabled}),
    ]}
    {...rest}>
    <Text.Paragraph
      testID={`${testID}LabelText`}
      variant="small"
      style={styles.label(variant)}>
      {label}
    </Text.Paragraph>
  </PressableBase>
)

const styles = StyleSheet.create(theme => ({
  base: (state: {pressed: boolean; disabled?: boolean}): object => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.size.xxs,
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.lg,
    opacity: state.disabled ? theme.opacity.disabled : theme.opacity.none,
  }),
  label: (variant: ButtonVariant): object => ({
    color: theme.color.pressable[variant].default.label,
  }),
  primary: (state: {pressed: boolean; disabled?: boolean}): object => ({
    backgroundColor: state.pressed
      ? theme.color.pressable.primary.pressed.background
      : theme.color.pressable.primary.default.background,
    borderColor: state.pressed
      ? theme.color.pressable.primary.pressed.border
      : theme.color.pressable.primary.default.border,
  }),
  secondary: (state: {pressed: boolean; disabled?: boolean}): object => ({
    backgroundColor: state.pressed
      ? theme.color.pressable.secondary.pressed.background
      : theme.color.pressable.secondary.default.background,
    borderColor: state.pressed
      ? theme.color.pressable.secondary.pressed.border
      : theme.color.pressable.secondary.default.border,
  }),
}))
