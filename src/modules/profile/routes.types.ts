/**
 * ProfileRouteName
 * Route names for profile stack screens
 */
export enum ProfileRouteName {
  profile = 'Profile',
}

/**
 * ProfileStackParams
 * Parameters for profile stack screens
 */
export type ProfileStackParams = {
  /**
   * Profile screen params
   */
  [ProfileRouteName.profile]: undefined
}

/**
 * ProfileTabName
 * Route names for profile tab screens
 */
export enum ProfileTabName {}

/**
 * ProfileTabParams
 * Parameters for profile tab screens
 */
export type ProfileTabParams = Record<string, never>

/**
 * ProfileModalName
 * Route names for profile modal screens
 */
export enum ProfileModalName {}

/**
 * ProfileModalParams
 * Type mapping for profile modal names to their parameter shapes.
 * Currently empty as no modals are defined.
 */
export type ProfileModalParams = Record<string, never>
