import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(advancedFormat)

/**
 * DateTime utility configuration
 */
type DateTimeConfig = {
  /**
   * Default timezone for datetime operations (e.g., 'America/New_York', 'UTC')
   */
  defaultTimezone: string
  /**
   * Default format string for displaying dates
   */
  defaultFormat: string
}

const config: DateTimeConfig = {
  defaultTimezone: 'UTC',
  defaultFormat: 'YYYY-MM-DD HH:mm:ss',
}

/**
 * Enhanced DateTime utility built on dayjs with pre-configured plugins and helper methods.
 *
 * Includes plugins:
 * - UTC and timezone support
 * - Relative time (e.g., "2 hours ago")
 * - Duration manipulation
 * - Custom parse formats
 * - Advanced comparisons (isSameOrBefore, isSameOrAfter, isBetween)
 * - Advanced formatting options
 *
 * @example
 * ```ts
 * // Basic usage
 * const now = datetime()
 * const tomorrow = datetime().add(1, 'day')
 *
 * // Formatting
 * datetime.format(new Date(), 'MMM DD, YYYY')
 * datetime.formatRelative(someDate) // "2 hours ago"
 *
 * // Comparisons
 * datetime.isExpired(tokenExpiry)
 * datetime.isBetween(date, start, end)
 *
 * // Timezone
 * datetime.toTimezone(date, 'America/New_York')
 *
 * // Unix timestamps
 * datetime.timestamp() // Current timestamp in milliseconds
 * datetime.fromTimestamp(1609459200000)
 * ```
 */
export const datetime = Object.assign(dayjs, {
  /**
   * Gets the current timestamp in milliseconds (equivalent to Date.now())
   *
   * @returns Current timestamp in milliseconds
   */
  timestamp: (): number => {
    return dayjs().valueOf()
  },

  /**
   * Creates a dayjs instance from a Unix timestamp in milliseconds
   *
   * @param timestamp - Unix timestamp in milliseconds
   * @returns dayjs instance
   */
  fromTimestamp: (timestamp: number): dayjs.Dayjs => {
    return dayjs(timestamp)
  },

  /**
   * Formats a date using the default or custom format string
   *
   * @param date - Date to format (Date, string, number, or dayjs instance)
   * @param format - Optional format string (defaults to configured default)
   * @returns Formatted date string
   */
  format: (
    date: dayjs.ConfigType,
    format: string = config.defaultFormat,
  ): string => {
    return dayjs(date).format(format)
  },

  /**
   * Formats a date as relative time (e.g., "2 hours ago", "in 3 days")
   *
   * @param date - Date to format
   * @param withoutSuffix - If true, removes "ago" or "in" prefix/suffix
   * @returns Relative time string
   */
  formatRelative: (date: dayjs.ConfigType, withoutSuffix = false): string => {
    return dayjs(date).fromNow(withoutSuffix)
  },

  /**
   * Checks if a date is in the past (expired)
   *
   * @param date - Date to check
   * @returns True if the date is before now
   */
  isExpired: (date: dayjs.ConfigType): boolean => {
    return dayjs(date).isBefore(dayjs())
  },

  /**
   * Checks if a date is in the future
   *
   * @param date - Date to check
   * @returns True if the date is after now
   */
  isFuture: (date: dayjs.ConfigType): boolean => {
    return dayjs(date).isAfter(dayjs())
  },

  /**
   * Checks if a date is between two other dates
   *
   * @param date - Date to check
   * @param start - Start date of range
   * @param end - End date of range
   * @param inclusivity - Include boundaries ('[]', '()', '[)', '(]')
   * @returns True if date is between start and end
   */
  isBetween: (
    date: dayjs.ConfigType,
    start: dayjs.ConfigType,
    end: dayjs.ConfigType,
    inclusivity: '[]' | '()' | '[)' | '(]' = '()',
  ): boolean => {
    return dayjs(date).isBetween(start, end, null, inclusivity)
  },

  /**
   * Converts a date to a specific timezone
   *
   * @param date - Date to convert
   * @param tz - Target timezone (defaults to configured timezone)
   * @returns dayjs instance in the target timezone
   */
  toTimezone: (
    date: dayjs.ConfigType,
    tz: string = config.defaultTimezone,
  ): dayjs.Dayjs => {
    return dayjs(date).tz(tz)
  },

  /**
   * Converts a date to UTC
   *
   * @param date - Date to convert
   * @returns dayjs instance in UTC
   */
  toUTC: (date: dayjs.ConfigType): dayjs.Dayjs => {
    return dayjs(date).utc()
  },

  /**
   * Gets the start of a time unit (e.g., start of day, month, year)
   *
   * @param date - Date to process
   * @param unit - Time unit ('day', 'month', 'year', 'hour', etc.)
   * @returns dayjs instance at the start of the unit
   */
  startOf: (
    date: dayjs.ConfigType,
    unit: dayjs.OpUnitType,
  ): dayjs.Dayjs => {
    return dayjs(date).startOf(unit)
  },

  /**
   * Gets the end of a time unit (e.g., end of day, month, year)
   *
   * @param date - Date to process
   * @param unit - Time unit ('day', 'month', 'year', 'hour', etc.)
   * @returns dayjs instance at the end of the unit
   */
  endOf: (date: dayjs.ConfigType, unit: dayjs.OpUnitType): dayjs.Dayjs => {
    return dayjs(date).endOf(unit)
  },

  /**
   * Calculates the difference between two dates
   *
   * @param date1 - First date
   * @param date2 - Second date
   * @param unit - Unit to return the difference in ('millisecond', 'second', 'minute', 'hour', 'day', etc.)
   * @param precise - If true, returns decimal instead of integer
   * @returns Difference in the specified unit
   */
  diff: (
    date1: dayjs.ConfigType,
    date2: dayjs.ConfigType,
    unit: dayjs.QUnitType | dayjs.OpUnitType = 'millisecond',
    precise = false,
  ): number => {
    return dayjs(date1).diff(dayjs(date2), unit, precise)
  },

  /**
   * Creates a duration object from a time value
   *
   * @param value - Duration value
   * @param unit - Duration unit ('millisecond', 'second', 'minute', 'hour', 'day', etc.)
   * @returns Duration instance
   */
  duration: (
    value: number,
    unit: dayjs.ManipulateType = 'millisecond',
  ): duration.Duration => {
    return dayjs.duration(value, unit)
  },

  /**
   * Gets the current year
   *
   * @returns Current year as number
   */
  currentYear: (): number => {
    return dayjs().year()
  },

  /**
   * Parses a date string with a custom format
   *
   * @param dateString - Date string to parse
   * @param format - Format pattern
   * @param strict - If true, requires exact format match
   * @returns dayjs instance
   */
  parse: (
    dateString: string,
    format: string,
    strict = false,
  ): dayjs.Dayjs => {
    return dayjs(dateString, format, strict)
  },

  /**
   * Checks if a value is a valid date
   *
   * @param date - Value to check
   * @returns True if the value is a valid date
   */
  isValid: (date: dayjs.ConfigType): boolean => {
    return dayjs(date).isValid()
  },

  /**
   * Configures the datetime utility
   *
   * @param options - Configuration options
   */
  configure: (options: Partial<DateTimeConfig>): void => {
    Object.assign(config, options)
  },
})
