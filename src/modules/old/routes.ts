export enum OldRouteName {
  capture = 'Capture',
  museum = 'Museum',
  recommendations = 'Recommendations',
  objectDetail = 'ObjectDetail',
  narrative = 'Narrative',
  notFound = 'NotFound',
}

/**
 * OldStackParams
 * TODO: describe what this type represents.
 */
export type OldStackParams = {
  /**
   * property
   */
  [OldRouteName.capture]: undefined
  /**
   * property
   */
  [OldRouteName.museum]: undefined
  /**
   * property
   */
  [OldRouteName.recommendations]: undefined
  /**
   * property
   */
  [OldRouteName.objectDetail]: {objectId: string}
  /**
   * property
   */
  [OldRouteName.narrative]: undefined
  /**
   * property
   */
  [OldRouteName.notFound]: undefined
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
