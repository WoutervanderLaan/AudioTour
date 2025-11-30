import type {ReactNode} from 'react'
import type {Animated} from 'react-native'

/**
 * Props for the KeyboardProvider component.
 */
export type KeyboardProviderProps = {
  /**
   * Child components that will have access to keyboard context.
   */
  children: ReactNode
}

/**
 * Values provided by the KeyboardContext for tracking keyboard state.
 */
export type KeyboardContextValue = {
  /**
   * Current keyboard height in pixels, adjusted for safe area bottom inset.
   * This is a static number that updates when keyboard show/hide events occur.
   */
  keyboardHeight: number
  /**
   * Animated value that tracks keyboard height for smooth transitions.
   * Use with Animated components for animated keyboard avoiding behavior.
   */
  animatedKeyboardHeight: Animated.Value
  /**
   * Boolean indicating whether the keyboard is currently visible.
   */
  isKeyboardVisible: boolean
}
