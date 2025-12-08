import React from 'react'
import {StyleProp, ViewStyle} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import {BlurView} from 'expo-blur'

import type {ApplyExclusivityPair} from '@/shared/types/utils/ApplyExclusivityPair'
import type {Theme} from '@/themes/types'

/**
 * BlurTint
 * Available blur tint options for the BlurBox component
 */
export type BlurTint =
  | 'light'
  | 'dark'
  | 'default'
  | 'extraLight'
  | 'regular'
  | 'prominent'
  | 'systemUltraThinMaterial'
  | 'systemThinMaterial'
  | 'systemMaterial'
  | 'systemThickMaterial'
  | 'systemChromeMaterial'
  | 'systemUltraThinMaterialLight'
  | 'systemThinMaterialLight'
  | 'systemMaterialLight'
  | 'systemThickMaterialLight'
  | 'systemChromeMaterialLight'
  | 'systemUltraThinMaterialDark'
  | 'systemThinMaterialDark'
  | 'systemMaterialDark'
  | 'systemThickMaterialDark'
  | 'systemChromeMaterialDark'

/**
 * BlurBoxPropsBase
 * Base props for the BlurBox component including layout, alignment, spacing, padding, and blur options.
 */
export type BlurBoxPropsBase = {
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

  /**
   * tint
   * The tint of the blur effect
   */
  tint?: BlurTint
  /**
   * intensity
   * The intensity of the blur effect (0-100)
   */
  intensity?: number
}

/**
 * BlurBoxProps
 * Final BlurBox props type with exclusivity constraints to prevent conflicting prop combinations.
 */
export type BlurBoxProps = ApplyExclusivityPair<
  BlurBoxPropsBase,
  ['padding', ['paddingH', 'paddingV']]
> &
  ApplyExclusivityPair<
    BlurBoxPropsBase,
    ['paddingH', ['paddingLeft', 'paddingRight']]
  > &
  ApplyExclusivityPair<
    BlurBoxPropsBase,
    ['paddingV', ['paddingTop', 'paddingBottom']]
  > &
  ApplyExclusivityPair<BlurBoxPropsBase, ['center', ['centerX', 'centerY']]> &
  ApplyExclusivityPair<BlurBoxPropsBase, ['row', 'column']>

/**
 * buildBlurBoxStyle
 * Helper function to build the ViewStyle object for BlurBox component
 *
 * @param props - Layout props and theme
 * @returns ViewStyle object
 */
const buildBlurBoxStyle = (
  props: Pick<
    BlurBoxProps,
    | 'flex'
    | 'row'
    | 'column'
    | 'center'
    | 'centerX'
    | 'centerY'
    | 'gap'
    | 'padding'
    | 'paddingH'
    | 'paddingV'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
  >,
  theme: Theme,
): ViewStyle => ({
  flex: props.flex,
  flexShrink: props.flex === undefined ? 0 : undefined,
  flexDirection: props.row ? 'row' : props.column ? 'column' : undefined,
  justifyContent: props.center ?? props.centerY ? 'center' : undefined,
  alignItems: props.center ?? props.centerX ? 'center' : undefined,
  gap: props.gap !== undefined ? theme.size[props.gap] : undefined,
  padding: props.padding !== undefined ? theme.size[props.padding] : undefined,
  paddingHorizontal:
    props.paddingH !== undefined ? theme.size[props.paddingH] : undefined,
  paddingVertical:
    props.paddingV !== undefined ? theme.size[props.paddingV] : undefined,
  paddingTop:
    props.paddingTop !== undefined ? theme.size[props.paddingTop] : undefined,
  paddingRight:
    props.paddingRight !== undefined
      ? theme.size[props.paddingRight]
      : undefined,
  paddingBottom:
    props.paddingBottom !== undefined
      ? theme.size[props.paddingBottom]
      : undefined,
  paddingLeft:
    props.paddingLeft !== undefined ? theme.size[props.paddingLeft] : undefined,
})

/**
 * BlurBox
 * Flexible layout container component with blur effect support.
 * Extends Box functionality with expo-blur's BlurView for glassmorphism effects.
 *
 * @param props - Component props including layout, alignment, spacing, padding, and blur options
 * @returns BlurBox layout component with blur effect
 */
export const BlurBox = ({
  children,
  style,
  tint = 'default',
  intensity = 50,
  ...layoutProps
}: BlurBoxProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const dynamicStyle = buildBlurBoxStyle(layoutProps, theme)

  return (
    <BlurView
      tint={tint}
      intensity={intensity}
      style={[dynamicStyle, style]}>
      {children}
    </BlurView>
  )
}
