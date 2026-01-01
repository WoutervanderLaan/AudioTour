/* eslint-disable complexity */
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import {View, ViewStyle} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import type {BoxProps} from './Box.types'

/**
 * Box
 * Flexible layout container component with support for flexbox, alignment, spacing, and theme-based padding.
 *
 * @param props - Component props including layout, alignment, spacing, and padding options
 * @returns Box layout component
 */
export const Box = ({
  children,
  style,
  flex,
  row,
  column,
  center,
  centerX,
  centerY,
  gap,
  justifyContent,
  alignItems,
  padding,
  paddingH,
  paddingV,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  stretch,
  wrap,
  testID,
  ...rest
}: BoxProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  const dynamic: ViewStyle = {
    flex,
    flexWrap: wrap,
    flexShrink: flex === undefined ? 0 : undefined,
    flexDirection: row ? 'row' : column ? 'column' : undefined,
    justifyContent: center || centerY ? 'center' : justifyContent,
    alignItems: center || centerX ? 'center' : alignItems,
    alignSelf: stretch ? 'stretch' : undefined,
    gap: gap ? theme.size[gap] : undefined,
    padding: padding ? theme.size[padding] : undefined,
    paddingHorizontal: paddingH ? theme.size[paddingH] : undefined,
    paddingVertical: paddingV ? theme.size[paddingV] : undefined,
    paddingTop: paddingTop ? theme.size[paddingTop] : undefined,
    paddingRight: paddingRight ? theme.size[paddingRight] : undefined,
    paddingBottom: paddingBottom ? theme.size[paddingBottom] : undefined,
    paddingLeft: paddingLeft ? theme.size[paddingLeft] : undefined,
  }

  return (
    <View
      testID={testID}
      style={[dynamic, style]}
      {...rest}>
      {children}
    </View>
  )
}
