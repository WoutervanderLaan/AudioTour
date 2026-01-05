import type {TourRating} from '../types'

/**
 * RateTourResponse
 * API response when rating a tour.
 */
export type RateTourResponse = {
  /**
   * The created or updated rating
   */
  rating: TourRating
  /**
   * Updated average rating for the tour
   */
  averageRating: number
  /**
   * Updated total rating count for the tour
   */
  ratingCount: number
  /**
   * Success message
   */
  message: string
}

/**
 * ReportTourResponse
 * API response when reporting a tour.
 */
export type ReportTourResponse = {
  /**
   * Report ID for tracking
   */
  reportId: string
  /**
   * Success message
   */
  message: string
}
