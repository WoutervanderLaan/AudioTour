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
export type LoggerConfig = {
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
