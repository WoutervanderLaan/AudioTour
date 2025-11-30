import {useContext} from 'react'

import {ToastContext} from '@/shared/context/toast/ToastContext'
import type {ToastContextType} from '@/shared/context/toast/ToastContext.types'

/**
 * useToast
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
