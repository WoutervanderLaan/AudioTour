import type {TourSummary} from '../types'

/**
 * MyToursResponse
 * API response type for fetching user's tours.
 */
export type MyToursResponse = {
  /**
   * Array of tour summaries belonging to the user
   */
  tours: TourSummary[]
  /**
   * Total count of tours
   */
  total: number
}

/**
 * CommunityToursResponse
 * API response type for fetching community/shared tours.
 */
export type CommunityToursResponse = {
  /**
   * Array of shared tour summaries
   */
  tours: TourSummary[]
  /**
   * Total count of shared tours
   */
  total: number
}
