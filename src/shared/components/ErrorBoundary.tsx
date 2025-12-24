import React, {Component, type ErrorInfo, type ReactNode} from 'react'

import {Column} from './ui/layout/Column'
import {Text} from './ui/typography'

import {logger} from '@/core/lib/logger/logger'
import {Button} from '@/shared/components/ui/pressable/Button'

/**
 * ErrorBoundaryProps
 * Props for the ErrorBoundary component.
 */
type ErrorBoundaryProps = {
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
type ErrorBoundaryState = {
  /**
   * Whether an error has been caught
   */
  hasError: boolean
  /**
   * The error that was caught, if any
   */
  error?: Error
}

/**
 * ErrorBoundary
 * React error boundary component that catches JavaScript errors in child components.
 * Prevents the entire app from crashing by displaying a fallback UI when errors occur.
 * Logs errors for debugging and provides a reset button to attempt recovery.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * Creates an instance of ErrorBoundary.
   *
   * @param props - Component props
   */
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {hasError: false}
  }

  /**
   * getDerivedStateFromError
   * Static lifecycle method called when an error is thrown.
   * Updates state to display fallback UI on next render.
   *
   * @param error - The error that was thrown
   * @returns New state with error flag set
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error}
  }

  /**
   * componentDidCatch
   * Lifecycle method called after an error has been caught.
   * Logs the error and its component stack for debugging.
   *
   * @param error - The error that was thrown
   * @param errorInfo - Additional information about the error, including component stack
   * @returns void
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('[ErrorBoundary] Caught error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })

    // Here you could send error to error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  /**
   * handleReset
   * Resets the error boundary state, allowing the app to attempt recovery.
   * This will re-render the child components.
   *
   * @returns void
   */
  handleReset = (): void => {
    this.setState({hasError: false, error: undefined})
  }

  /**
   * render
   * Renders either the children or the fallback UI based on error state.
   *
   * @returns React element
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default error UI
      if (this.props.fallback !== undefined) {
        return this.props.fallback
      }

      return (
        <Column
          paddingV="lg"
          flex={1}
          center
          paddingH="md"
          gap="md">
          <Text.Title align="center">Something went wrong</Text.Title>
          <Text.Paragraph align="center">
            We encountered an unexpected error. Please try restarting the app.
          </Text.Paragraph>
          {!!__DEV__ && !!this.state.error && (
            <Column
              padding="lg"
              gap="sm">
              <Text.Label
                color="warning"
                fontFamily="bold">
                {this.state.error.message}
              </Text.Label>
              {!!this.state.error.stack && (
                <Text.Paragraph
                  numberOfLines={10}
                  variant="extraSmall">
                  {this.state.error.stack}
                </Text.Paragraph>
              )}
            </Column>
          )}
          <Button
            label="Try Again"
            onPress={this.handleReset}
          />
        </Column>
      )
    }

    return this.props.children
  }
}
