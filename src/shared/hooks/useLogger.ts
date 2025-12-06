import {logger} from '@/core/lib/logger'

/**
 * useLogger
 * React hook that provides access to the application logger with debug, info, warn, and error methods.
 *
 * @returns Logger instance with logging methods
 */
export const useLogger = (): {
  debug: (message: string, ...args: unknown[]) => void
  info: (message: string, ...args: unknown[]) => void
  warn: (message: string, ...args: unknown[]) => void
  error: (message: string, ...args: unknown[]) => void
} => {
  return logger
}
