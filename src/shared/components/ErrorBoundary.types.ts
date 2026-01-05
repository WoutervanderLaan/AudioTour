import type {ReactNode} from 'react'

import type {TestProps} from '../types/TestProps'

/**
 * ErrorBoundaryProps
 * Props for the ErrorBoundary component.
 */
export type ErrorBoundaryProps = TestProps<'ErrorBoundary'> & {
  /**
   * Child components to be wrapped and protected by the error boundary
   */
  children: ReactNode
  /**
   * Optional fallback UI to display when an error occurs.
   * If not provided, uses the default error UI.
   */
  fallback?: ReactNode
}

/**
 * ErrorBoundaryState
 * State for the ErrorBoundary component.
 */
export type ErrorBoundaryState = {
  /**
   * Whether an error has been caught
   */
  hasError: boolean
  /**
   * The error that was caught, if any
   */
  error?: Error
}
