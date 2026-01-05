import type React from 'react'
// eslint-disable-next-line no-restricted-imports
import {Text as RNText} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import type {TextPropsBase} from './TextBase.types'

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
  testID,
  ...rest
}: TextPropsBase): React.JSX.Element => {
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
      testID={testID}
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
