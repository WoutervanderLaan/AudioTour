import React, {useCallback, useEffect, useMemo, useState} from 'react'

import * as Crypto from 'expo-crypto'

import {ToastContext} from './ToastContext'
import type {ToastProps} from './ToastContext.types'

import {Toast} from '@/shared/components/features/toast/Toast'
import {TIMING} from '@/shared/constants/timing'

/**
 * Provider component that manages toast notification state throughout the app.
 *
 * Provides methods to show and close toast messages with automatic timeout handling.
 * Supports multiple toast variants (success, error, info, warning) with customizable
 * duration and messages.
 *
 * @param props - Component props with children to wrap
 * @param props.children - Child components that will have access to toast context
 * @returns Toast context provider component
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [toast, setToast] = useState<ToastProps | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    const id = Crypto.randomUUID()

    setToast({id, ...toast})

    timeoutRef.current = setTimeout(
      () => setToast(null),
      toast.duration ?? TIMING.TOAST_DURATION,
    )
  }, [])

  const closeToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToast(null)
  }, [])

  useEffect(() => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const value = useMemo(
    () => ({showToast, closeToast}),
    [showToast, closeToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {!!toast && (
        <Toast
          key={toast.id}
          testID={`${toast.id || 'Toast'}Toast` as `${string}Toast`}
          {...toast}
        />
      )}
    </ToastContext.Provider>
  )
}
