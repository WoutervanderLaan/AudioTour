import type {ReactNode} from 'react'
import type {ViewStyle} from 'react-native'

import type {LinearGradientProps} from 'expo-linear-gradient'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * Props for the GradientBackground component
 */
export type GradientBackgroundProps = TestProps<'GradientBackground'> & {
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
