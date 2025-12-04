/**
 * CreateStoreOptions
 *
 * Configuration options for creating Zustand stores with optional persistence and devtools.
 */
export type CreateStoreOptions = {
  /**
   * name
   */
  name: string
  /**
   * persist
   */
  persist?: boolean
  /**
   * devtools
   */
  devtools?: boolean
}
