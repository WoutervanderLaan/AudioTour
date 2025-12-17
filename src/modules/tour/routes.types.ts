/**
 * TourRouteName
 * Route identifiers for tour stack screens
 */
export enum TourRouteName {
  home = 'TourHome',
  feed = 'TourFeed',
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
  cameraPermission = 'TourCameraPermission',
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
  /**
   * Camera permission modal - request camera or library access
   */
  [TourModalName.cameraPermission]: {
    /**
     * Type of media source to request permission for
     */
    sourceType: 'camera' | 'library'
    /**
     * Callback to execute when permission is granted
     */
    onPermissionGranted: () => void
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
