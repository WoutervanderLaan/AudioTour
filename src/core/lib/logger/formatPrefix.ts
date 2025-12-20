import {colorize, colors} from './colorize'
import {LogLevel} from './types'

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
 * Formats a log prefix with color and optional styling
 *
 * @param level - The log level
 * @returns Formatted and colorized prefix
 */
export const formatPrefix = (level: LogLevel): string => {
  const prefix = `[${level}]`
  const color = levelColors[level]
  return colorize(prefix, color)
}
