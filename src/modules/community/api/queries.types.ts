import type {CommunityTourSummary} from '../types'

/**
 * CommunityToursResponse
 * API response type for fetching community tours.
 */
export type CommunityToursResponse = {
  /**
   * Array of community tour summaries
   */
  tours: CommunityTourSummary[]
  /**
   * Total count of matching tours
   */
  total: number
}

/**
 * RecommendedToursResponse
 * API response type for fetching recommended tours.
 */
export type RecommendedToursResponse = {
  /**
   * Array of recommended tour summaries
   */
  tours: CommunityTourSummary[]
}

/**
 * NearbyToursResponse
 * API response type for fetching nearby tours.
 */
export type NearbyToursResponse = {
  /**
   * Array of nearby tour summaries with distance info
   */
  tours: CommunityTourSummary[]
}
