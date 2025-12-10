import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {BlurView} from 'expo-blur'

import {BLUR_INTENSITY} from './constants'

/**
 * Background
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const BlurBackground = (): React.JSX.Element => (
  <BlurView
    intensity={BLUR_INTENSITY}
    style={StyleSheet.absoluteFill}
  />
)
