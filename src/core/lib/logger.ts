/* eslint-disable no-console */

/**
 * Log levels for the application logger
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Logger configuration
 */
type LoggerConfig = {
  /**
   * Whether logging is enabled (typically true in development, false in production)
   */
  enabled: boolean
  /**
   * Minimum log level required for messages to be output
   */
  minLevel: LogLevel
}

const config: LoggerConfig = {
  enabled: __DEV__,
  minLevel: LogLevel.DEBUG,
}

const levelPriority = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
}

/**
 * Checks if a log level should be output based on configuration
 *
 * @param level - The log level to check
 * @returns True if the level should be logged
 */
const shouldLog = (level: LogLevel): boolean => {
  return (
    config.enabled && levelPriority[level] >= levelPriority[config.minLevel]
  )
}

/**
 * Application logger with support for different log levels.
 * In production, logs are disabled by default.
 */
export const logger = {
  /**
   * Logs a debug message
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  debug: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.DEBUG)) {
      console.log(`[DEBUG] ${message}`, ...args)
    }
  },

  /**
   * Logs an info message
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  info: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.INFO)) {
      console.log(`[INFO] ${message}`, ...args)
    }
  },

  /**
   * Logs a warning message
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  warn: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(`[WARN] ${message}`, ...args)
    }
  },

  /**
   * Logs an error message
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  error: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(`[ERROR] ${message}`, ...args)
    }
  },
}
