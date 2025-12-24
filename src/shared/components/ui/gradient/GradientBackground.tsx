import React, {ReactNode} from 'react'
import {ViewStyle} from 'react-native'

import {LinearGradient, type LinearGradientProps} from 'expo-linear-gradient'

import type {TestProps} from '@/shared/types/test'

/**
 * Props for the GradientBackground component
 */
type GradientBackgroundProps = TestProps<'GradientBackground'> & {
  /**
   * Child components to render on top of the gradient background
   */
  children?: ReactNode
  /**
   * Optional additional styles to apply to the gradient container
   */
  style?: ViewStyle
  /**
   * Optional custom gradient colors array (defaults to blue gradient)
   */
  colors?: LinearGradientProps['colors']
  /**
   * Optional gradient start position coordinates (defaults to top: {x: 0, y: 0})
   */
  start?: {x: number; y: number}
  /**
   * Optional gradient end position coordinates (defaults to bottom: {x: 0, y: 1})
   */
  end?: {x: number; y: number}
}

/**
 * A blue linear gradient background component that can be used to test blur effects
 *
 * @param children - Child components to render on top of the gradient
 * @param style - Optional additional styles to apply
 * @param colors - Optional custom gradient colors (defaults to blue gradient)
 * @param start - Optional gradient start position (defaults to top)
 * @param end - Optional gradient end position (defaults to bottom)
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  testId,
  colors = ['#1e3a8a', '#3b82f6', '#60a5fa'], // Deep blue to lighter blue
  start = {x: 0, y: 0},
  end = {x: 0, y: 1},
}) => {
  return (
    <LinearGradient
      testID={testId}
      colors={colors}
      start={start}
      end={end}
      style={style}>
      {children}
    </LinearGradient>
  )
}
