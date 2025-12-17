import React, {Component, type ErrorInfo, type ReactNode} from 'react'
import {View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Button} from './ui/pressable'
import {Text} from './ui/typography'

import {logger} from '@/core/lib/logger'

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
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text.Title style={styles.title}>Something went wrong</Text.Title>
            <Text.Paragraph style={styles.message}>
              We encountered an unexpected error. Please try restarting the app.
            </Text.Paragraph>
            {__DEV__ && this.state.error && (
              <View style={styles.errorDetails}>
                <Text.Label style={styles.errorMessage}>
                  {this.state.error.message}
                </Text.Label>
                {this.state.error.stack && (
                  <Text.Label
                    style={styles.errorStack}
                    numberOfLines={10}>
                    {this.state.error.stack}
                  </Text.Label>
                )}
              </View>
            )}
            <Button
              label="Try Again"
              onPress={this.handleReset}
            />
          </View>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.screen.background,
    padding: theme.size.lg,
  },
  content: {
    maxWidth: 400,
    alignItems: 'center',
    gap: theme.size.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.size.sm,
  },
  message: {
    textAlign: 'center',
    color: theme.color.text.secondary,
    marginBottom: theme.size.md,
  },
  errorDetails: {
    width: '100%',
    backgroundColor: theme.color.textInput.container.background,
    padding: theme.size.md,
    borderRadius: theme.size.sm,
    marginBottom: theme.size.md,
  },
  errorMessage: {
    color: theme.color.destructive,
    marginBottom: theme.size.sm,
    fontWeight: 'bold',
  },
  errorStack: {
    color: theme.color.text.secondary,
    fontSize: 12,
    fontFamily: 'monospace',
  },
}))
