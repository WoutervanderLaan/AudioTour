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
  TOKEN_CHECK_INTERVAL: 60_000,

  /**
   * Default stale time for TanStack Query cache (5 minutes)
   */
  QUERY_STALE_TIME: 5 * 60 * 1000,

  /**
   * Default API request timeout (30 seconds)
   */
  API_TIMEOUT_DEFAULT: 30_000,

  /**
   * Extended API timeout for long-running operations like audio generation (2 minutes)
   */
  API_TIMEOUT_EXTENDED: 120_000,

  /**
   * Default toast notification duration (3 seconds)
   */
  TOAST_DURATION_DEFAULT: 3_000,

  /**
   * Short toast notification duration (2 seconds)
   */
  TOAST_DURATION_SHORT: 2_000,

  /**
   * Long toast notification duration (5 seconds)
   */
  TOAST_DURATION_LONG: 5_000,
} as const

/**
 * Type definition for timing constant keys
 */
export type TimingKey = keyof typeof TIMING
