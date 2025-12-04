/**
 * UI Constants
 *
 * Global UI-related constants for consistent styling and behavior across the app.
 */

/**
 * Z-index values for layering UI elements
 */
export const Z_INDEX = {
  /**
   * Toast notifications should appear above all other content
   */
  TOAST: 9999,
  /**
   * Modals and overlays
   */
  MODAL: 1000,
  /**
   * Dropdown menus and popovers
   */
  DROPDOWN: 100,
} as const

/**
 * Duration constants in milliseconds
 */
export const DURATION = {
  /**
   * Default duration for toast notifications
   */
  TOAST_DEFAULT: 3000,
  /**
   * Short animation duration
   */
  ANIMATION_SHORT: 200,
  /**
   * Medium animation duration
   */
  ANIMATION_MEDIUM: 300,
  /**
   * Long animation duration
   */
  ANIMATION_LONG: 500,
} as const
