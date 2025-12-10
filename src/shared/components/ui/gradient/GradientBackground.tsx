import React, {ReactNode} from 'react'
import {ViewStyle} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {LinearGradient, type LinearGradientProps} from 'expo-linear-gradient'

/**
 * GradientBackgroundProps
 * TODO: describe what this type represents.
 */
type GradientBackgroundProps = {
  /**
   * children
   */
  children?: ReactNode
  /**
   * style
   */
  style?: ViewStyle
  /**
   * colors
   */
  colors?: LinearGradientProps['colors']
  /**
   * start
   */
  start?: {x: number; y: number}
  /**
   * end
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
  colors = ['#1e3a8a', '#3b82f6', '#60a5fa'], // Deep blue to lighter blue
  start = {x: 0, y: 0},
  end = {x: 0, y: 1},
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.container, style]}>
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})
