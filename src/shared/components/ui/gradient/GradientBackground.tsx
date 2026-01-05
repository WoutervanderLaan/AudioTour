import React from 'react'

import {LinearGradient} from 'expo-linear-gradient'

import type {GradientBackgroundProps} from './GradientBackground.types'

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
  testID,
  colors = ['#1e3a8a', '#3b82f6', '#60a5fa'], // Deep blue to lighter blue
  start = {x: 0, y: 0},
  end = {x: 0, y: 1},
}) => {
  return (
    <LinearGradient
      testID={testID}
      colors={colors}
      start={start}
      end={end}
      style={style}>
      {children}
    </LinearGradient>
  )
}
