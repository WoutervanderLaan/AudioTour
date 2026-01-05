import type {TestProps} from '@/shared/types/TestProps'

/**
 * ToastType
 * Enum representing the visual type of toast notification
 */
export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * ToastProps
 * Component props for the Toast notification component including message content and visual type.
 */
export type ToastProps = Readonly<
  TestProps<'Toast'> & {
    /**
     * message
     */
    message: string
    /**
     * type
     */
    type?: ToastType
  }
>
