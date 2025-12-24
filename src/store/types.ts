/**
 * CreateStoreOptions
 *
 * Configuration options for creating Zustand stores with optional persistence and devtools.
 */
export type CreateStoreOptions = {
  /**
   * Unique identifier for the store (used in devtools and persistence key)
   */
  name: string
  /**
   * When true, persists store state to AsyncStorage across app restarts
   */
  persist?: boolean
  /**
   * When true, enables Redux DevTools integration in development mode
   */
  devtools?: boolean
}
