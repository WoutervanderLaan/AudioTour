import {logger} from '@/core/lib/logger'

/**
 * useLogger
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useLogger = (): {
  debug: (message: string, ...args: unknown[]) => void
  info: (message: string, ...args: unknown[]) => void
  warn: (message: string, ...args: unknown[]) => void
  error: (message: string, ...args: unknown[]) => void
} => {
  return logger
}
