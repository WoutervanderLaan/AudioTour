import React from 'react'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs'

import {BlurBox} from '../layout/BlurBox'
import {Box} from '../layout/Box'

/**
 * BlurTabBarProps
 * Props for the BlurTabBar component extending standard BottomTabBarProps
 */
export type BlurTabBarProps = BottomTabBarProps & {
  /**
   * intensity
   * The intensity of the blur effect (0-100). Defaults to 80
   */
  intensity?: number
  /**
   * featheredTopEdge
   * Enable feathered (gradient fade) top edge for smoother blending. Defaults to false
   */
  featheredTopEdge?: boolean
  /**
   * featherRadius
   * The radius (in pixels) of the feathered edge gradient. Defaults to 20
   */
  featherRadius?: number
}

/**
 * BlurTabBar
 * Custom bottom tab bar component with blur effect for glassmorphism design.
 * Uses expo-blur's BlurView as background with platform-adaptive tinting.
 * Supports optional feathered top edge for smoother blending.
 *
 * @param props - Tab bar props including standard BottomTabBarProps, intensity, and feathered edge options
 * @returns BlurTabBar component with blur effect
 */
export const BlurTabBar = ({
  intensity = 80,
  featheredTopEdge = false,
  featherRadius = 20,
  ...props
}: BlurTabBarProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const isDark = theme.name === 'dark'

  return (
    <BlurBox
      tint={isDark ? 'dark' : 'light'}
      intensity={intensity}
      featheredEdges={!!featheredTopEdge && {top: true}}
      featherRadius={featherRadius}
      style={styles.container}>
      <Box style={styles.border} />
      <BottomTabBar
        {...props}
        style={styles.tabBar}
      />
    </BlurBox>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.color.border.default,
  },
  tabBar: {
    backgroundColor: theme.color.transparent,
    borderTopWidth: 0,
    elevation: 0,
  },
}))
