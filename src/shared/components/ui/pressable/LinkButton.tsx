import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {ParagraphProps} from '../typography/Paragraph'
import {PressableBase, type PressableBaseProps} from './PressableBase'

import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * LinkButtonProps
 * Props for the LinkButton component
 */
export type LinkButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  Omit<ParagraphProps, 'style' | 'children' | 'testID'> &
  TestProps<'LinkButton'> & {
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
  testID,
  ...rest
}: LinkButtonProps): React.JSX.Element => {
  const TextComponent = Text[textVariant]

  return (
    <PressableBase
      testID={`${testID}Pressable` as `${string}Pressable`}
      disabled={disabled}
      style={({pressed}) => [pressed && styles.pressed]}
      accessibilityRole="button"
      {...rest}>
      <TextComponent
        testID={`${testID}Text` as `${string}Text`}
        color="link"
        variant={variant}
        style={!!disabled && styles.disabledText}>
        {label}
      </TextComponent>
    </PressableBase>
  )
}

const styles = StyleSheet.create(theme => ({
  pressed: {
    opacity: theme.opacity.pressed,
  },
  disabledText: {
    opacity: theme.opacity.disabled,
  },
}))
