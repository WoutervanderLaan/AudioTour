import type {ToastType} from '@/shared/components/features/toast/Toast'

/**
 * ToastProps
 * Props for the Toast component including message, type, duration, and unique identifier.
 */
export type ToastProps = {
  /**
   * id
   */
  id?: string
  /**
   * message
   */
  message: string
  /**
   * type
   */
  type?: ToastType
  /**
   * duration
   */
  duration?: number
}

/**
 * ToastContextType
 * Type definition for the toast context providing methods to show and close toast notifications.
 */
export type ToastContextType = {
  /**
   * showToast
   */
  showToast: (toast: ToastProps) => void
  /**
   * closeToast
   */
  closeToast: () => void
}
