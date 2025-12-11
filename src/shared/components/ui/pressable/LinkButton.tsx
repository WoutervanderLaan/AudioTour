import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {PressableBase, type PressableBaseProps} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'

/**
 * LinkButtonProps
 * Props for the LinkButton component
 */
export type LinkButtonProps = Omit<PressableBaseProps, 'style' | 'children'> & {
  /**
   * label - Text content of the link button
   */
  label: string
}

/**
 * LinkButton
 * A text-styled pressable component that looks like a hyperlink.
 * Used for navigation actions like "Sign up" or "Forgot password" links.
 *
 * @param {LinkButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered link button element
 */
export const LinkButton = ({
  label,
  disabled,
  ...rest
}: LinkButtonProps): React.JSX.Element => (
  <PressableBase
    disabled={disabled}
    style={({pressed}) => [styles.base, pressed && styles.pressed]}
    accessibilityRole="link"
    {...rest}>
    <Text.Paragraph
      color="link"
      style={!!disabled && styles.disabledText}>
      {label}
    </Text.Paragraph>
  </PressableBase>
)

const styles = StyleSheet.create(theme => ({
  base: {
    paddingVertical: theme.size.xs,
  },
  pressed: {
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.5,
  },
}))
