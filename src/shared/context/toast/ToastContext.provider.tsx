import React, {useCallback, useEffect, useMemo, useState} from 'react'

import * as Crypto from 'expo-crypto'

import {ToastContext} from './ToastContext'
import type {ToastProps} from './ToastContext.types'

import {Toast} from '@/shared/components/features/toast/Toast'
import {DURATION} from '@/shared/constants/ui'

/**
 * ToastProvider
 * Context provider that manages toast notification state and provides methods to show and close toast messages.
 *
 * @param {*} options
 * @returns {*} Toast context provider component
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
      toast.duration ?? DURATION.TOAST_DEFAULT,
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
          {...toast}
        />
      )}
    </ToastContext.Provider>
  )
}
