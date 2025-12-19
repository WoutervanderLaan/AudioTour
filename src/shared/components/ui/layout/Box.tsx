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
   * Child elements to render inside the Box container
   */
  children?: React.ReactNode
  /**
   * Additional styles to apply to the Box component
   */
  style?: StyleProp<ViewStyle>
  /**
   * Flex grow value for flexible sizing (0 = fixed size, 1 = grow to fill space)
   */
  flex?: number
  /**
   * When true, arranges children horizontally in a row (sets flexDirection: 'row')
   */
  row?: boolean
  /**
   * When true, arranges children vertically in a column (sets flexDirection: 'column')
   */
  column?: boolean
  /**
   * When true, centers children both horizontally and vertically
   */
  center?: boolean
  /**
   * When true, centers children horizontally (sets alignItems: 'center')
   */
  centerX?: boolean
  /**
   * When true, centers children vertically (sets justifyContent: 'center')
   */
  centerY?: boolean
  /**
   * Controls how children are distributed along the main axis
   */
  justifyContent?: ViewStyle['justifyContent']
  /**
   *
   */
  alignItems?: ViewStyle['alignItems']
  /**
   * Spacing between child elements using theme size tokens
   */
  gap?: keyof Theme['size']
  /**
   * Uniform padding on all sides using theme size tokens
   */
  padding?: keyof Theme['size']
  /**
   * Horizontal padding (left and right) using theme size tokens
   */
  paddingH?: keyof Theme['size']
  /**
   * Vertical padding (top and bottom) using theme size tokens
   */
  paddingV?: keyof Theme['size']
  /**
   * Top padding using theme size tokens
   */
  paddingTop?: keyof Theme['size']
  /**
   * Right padding using theme size tokens
   */
  paddingRight?: keyof Theme['size']
  /**
   * Bottom padding using theme size tokens
   */
  paddingBottom?: keyof Theme['size']
  /**
   * Left padding using theme size tokens
   */
  paddingLeft?: keyof Theme['size']
  /**
   * When true, stretches the Box to fill available width (sets alignSelf: 'stretch')
   */
  stretch?: boolean
  /**
   * wrap
   */
  wrap?: ViewStyle['flexWrap']
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

  return <View style={[dynamic, style]}>{children}</View>
}
