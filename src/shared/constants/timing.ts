import {TIME} from '../types/Time'

/**
 * Timing constants used throughout the application.
 * Centralizes timeout values, intervals, and duration settings.
 */

/**
 * TIMING
 * Object containing all timing-related constants for the application.
 * All values are in milliseconds unless otherwise noted.
 */
export const TIMING = {
  /**
   * Interval for checking authentication token validity (1 minute)
   */
  TOKEN_CHECK_INTERVAL: TIME.MINUTE,
  /**
   * Default stale time for TanStack Query cache (5 minutes)
   */
  QUERY_STALE_TIME: 5 * TIME.MINUTE,
  /**
   * Default API request timeout (30 seconds)
   */
  API_TIMEOUT: 30 * TIME.SECOND,
  /**
   * Default duration for toast notifications
   */
  TOAST_DURATION: 3 * TIME.SECOND,
} as const

/**
 * Type definition for timing constant keys
 */
export type TimingKey = keyof typeof TIMING
