/* eslint-disable complexity */
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import {StyleProp, View, type ViewProps, ViewStyle} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import type {ApplyExclusivityPair} from '@/shared/types/utils/ApplyExclusivityPair'
import type {Theme} from '@/themes/types'

/**
 * BoxPropsBase
 * Base props for the Box component including layout, alignment, spacing, and padding options.
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
   * justifyContent
   */
  justifyContent?: ViewStyle['justifyContent']
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
  /**
   * stretch
   */
  stretch?: boolean
} & ViewProps

/**
 * LayeredBoxProps
 * Final Box props type with exclusivity constraints to prevent conflicting prop combinations.
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
  padding,
  paddingH,
  paddingV,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  stretch,
}: BoxProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  const dynamic: ViewStyle = {
    flex,
    flexShrink: flex === undefined ? 0 : undefined,
    flexDirection: row ? 'row' : column ? 'column' : undefined,
    justifyContent: center || centerY ? 'center' : justifyContent,
    alignItems: center || centerX ? 'center' : undefined,
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

  return <View style={[dynamic, style]}>{children}</View>
}
