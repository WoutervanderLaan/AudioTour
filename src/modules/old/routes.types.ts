/**
 * OldRouteName
 * Stack routes for the old module
 * NOTE: objectDetail and narrative routes have been deprecated in favor of the tour module
 */
export enum OldRouteName {
  notFound = 'NotFound',
}

/**
 * OldStackParams
 * Parameters for stack screens (detail screens above tabs)
 * NOTE: Capture, ObjectDetail, and Narrative screens have been moved to the tour module
 */
export type OldStackParams = {
  /**
   * Not found screen params
   */
  [OldRouteName.notFound]: undefined
}

/**
 * OldTabName
 * Tab routes for the old module
 * NOTE: capture tab has been deprecated in favor of the tour module's tour tab
 */
export enum OldTabName {
  museum = 'Museum',
  recommendations = 'Recommendations',
}

/**
 * OldTabParams
 * Parameters for tab screens in the bottom navigator
 */
export type OldTabParams = {
  /**
   * Museum tab screen params
   */
  [OldTabName.museum]: undefined
  /**
   * Recommendations tab screen params
   */
  [OldTabName.recommendations]: undefined
}

export enum OldModalName {
  settings = 'Settings',
}

/**
 * OldModalParams
 * TODO: describe what this type represents.
 */
export type OldModalParams = {
  /**
   * property
   */
  [OldModalName.settings]: undefined
}
