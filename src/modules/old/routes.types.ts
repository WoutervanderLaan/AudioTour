export enum OldRouteName {
  objectDetail = 'ObjectDetail',
  narrative = 'Narrative',
  notFound = 'NotFound',
}

/**
 * OldStackParams - Parameters for stack screens (detail screens above tabs)
 */
export type OldStackParams = {
  /**
   * Object detail screen params
   */
  [OldRouteName.objectDetail]: {objectId: string}
  /**
   * Narrative screen params
   */
  [OldRouteName.narrative]: undefined
  /**
   * Not found screen params
   */
  [OldRouteName.notFound]: undefined
}

export enum OldTabName {
  capture = 'Capture',
  museum = 'Museum',
  recommendations = 'Recommendations',
}

/**
 * OldTabParams - Parameters for tab screens in the bottom navigator
 */
export type OldTabParams = {
  /**
   * Capture tab screen params
   */
  [OldTabName.capture]: undefined
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
