import {createContext} from 'react'

import type {ToastContextType} from './ToastContext.types'

/**
 * React Context for toast notification system.
 *
 * Provides toast state and methods throughout the app. Must be wrapped with ToastProvider
 * and accessed via the useToast hook.
 *
 * @see ToastProvider
 * @see useToast
 */
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
)
