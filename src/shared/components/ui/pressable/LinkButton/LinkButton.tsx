import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {PressableBase} from '../PressableBase/PressableBase'
import type {LinkButtonProps} from './LinkButton.types'

import {Text} from '@/shared/components/ui/typography/Text'

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
