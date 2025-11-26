import type React from 'react'
// eslint-disable-next-line no-restricted-imports
import {Text as RNText, type TextProps as RNTextProps} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import type {Theme} from '@/themes/types'

/**
 * TextPropsBase
 * Base props for the Text component with theme integration
 */
export type TextPropsBase = {
  /**
   * children - Text content to display
   */
  children?: string
  /**
   * color - Text color from theme
   */
  color?: keyof Theme['color']['text']
  /**
   * fontSize - Font size from theme
   */
  fontSize?: keyof Theme['text']['fontSize']
  /**
   * fontFamily - Font family from theme
   */
  fontFamily?: keyof Theme['text']['fontFamily']
  /**
   * align - Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify'
  /**
   * lineHeight - Line height from theme
   */
  lineHeight?: keyof Theme['text']['lineHeight']
} & RNTextProps

/**
 * TextProps
 * Props for the Text component
 */
export type TextProps = TextPropsBase

/**
 * Text
 * Base text component with accessibility features and theme integration.
 * All text in the app should use this component instead of React Native's Text.
 *
 * @param {TextProps} props - Component props
 * @returns {React.JSX.Element} Rendered text element
 */
export const TextBase = ({
  children,
  style,
  color = 'default',
  fontSize,
  fontFamily = 'regular',
  align,
  lineHeight,
  accessible = true,
  accessibilityRole = 'text',
  ...rest
}: TextProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  const dynamicStyle = {
    color: theme.color.text[color],
    fontSize: fontSize ? theme.text.fontSize[fontSize] : undefined,
    fontFamily: theme.text.fontFamily[fontFamily],
    textAlign: align,
    lineHeight: lineHeight ? theme.text.lineHeight[lineHeight] : undefined,
  }

  return (
    <RNText
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      style={[styles.text, dynamicStyle, style]}
      {...rest}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
})
