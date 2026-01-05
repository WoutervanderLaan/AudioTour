import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {PressableBase} from '../PressableBase'
import type {ButtonProps, ButtonVariant} from './Button.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography/Text'

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
    style={state => [styles[variant](state), styles.base]}
    {...rest}>
    <Box
      testID={`${testID}InnerBox`}
      center
      paddingH="lg"
      paddingV="sm">
      <Text.Paragraph
        testID={`${testID}LabelText`}
        variant="small"
        style={styles.label(variant)}>
        {label}
      </Text.Paragraph>
    </Box>
  </PressableBase>
)

const styles = StyleSheet.create(theme => ({
  label: (variant: ButtonVariant): object => ({
    color: theme.color.pressable[variant].default.label,
  }),
  base: {
    ...theme.styles.border.sharp,
  },
  primary: ({pressed}: {pressed: boolean}): object => ({
    backgroundColor:
      theme.color.pressable.primary[pressed ? 'pressed' : 'default'].background,
    borderColor:
      theme.color.pressable.primary[pressed ? 'pressed' : 'default'].border,
  }),
  secondary: ({pressed}: {pressed: boolean}): object => ({
    backgroundColor:
      theme.color.pressable.secondary[pressed ? 'pressed' : 'default']
        .background,
    borderColor:
      theme.color.pressable.secondary[pressed ? 'pressed' : 'default'].border,
  }),
}))
