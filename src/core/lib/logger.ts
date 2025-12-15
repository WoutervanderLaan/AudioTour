/* eslint-disable no-console */

/**
 * Log levels for the application logger
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
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
  /**
   * Whether to use colors in log output
   */
  useColors: boolean
}

const config: LoggerConfig = {
  enabled: __DEV__,
  minLevel: LogLevel.DEBUG,
  useColors: true,
}

const levelPriority = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
  [LogLevel.SUCCESS]: 1,
}

/**
 * ANSI color codes for terminal output
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  // Background colors
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
}

/**
 * Color mappings for each log level
 */
const levelColors = {
  [LogLevel.DEBUG]: colors.gray,
  [LogLevel.INFO]: colors.cyan,
  [LogLevel.WARN]: colors.yellow,
  [LogLevel.ERROR]: colors.red,
  [LogLevel.SUCCESS]: colors.green,
}

/**
 * Colorizes a string with ANSI color codes
 *
 * @param text - The text to colorize
 * @param color - The ANSI color code
 * @returns Colorized string
 */
const colorize = (text: string, color: string): string => {
  return config.useColors ? `${color}${text}${colors.reset}` : text
}

/**
 * Formats a log prefix with color and optional styling
 *
 * @param level - The log level
 * @returns Formatted and colorized prefix
 */
const formatPrefix = (level: LogLevel): string => {
  const prefix = `[${level}]`
  const color = levelColors[level]
  return colorize(`${colors.bright}${prefix}${colors.reset}`, color)
}

/**
 * Formats data as a table string
 *
 * @param data - Array of objects or single object to format as table
 * @returns Formatted table string
 */
const formatTable = (data: Record<string, unknown>[] | Record<string, unknown>): string => {
  const rows = Array.isArray(data) ? data : [data]

  if (rows.length === 0) {
    return 'Empty table'
  }

  // Get all unique keys
  const keys = Array.from(
    new Set(rows.flatMap(row => Object.keys(row)))
  )

  if (keys.length === 0) {
    return 'Empty table'
  }

  // Calculate column widths
  const columnWidths: Record<string, number> = {}
  keys.forEach(key => {
    const maxContentWidth = Math.max(
      ...rows.map(row => String(row[key] ?? '').length)
    )
    columnWidths[key] = Math.max(key.length, maxContentWidth, 3)
  })

  // Create table border
  const createBorder = (char: string): string => {
    return keys.map(key => char.repeat(columnWidths[key] + 2)).join('+')
  }

  // Create header row
  const header = keys
    .map(key => ` ${key.padEnd(columnWidths[key])} `)
    .join('|')

  // Create data rows
  const dataRows = rows.map(row =>
    keys
      .map(key => {
        const value = row[key]
        const stringValue = value === undefined || value === null ? '' : String(value)
        return ` ${stringValue.padEnd(columnWidths[key])} `
      })
      .join('|')
  )

  // Assemble table
  const topBorder = createBorder('─')
  const middleBorder = createBorder('─')
  const bottomBorder = createBorder('─')

  return [
    `┌${topBorder}┐`,
    `│${header}│`,
    `├${middleBorder}┤`,
    ...dataRows.map(row => `│${row}│`),
    `└${bottomBorder}┘`,
  ].join('\n')
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
    title?: string
  ): void => {
    if (config.enabled) {
      if (title) {
        console.log(
          `${formatPrefix(LogLevel.INFO)} ${colorize(title, colors.bright)}`
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
          `${formatPrefix(LogLevel.INFO)} ${colorize(title, colors.bright)}`
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
