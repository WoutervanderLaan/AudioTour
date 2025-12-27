/**
 * CommunityRouteName
 * Route identifiers for community stack screens.
 */
export enum CommunityRouteName {
  browse = 'CommunityBrowse',
  detail = 'CommunityDetail',
}

/**
 * CommunityStackParams
 * Parameter definitions for community stack screens.
 */
export type CommunityStackParams = {
  /**
   * Community browse screen - main discovery interface with search and filters
   */
  [CommunityRouteName.browse]: undefined
  /**
   * Community detail screen - detailed view of a community tour
   */
  [CommunityRouteName.detail]: {
    /**
     * ID of the tour to display
     */
    tourId: string
  }
}

/**
 * CommunityTabName
 * Route identifiers for community tab screens.
 */
export enum CommunityTabName {
  explore = 'ExploreTab',
}

/**
 * CommunityTabParams
 * Parameter definitions for community tab screens.
 */
export type CommunityTabParams = {
  /**
   * Explore tab - main entry point for community tour discovery
   */
  [CommunityTabName.explore]: undefined
}
