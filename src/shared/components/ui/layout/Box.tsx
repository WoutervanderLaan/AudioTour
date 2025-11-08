import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'

/**
 * BoxProps
 * TODO: describe what this type represents.
 */
export interface BoxProps {
  /**
   * children
   */
  children?: React.ReactNode
  /**
   * style
   */
  style?: StyleProp<ViewStyle>

  // Layout props
  /**
   * flex
   */
  flex?: number
  /**
   * row
   */
  row?: boolean
  /**
   * column
   */
  column?: boolean
  /**
   * center
   */
  center?: boolean
  /**
   * centerX
   */
  centerX?: boolean
  /**
   * centerY
   */
  centerY?: boolean

  /**
   * gap
   */
  gap?: number
  /**
   * padding
   */
  padding?: number
  /**
   * paddingH
   */
  paddingH?: number
  /**
   * paddingV
   */
  paddingV?: number
  /**
   * paddingTop
   */
  paddingTop?: number
  /**
   * paddingRight
   */
  paddingRight?: number
  /**
   * paddingBottom
   */
  paddingBottom?: number
  /**
   * paddingLeft
   */
  paddingLeft?: number
}

/**
 * Box
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Box: React.FC<BoxProps> = ({
  children,
  style,
  row,
  column,
  center,
  centerX,
  centerY,
  gap,
  flex,
  padding,
  paddingH,
  paddingV,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}) => {
  const layout: ViewStyle = {
    flex,
    flexDirection: row ? 'row' : column ? 'column' : undefined,
    justifyContent: center || centerY ? 'center' : undefined,
    alignItems: center || centerX ? 'center' : undefined,
    gap,
    padding,
    paddingHorizontal: paddingH,
    paddingVertical: paddingV,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  }

  return <View style={[layout, style]}>{children}</View>
}
