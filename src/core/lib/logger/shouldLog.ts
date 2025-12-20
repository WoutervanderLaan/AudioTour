import {config} from './config'
import {LogLevel} from './types'

const levelPriority = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
  [LogLevel.SUCCESS]: 1,
}

/**
 * Checks if a log level should be output based on configuration
 *
 * @param level - The log level to check
 * @returns True if the level should be logged
 */
export const shouldLog = (level: LogLevel): boolean => {
  return (
    config.enabled && levelPriority[level] >= levelPriority[config.minLevel]
  )
}
