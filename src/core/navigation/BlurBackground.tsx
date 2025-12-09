import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {BlurView} from 'expo-blur'

import {BLUR_INTENSITY} from './types'

/**
 * BlurBackground component that renders a full-screen blur overlay effect using Expo's BlurView.
 * Used as a background effect in navigation stacks to create visual depth and focus.
 *
 * @returns A BlurView component that fills the entire screen with a blur effect
 */
export const BlurBackground = (): React.JSX.Element => (
  <BlurView
    intensity={BLUR_INTENSITY}
    style={StyleSheet.absoluteFill}
  />
)
