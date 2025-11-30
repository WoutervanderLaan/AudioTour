import type {ToastType} from '@/shared/components/features/toast/Toast'

/**
 * ToastProps
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
