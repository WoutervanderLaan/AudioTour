import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaskedView from '@react-native-masked-view/masked-view'
import {BlurView} from 'expo-blur'
import {LinearGradient} from 'expo-linear-gradient'

import type {BlurBackgroundProps} from './BlurBackground.types'
import {BLUR_INTENSITY} from './constants'

/**
 * BlurBackground component that renders a full-screen blur overlay effect using Expo's BlurView.
 * Used as a background effect in navigation stacks to create visual depth and focus.
 * Supports feathered edges for smooth visual transitions using masked gradients.
 *
 * @param {BlurBackgroundProps} props - Component props
 * @returns A BlurView component that fills the entire screen with a blur effect and optional feathered edge
 */
export const BlurBackground = ({
  featherEdge,
}: BlurBackgroundProps): React.JSX.Element => {
  if (!featherEdge) {
    return (
      <BlurView
        intensity={BLUR_INTENSITY}
        style={StyleSheet.absoluteFill}
      />
    )
  }

  /**
   * getGradient
   * TODO: describe what it does.
   *
   * @param {*} featherEdge
   * @returns {*} describe return value
   */
  const getGradient = (
    featherEdge: BlurBackgroundProps['featherEdge'],
  ): {
    start: {x: number; y: number}
    end: {x: number; y: number}
    colors: [string, string]
  } => {
    if (featherEdge === 'bottom') {
      return {
        colors: ['black', 'transparent'],
        start: {x: 0, y: 0.75},
        end: {x: 0, y: 1},
      }
    }

    return {
      colors: ['transparent', 'black'],
      start: {x: 0, y: 0},
      end: {x: 0, y: 0.25},
    }
  }

  return (
    <MaskedView
      style={styles.container(featherEdge)}
      maskElement={
        <LinearGradient
          style={StyleSheet.absoluteFill}
          {...getGradient(featherEdge)}
        />
      }>
      <BlurView
        intensity={BLUR_INTENSITY}
        style={StyleSheet.absoluteFill}
      />
    </MaskedView>
  )
}

const styles = StyleSheet.create(() => ({
  container: (featherEdge: BlurBackgroundProps['featherEdge']): object => ({
    position: 'absolute',
    top: featherEdge === 'top' ? -30 : 0,
    bottom: featherEdge === 'bottom' ? -40 : 0,
    left: 0,
    right: 0,
  }),
}))
