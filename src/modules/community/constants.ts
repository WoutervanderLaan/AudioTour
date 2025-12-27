import type {SortOption} from './types'

/**
 * Default search radius in kilometers for nearby tours.
 */
export const DEFAULT_NEARBY_RADIUS_KM = 10

/**
 * Default sort option for community tours.
 */
export const DEFAULT_SORT_OPTION: SortOption = 'rating'

/**
 * Rating filter options displayed as chips.
 */
export const RATING_FILTER_OPTIONS = [
  {label: '3+ Stars', value: 3},
  {label: '4+ Stars', value: 4},
  {label: '5 Stars', value: 5},
] as const

/**
 * Sort options for the community tours list.
 */
export const SORT_OPTIONS: Array<{label: string; value: SortOption}> = [
  {label: 'Top Rated', value: 'rating'},
  {label: 'Most Recent', value: 'recent'},
  {label: 'Most Popular', value: 'popular'},
  {label: 'Nearest', value: 'distance'},
]

/**
 * Number of tours to display in featured sections (recommended/nearby).
 */
export const FEATURED_SECTION_LIMIT = 10

/**
 * Number of tours to fetch per page in the main list.
 */
export const TOURS_PAGE_SIZE = 20

/**
 * Stale time for community tours queries in milliseconds (2 minutes).
 */
export const COMMUNITY_TOURS_STALE_TIME = 1000 * 60 * 2

/**
 * Stale time for recommended tours queries in milliseconds (5 minutes).
 */
export const RECOMMENDED_TOURS_STALE_TIME = 1000 * 60 * 5

/**
 * Stale time for individual tour details in milliseconds (10 minutes).
 */
export const TOUR_DETAIL_STALE_TIME = 1000 * 60 * 10
