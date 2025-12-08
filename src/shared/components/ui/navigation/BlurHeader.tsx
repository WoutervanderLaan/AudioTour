import React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import type {NativeStackHeaderProps} from '@react-navigation/native-stack'

import {BlurBox} from '../layout/BlurBox'
import {Box} from '../layout/Box'
import {PressableBase} from '../pressable/PressableBase'
import {Title} from '../typography/Title'

/**
 * BlurHeaderProps
 * Props for the BlurHeader component extending standard NativeStackHeaderProps
 */
export type BlurHeaderProps = NativeStackHeaderProps & {
  /**
   * intensity
   * The intensity of the blur effect (0-100). Defaults to 80
   */
  intensity?: number
  /**
   * featheredBottomEdge
   * Enable feathered (gradient fade) bottom edge for smoother blending. Defaults to false
   */
  featheredBottomEdge?: boolean
  /**
   * featherRadius
   * The radius (in pixels) of the feathered edge gradient. Defaults to 20
   */
  featherRadius?: number
}

/**
 * BlurHeader
 * Custom header component with blur effect for glassmorphism design.
 * Uses expo-blur's BlurView as background with platform-adaptive tinting.
 * Supports back button, title, right action buttons, and optional feathered bottom edge.
 *
 * @param props - Header props including navigation, options, intensity, and feathered edge options
 * @returns BlurHeader component with blur effect
 */
export const BlurHeader = ({
  navigation,
  options,
  route,
  back,
  intensity = 80,
  featheredBottomEdge = false,
  featherRadius = 20,
}: BlurHeaderProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const insets = useSafeAreaInsets()
  const isDark = theme.name === 'dark'

  const title =
    typeof options.headerTitle === 'string'
      ? options.headerTitle
      : options.title ?? route.name

  return (
    <BlurBox
      tint={isDark ? 'dark' : 'light'}
      intensity={intensity}
      featheredEdges={featheredBottomEdge ? {bottom: true} : undefined}
      featherRadius={featherRadius}
      style={[styles.container, {paddingTop: insets.top}]}>
      <Box style={styles.content}>
        {/* Left side - Back button */}
        {back !== undefined && (
          <PressableBase
            onPress={() => navigation.goBack()}
            style={() => styles.leftButton}
            accessibilityLabel="Go back"
            accessibilityRole="button">
            <Title style={styles.backButtonText}>{'<'} Back</Title>
          </PressableBase>
        )}

        {/* Center - Title */}
        <Box style={styles.titleContainer}>
          <Title
            numberOfLines={1}
            style={styles.titleText}>
            {title}
          </Title>
        </Box>

        {/* Right side - Custom right component */}
        {options.headerRight !== undefined && (
          <Box style={styles.rightButton}>{options.headerRight({})}</Box>
        )}
      </Box>

      <Box style={styles.border} />
    </BlurBox>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {},
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  leftButton: {
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    marginLeft: 8,
  },
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.color.border.default,
  },
  backButtonText: {
    color: theme.color.text.link,
  },
  titleText: {
    color: theme.color.text.default,
  },
}))
