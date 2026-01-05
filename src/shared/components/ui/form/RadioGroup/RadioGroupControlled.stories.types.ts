/**
 * FormData
 * Form data type for the theme preference form
 */
export type FormData = {
  /**
   * theme
   */
  theme: 'light' | 'dark' | 'auto'
}

/**
 * PreferencesData
 * Form data type for the notification preferences form
 */
export type PreferencesData = {
  /**
   * notifications
   */
  notifications: 'all' | 'important' | 'none'
}
