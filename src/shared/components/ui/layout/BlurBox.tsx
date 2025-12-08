import React, {useMemo, useState} from 'react'
import {LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import MaskedView from '@react-native-masked-view/masked-view'
import {type BlurTint, BlurView} from 'expo-blur'
import {LinearGradient} from 'expo-linear-gradient'

import {Box} from '@/shared/components/ui/layout/Box'
import type {ApplyExclusivityPair} from '@/shared/types/utils/ApplyExclusivityPair'
import type {Theme} from '@/themes/types'

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
  /**
   * featheredEdges
   * Enable feathered (gradient fade) edges. Can be boolean for all edges or object to specify individual edges
   */
  featheredEdges?:
    | boolean
    | {
        top?: boolean
        right?: boolean
        bottom?: boolean
        left?: boolean
      }
  /**
   * featherRadius
   * The radius (in pixels) of the feathered edge gradient. Defaults to 20
   */
  featherRadius?: number
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
 * EdgeConfig
 * Normalized configuration for feathered edges
 */
type EdgeConfig = {
  /**
   * top
   * Whether the top edge should be feathered
   */
  top: boolean
  /**
   * right
   * Whether the right edge should be feathered
   */
  right: boolean
  /**
   * bottom
   * Whether the bottom edge should be feathered
   */
  bottom: boolean
  /**
   * left
   * Whether the left edge should be feathered
   */
  left: boolean
}

/**
 * getFeatheredEdges
 * Helper to normalize featheredEdges prop to object form
 *
 * @param featheredEdges - Boolean or object specifying which edges to feather
 * @returns Object with boolean values for each edge
 */
const getFeatheredEdges = (
  featheredEdges?: boolean | {top?: boolean; right?: boolean; bottom?: boolean; left?: boolean},
): EdgeConfig => {
  if (typeof featheredEdges === 'boolean') {
    return {
      top: featheredEdges,
      right: featheredEdges,
      bottom: featheredEdges,
      left: featheredEdges,
    }
  }
  return {
    top: featheredEdges?.top ?? false,
    right: featheredEdges?.right ?? false,
    bottom: featheredEdges?.bottom ?? false,
    left: featheredEdges?.left ?? false,
  }
}

/**
 * GradientConfig
 * Configuration for gradient colors and locations
 */
type GradientConfig = {
  /**
   * colors
   * Array of color strings for the gradient
   */
  colors: string[]
  /**
   * locations
   * Optional array of number values (0-1) indicating where each color should be positioned
   */
  locations?: number[]
}

/**
 * buildVerticalGradient
 * Build vertical gradient configuration based on top/bottom edges
 *
 * @param edges - Edge configuration
 * @param topLocation - Top gradient location (0-1)
 * @param bottomLocation - Bottom gradient location (0-1)
 * @returns Gradient configuration
 */
const buildVerticalGradient = (
  edges: EdgeConfig,
  topLocation: number,
  bottomLocation: number,
): GradientConfig => {
  if (edges.top && edges.bottom) {
    return {
      colors: ['transparent', 'black', 'black', 'transparent'],
      locations: [0, topLocation, bottomLocation, 1],
    }
  }
  if (edges.top) {
    return {
      colors: ['transparent', 'black'],
      locations: [0, topLocation],
    }
  }
  if (edges.bottom) {
    return {
      colors: ['black', 'transparent'],
      locations: [bottomLocation, 1],
    }
  }
  return {colors: ['black']}
}

/**
 * buildHorizontalGradient
 * Build horizontal gradient configuration based on left/right edges
 *
 * @param edges - Edge configuration
 * @param leftLocation - Left gradient location (0-1)
 * @param rightLocation - Right gradient location (0-1)
 * @returns Gradient configuration
 */
const buildHorizontalGradient = (
  edges: EdgeConfig,
  leftLocation: number,
  rightLocation: number,
): GradientConfig => {
  if (edges.left && edges.right) {
    return {
      colors: ['transparent', 'black', 'black', 'transparent'],
      locations: [0, leftLocation, rightLocation, 1],
    }
  }
  if (edges.left) {
    return {
      colors: ['transparent', 'black'],
      locations: [0, leftLocation],
    }
  }
  if (edges.right) {
    return {
      colors: ['black', 'transparent'],
      locations: [rightLocation, 1],
    }
  }
  return {colors: ['black']}
}

/**
 * BlurBox
 * Flexible layout container component with blur effect support.
 * Extends Box functionality with expo-blur's BlurView for glassmorphism effects.
 * Supports feathered (gradient fade) edges for smoother blending with background.
 *
 * @param props - Component props including layout, alignment, spacing, padding, blur, and feathered edge options
 * @returns BlurBox layout component with blur effect and optional feathered edges
 */
export const BlurBox = ({
  children,
  style,
  tint = 'default',
  intensity = 50,
  featheredEdges,
  featherRadius = 20,
  ...layoutProps
}: BlurBoxProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const [dimensions, setDimensions] = useState({width: 0, height: 0})

  const dynamicStyle = useMemo(
    () => buildBlurBoxStyle(layoutProps, theme),
    [layoutProps, theme],
  )

  const edges = useMemo(() => getFeatheredEdges(featheredEdges), [featheredEdges])
  const hasFeathering = edges.top || edges.right || edges.bottom || edges.left

  /**
   * handleLayout
   * Handle layout changes to capture component dimensions for feather gradient calculations
   *
   * @param event - Layout change event
   */
  const handleLayout = (event: LayoutChangeEvent): void => {
    const {width, height} = event.nativeEvent.layout
    setDimensions({width, height})
  }

  const gradientMask = useMemo(() => {
    if (!hasFeathering) {
      return null
    }

    const {width, height} = dimensions
    const topLocation = edges.top && height > 0 ? Math.min(featherRadius / height, 0.5) : 0
    const bottomLocation = edges.bottom && height > 0 ? Math.max(1 - featherRadius / height, 0.5) : 1
    const leftLocation = edges.left && width > 0 ? Math.min(featherRadius / width, 0.5) : 0
    const rightLocation = edges.right && width > 0 ? Math.max(1 - featherRadius / width, 0.5) : 1

    const verticalGradient = buildVerticalGradient(edges, topLocation, bottomLocation)
    const horizontalGradient = buildHorizontalGradient(edges, leftLocation, rightLocation)

    return (
      <LinearGradient
        colors={verticalGradient.colors}
        locations={verticalGradient.locations}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={{flex: 1}}>
        <LinearGradient
          colors={horizontalGradient.colors}
          locations={horizontalGradient.locations}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{flex: 1}}
        />
      </LinearGradient>
    )
  }, [edges, featherRadius, dimensions, hasFeathering])

  const blurContent = (
    <BlurView
      tint={tint}
      intensity={intensity}
      style={[dynamicStyle, style]}>
      {children}
    </BlurView>
  )

  if (!hasFeathering) {
    return blurContent
  }

  return (
    <MaskedView
      style={[dynamicStyle, style]}
      onLayout={handleLayout}
      maskElement={
        <Box style={{width: dimensions.width, height: dimensions.height}}>
          {gradientMask}
        </Box>
      }>
      {blurContent}
    </MaskedView>
  )
}
