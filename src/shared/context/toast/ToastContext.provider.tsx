import React, {useCallback, useEffect, useMemo, useState} from 'react'

import * as Crypto from 'expo-crypto'

import {ToastContext} from './ToastContext'
import type {ToastProps} from './ToastContext.types'

import {Toast} from '@/shared/components/features/toast/Toast'

const DEFAULT_DURATION = 3000 //TODO: constant

/**
 * ToastProvider
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
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
      toast.duration ?? DEFAULT_DURATION,
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
