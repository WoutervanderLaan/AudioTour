import type {HistorySortOption} from './types'

/**
 * Default museum name for tours without identified location
 */
export const DEFAULT_MUSEUM_NAME = 'Unknown Location'

/**
 * Maximum length for tour description in characters
 */
export const MAX_DESCRIPTION_LENGTH = 150

/**
 * Maximum length for tour title in characters
 */
export const MAX_TITLE_LENGTH = 100

/**
 * Default sort order for tour history
 */
export const DEFAULT_SORT_ORDER: HistorySortOption = 'date-desc' as const

/**
 * Number of tours to render initially in the list
 */
export const INITIAL_RENDER_COUNT = 5

/**
 * Window size for FlatList virtualization
 */
export const LIST_WINDOW_SIZE = 5
