/* eslint-disable no-console */

import {colorize, colors} from './colorize'
import {config} from './config'
import {formatPrefix} from './formatPrefix'
import {formatTable} from './formatTable'
import {shouldLog} from './shouldLog'
import {type LoggerConfig, LogLevel} from './types'

/**
 * Application logger with support for different log levels, colors, and table formatting.
 * In production, logs are disabled by default.
 *
 * @example
 * ```ts
 * // Basic logging with colors
 * logger.info('Server started', { port: 3000 })
 * logger.success('User created successfully')
 * logger.warn('Deprecated API usage')
 * logger.error('Failed to connect', error)
 *
 * // Table logging
 * logger.table([
 *   { name: 'Alice', age: 30, role: 'Developer' },
 *   { name: 'Bob', age: 25, role: 'Designer' }
 * ])
 *
 * // Grouped logs
 * logger.group('API Request')
 * logger.info('Method: GET')
 * logger.info('URL: /api/users')
 * logger.groupEnd()
 * ```
 */
export const logger = {
  /**
   * Logs a debug message (gray color)
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  debug: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.DEBUG)) {
      console.log(`${formatPrefix(LogLevel.DEBUG)} ${message}`, ...args)
    }
  },

  /**
   * Logs an info message (cyan color)
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  info: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.INFO)) {
      console.log(`${formatPrefix(LogLevel.INFO)} ${message}`, ...args)
    }
  },

  /**
   * Logs a success message (green color)
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  success: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.SUCCESS)) {
      console.log(`${formatPrefix(LogLevel.SUCCESS)} ${message}`, ...args)
    }
  },

  /**
   * Logs a warning message (yellow color)
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  warn: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(`${formatPrefix(LogLevel.WARN)} ${message}`, ...args)
    }
  },

  /**
   * Logs an error message (red color)
   *
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  error: (message: string, ...args: unknown[]): void => {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(`${formatPrefix(LogLevel.ERROR)} ${message}`, ...args)
    }
  },

  /**
   * Logs data as a formatted table
   *
   * @param data - Array of objects or single object to display as table
   * @param title - Optional title for the table
   */
  table: (
    data: Record<string, unknown>[] | Record<string, unknown>,
    title?: string,
  ): void => {
    if (config.enabled) {
      if (title) {
        console.log(
          `${formatPrefix(LogLevel.INFO)} ${colorize(title, colors.bright)}`,
        )
      }
      console.log(formatTable(data))
    }
  },

  /**
   * Creates a grouped/collapsible log section
   *
   * @param label - The label for the group
   */
  group: (label: string): void => {
    if (config.enabled) {
      console.group(colorize(label, colors.cyan))
    }
  },

  /**
   * Creates a collapsed grouped log section
   *
   * @param label - The label for the collapsed group
   */
  groupCollapsed: (label: string): void => {
    if (config.enabled) {
      console.groupCollapsed(colorize(label, colors.cyan))
    }
  },

  /**
   * Ends the current log group
   */
  groupEnd: (): void => {
    if (config.enabled) {
      console.groupEnd()
    }
  },

  /**
   * Logs a colored message with custom color
   *
   * @param message - The message to log
   * @param color - The color name from the colors object
   * @param args - Additional arguments to log
   */
  colored: (
    message: string,
    color: keyof typeof colors,
    ...args: unknown[]
  ): void => {
    if (config.enabled) {
      console.log(colorize(message, colors[color]), ...args)
    }
  },

  /**
   * Logs a separator line
   *
   * @param char - The character to use for the separator (default: '─')
   * @param length - The length of the separator (default: 80)
   */
  separator: (char = '─', length = 80): void => {
    if (config.enabled) {
      console.log(colorize(char.repeat(length), colors.gray))
    }
  },

  /**
   * Logs an object in a pretty JSON format
   *
   * @param obj - The object to log
   * @param title - Optional title for the JSON output
   */
  json: (obj: unknown, title?: string): void => {
    if (config.enabled) {
      if (title) {
        console.log(
          `${formatPrefix(LogLevel.INFO)} ${colorize(title, colors.bright)}`,
        )
      }
      console.log(JSON.stringify(obj, null, 2))
    }
  },

  /**
   * Configures the logger
   *
   * @param options - Configuration options
   */
  configure: (options: Partial<LoggerConfig>): void => {
    Object.assign(config, options)
  },
}
