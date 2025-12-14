/**
 * TourRouteName
 * Route identifiers for tour stack screens
 */
export enum TourRouteName {
  home = 'TourHome',
  feed = 'TourFeed',
  camera = 'TourCamera',
  objectDetail = 'TourObjectDetail',
}

/**
 * TourStackParams
 * Parameter definitions for tour stack screens
 */
export type TourStackParams = {
  /**
   * Tour home screen - landing page for starting tours
   */
  [TourRouteName.home]: undefined
  /**
   * Tour feed screen - main tour interface with feed items
   */
  [TourRouteName.feed]: {
    /**
     * Optional tour session ID to resume
     */
    sessionId?: string
  }
  /**
   * Tour camera screen - capture photos of objects
   */
  [TourRouteName.camera]: {
    /**
     * Optional existing photos to add to
     */
    existingPhotos?: string[]
  }
  /**
   * Tour object detail screen - detailed view of captured object
   */
  [TourRouteName.objectDetail]: {
    /**
     * ID of the feed item to display
     */
    feedItemId: string
  }
}

/**
 * TourModalName
 * Route identifiers for tour modal screens
 */
export enum TourModalName {
  photoSubmit = 'TourPhotoSubmit',
}

/**
 * TourModalParams
 * Parameter definitions for tour modal screens
 */
export type TourModalParams = {
  /**
   * Photo submission modal - submit photos with metadata
   */
  [TourModalName.photoSubmit]: {
    /**
     * Array of photo URIs to submit
     */
    photos: string[]
  }
}

/**
 * TourTabName
 * Route identifiers for tour tab screens (if any)
 */
export enum TourTabName {
  tour = 'Tour',
}

/**
 * TourTabParams
 * Parameter definitions for tour tab screens
 */
export type TourTabParams = {
  /**
   * Tour tab - main entry point for tours
   */
  [TourTabName.tour]: undefined
}
