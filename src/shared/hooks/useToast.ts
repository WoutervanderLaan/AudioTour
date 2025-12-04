import {useContext} from 'react'

import {ToastContext} from '@/shared/context/toast/ToastContext'
import type {ToastContextType} from '@/shared/context/toast/ToastContext.types'

/**
 * useToast
 * React hook that provides access to the toast notification system for displaying temporary messages to users.
 *
 * @returns {*} Toast context with methods to show and hide toast notifications
 */
export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
