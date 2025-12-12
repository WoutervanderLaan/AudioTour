import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {ParagraphProps} from '../typography/Paragraph'
import {PressableBase, type PressableBaseProps} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'

/**
 * LinkButtonProps
 * Props for the LinkButton component
 */
export type LinkButtonProps = Omit<PressableBaseProps, 'style' | 'children'> &
  Omit<ParagraphProps, 'style' | 'children'> & {
    /**
     * label - Text content of the link button
     */
    label: string
    /**
     * textVariant - Text variant to use for the label
     */
    textVariant?: keyof typeof Text
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
  textVariant = 'Paragraph',
  variant = 'body',
  ...rest
}: LinkButtonProps): React.JSX.Element => {
  const TextComponent = Text[textVariant]

  return (
    <PressableBase
      disabled={disabled}
      style={({pressed}) => [pressed && styles.pressed]}
      accessibilityRole="button"
      {...rest}>
      <TextComponent
        color="link"
        variant={variant}
        style={!!disabled && styles.disabledText}>
        {label}
      </TextComponent>
    </PressableBase>
  )
}

const styles = StyleSheet.create(() => ({
  pressed: {
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.5,
  },
}))
