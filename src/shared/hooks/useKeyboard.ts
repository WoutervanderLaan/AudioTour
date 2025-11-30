import {useContext} from 'react'

import {KeyboardContext} from '@/shared/context/keyboard/KeyboardContext'
import type {KeyboardContextValue} from '@/shared/context/keyboard/KeyboardContext.types'

/**
 * Hook to access keyboard state from anywhere in the component tree.
 * Must be used within a KeyboardProvider.
 *
 * @returns Keyboard context values including height, animated height, and visibility state
 * @throws Error if used outside of KeyboardProvider
 *
 * @example
 * ```tsx
 * const { isKeyboardVisible, keyboardHeight, animatedKeyboardHeight } = useKeyboard();
 *
 * // Use static height
 * <View style={{ paddingBottom: keyboardHeight }} />
 *
 * // Use animated height
 * <Animated.View style={{ paddingBottom: animatedKeyboardHeight }} />
 * ```
 */
export const useKeyboard = (): KeyboardContextValue => {
  const context = useContext(KeyboardContext)

  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider')
  }

  return context
}
