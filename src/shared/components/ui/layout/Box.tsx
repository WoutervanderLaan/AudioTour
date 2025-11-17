import React, {type FC} from 'react'
import {StyleProp, View, type ViewProps, ViewStyle} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import type {ApplyExclusivityPair} from '@/shared/types/ApplyExclusivityPair'
import type {Theme} from '@/themes/types'

/**
 * BoxPropsBase
 * TODO: describe what this type represents.
 */
export type BoxPropsBase = {
  /**
   * children
   */
  children?: React.ReactNode
  /**
   * style
   */
  style?: StyleProp<ViewStyle>
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
  gap?: keyof Theme['size']
  /**
   * padding
   */
  padding?: keyof Theme['size']
  /**
   * paddingH
   */
  paddingH?: keyof Theme['size']
  /**
   * paddingV
   */
  paddingV?: keyof Theme['size']
  /**
   * paddingTop
   */
  paddingTop?: keyof Theme['size']
  /**
   * paddingRight
   */
  paddingRight?: keyof Theme['size']
  /**
   * paddingBottom
   */
  paddingBottom?: keyof Theme['size']
  /**
   * paddingLeft
   */
  paddingLeft?: keyof Theme['size']
} & ViewProps

/**
 * LayeredBoxProps
 * TODO: describe what this type represents.
 */
export type BoxProps = ApplyExclusivityPair<
  BoxPropsBase,
  ['padding', ['paddingH', 'paddingV']]
> &
  ApplyExclusivityPair<
    BoxPropsBase,
    ['paddingH', ['paddingLeft', 'paddingRight']]
  > &
  ApplyExclusivityPair<
    BoxPropsBase,
    ['paddingV', ['paddingTop', 'paddingBottom']]
  > &
  ApplyExclusivityPair<BoxPropsBase, ['center', ['centerX', 'centerY']]> &
  ApplyExclusivityPair<BoxPropsBase, ['row', 'column']>

/**
 * Box
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Box: FC<BoxProps> = ({
  children,
  style,
  flex,
  row,
  column,
  center,
  centerX,
  centerY,
  gap,
  padding,
  paddingH,
  paddingV,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}) => {
  const {theme} = useUnistyles()

  const dynamic: ViewStyle = {
    flex,
    flexShrink: flex === undefined ? 0 : undefined,
    flexDirection: row ? 'row' : column ? 'column' : undefined,
    justifyContent: center || centerY ? 'center' : undefined,
    alignItems: center || centerX ? 'center' : undefined,
    gap: gap ? theme.size[gap] : undefined,
    padding: padding ? theme.size[padding] : undefined,
    paddingHorizontal: paddingH ? theme.size[paddingH] : undefined,
    paddingVertical: paddingV ? theme.size[paddingV] : undefined,
    paddingTop: paddingTop ? theme.size[paddingTop] : undefined,
    paddingRight: paddingRight ? theme.size[paddingRight] : undefined,
    paddingBottom: paddingBottom ? theme.size[paddingBottom] : undefined,
    paddingLeft: paddingLeft ? theme.size[paddingLeft] : undefined,
  }

  return <View style={[dynamic, style]}>{children}</View>
}
