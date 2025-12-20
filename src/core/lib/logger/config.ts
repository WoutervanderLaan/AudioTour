import {type LoggerConfig, LogLevel} from './types'

export const config: LoggerConfig = {
  enabled: __DEV__,
  minLevel: LogLevel.DEBUG,
  useColors: true,
}
