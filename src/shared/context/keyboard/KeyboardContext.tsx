import {createContext} from 'react'

import type {KeyboardContextValue} from './KeyboardContext.types'

/**
 * React Context for keyboard state tracking.
 *
 * Provides keyboard visibility and height information throughout the app.
 * Must be wrapped with KeyboardProvider and accessed via the useKeyboard hook.
 *
 * @see KeyboardProvider
 * @see useKeyboard
 */
export const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined,
)
