import * as ReactNavigation from '@react-navigation/native'
import * as Crypto from 'expo-crypto'
import React, {createContext, useCallback, useContext, useState} from 'react'

import {Toast} from '@/components/Toast'

type ToastProps = {
  id?: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

const DEFAULT_DURATION = 3000

type ToastContextType = {
  showToast: (toast: ToastProps) => void
  closeToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({
  children,
  theme,
}: {
  children: React.ReactNode
  theme: ReactNavigation.Theme
}) {
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

  return (
    <ToastContext.Provider
      value={{showToast, closeToast: () => setToast(null)}}>
      {children}
      {!!toast && (
        <Toast
          key={toast.id}
          {...toast}
          theme={theme}
        />
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
