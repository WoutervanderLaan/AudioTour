import type {PersistedTour, TourSummary} from '@/modules/history/types'

/**
 * CommunityAuthor
 * Author information for a community-shared tour.
 */
export type CommunityAuthor = {
  /**
   * Unique identifier for the author
   */
  id: string
  /**
   * Display name shown on tour cards and details
   */
  displayName: string
  /**
   * Optional URL to author's avatar image
   */
  avatarUrl?: string
}

/**
 * CommunityTour
 * Extended tour type with author information and community metadata.
 * Extends PersistedTour from the history module with additional fields
 * specific to community-shared tours.
 */
export type CommunityTour = PersistedTour & {
  /**
   * Author information for the tour creator
   */
  author: CommunityAuthor
  /**
   * Number of times this tour has been started/downloaded
   */
  downloadCount: number
  /**
   * Tags for discovery and filtering
   */
  tags: string[]
}

/**
 * CommunityTourSummary
 * Lightweight representation of a community tour for list views.
 * Contains only essential display information without full content.
 */
export type CommunityTourSummary = TourSummary & {
  /**
   * Author display name for attribution
   */
  author: Pick<CommunityAuthor, 'displayName'>
  /**
   * Whether this is an official admin-created tour
   */
  isOfficial: boolean
  /**
   * Number of times this tour has been started/downloaded
   */
  downloadCount: number
  /**
   * Tags for display and filtering
   */
  tags: string[]
  /**
   * Distance from user in meters (populated when using nearby filter)
   */
  distanceMeters?: number
}

/**
 * TourRating
 * Individual user rating for a community tour.
 */
export type TourRating = {
  /**
   * Unique identifier for the rating
   */
  id: string
  /**
   * ID of the tour being rated
   */
  tourId: string
  /**
   * ID of the user who submitted the rating
   */
  userId: string
  /**
   * Rating value from 1-5 stars
   */
  rating: number
  /**
   * Unix timestamp when the rating was created
   */
  createdAt: number
}

/**
 * SortOption
 * Available sort options for community tours.
 */
export type SortOption = 'rating' | 'recent' | 'popular' | 'distance'

/**
 * CommunityFilterOptions
 * Filter and search parameters for community tours query.
 */
export type CommunityFilterOptions = {
  /**
   * Search query string (matches title, description, tags)
   */
  query?: string
  /**
   * Filter by specific museum ID
   */
  museumId?: string
  /**
   * Minimum rating threshold (1-5)
   */
  minRating?: number
  /**
   * Filter to official tours only
   */
  isOfficial?: boolean
  /**
   * Sort order for results
   */
  sortBy?: SortOption
  /**
   * Filter by specific tags
   */
  tags?: string[]
}

/**
 * NearbySearchParams
 * Parameters for location-based tour search.
 */
export type NearbySearchParams = {
  /**
   * User's current latitude
   */
  latitude: number
  /**
   * User's current longitude
   */
  longitude: number
  /**
   * Search radius in kilometers (default: 10)
   */
  radiusKm?: number
}

/**
 * RateTourParams
 * Parameters for submitting a tour rating.
 */
export type RateTourParams = {
  /**
   * ID of the tour to rate
   */
  tourId: string
  /**
   * Rating value from 1-5
   */
  rating: number
}

/**
 * ReportTourParams
 * Parameters for reporting inappropriate tour content.
 */
export type ReportTourParams = {
  /**
   * ID of the tour to report
   */
  tourId: string
  /**
   * Reason for the report
   */
  reason: 'inappropriate' | 'spam' | 'copyright' | 'other'
  /**
   * Additional details about the report
   */
  details?: string
}

/**
 * FeaturedSectionType
 * Type of featured section to display (toggle between recommended and nearby).
 */
export type FeaturedSectionType = 'recommended' | 'nearby'
