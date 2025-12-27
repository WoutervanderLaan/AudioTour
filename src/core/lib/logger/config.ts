import {type LoggerConfig, LogLevel} from './types'

/**
 * Default logger configuration.
 *
 * Controls logging behavior throughout the application including whether logs are enabled,
 * minimum log level to display, and whether to use colored output.
 *
 * @property {boolean} enabled - Whether logging is enabled (defaults to __DEV__)
 * @property {LogLevel} minLevel - Minimum log level to display
 * @property {boolean} useColors - Whether to use colored console output
 */
export const config: LoggerConfig = {
  enabled: __DEV__,
  minLevel: LogLevel.DEBUG,
  useColors: true,
}
