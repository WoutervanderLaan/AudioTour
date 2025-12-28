import type {FeedItem} from '@/modules/tour/types'
import type {Coordinates} from '@/shared/hooks/useUserLocation'

/**
 * HistorySortOption
 * Available sorting options for tour history.
 */
export type HistorySortOption = 'date-desc' | 'date-asc' | 'title'

/**
 * SyncStatus
 * Represents the synchronization status of a tour with the backend.
 */
export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error'

/**
 * PersistedTour
 * Represents a completed audio tour that has been saved for later access.
 * Contains all artwork entries, metadata, and sharing information.
 */
export type PersistedTour = {
  /**
   * Unique identifier for the persisted tour
   */
  id: string
  /**
   * Unix timestamp when the tour was created
   */
  createdAt: number
  /**
   * Unix timestamp when the tour was last updated
   */
  updatedAt: number

  // Tour metadata
  /**
   * Title of the tour (auto-generated or user-customized)
   */
  title: string
  /**
   * Description of the tour (auto-generated or user-customized)
   */
  description: string
  /**
   * URI of the hero image (first photo or user-selected)
   */
  heroImageUri: string

  // Location context
  /**
   * ID of the museum from KNOWN_MUSEUMS or null if unknown
   */
  museumId: string | null
  /**
   * Name of the museum or 'Unknown Location' if not identified
   */
  museumName: string
  /**
   * Geographic coordinates of the tour start location
   */
  coordinates: Coordinates | null

  // Tour content
  /**
   * Array of all artwork entries from the tour session
   */
  feedItems: FeedItem[]

  // User & session
  /**
   * User ID for future auth integration (null if anonymous)
   */
  userId: string | null
  /**
   * Session ID from the user session store
   */
  sessionId: string

  // Sharing & community
  /**
   * Whether the tour is shared publicly with the community
   */
  isShared: boolean
  /**
   * Whether the tour is an official admin-created pre-made tour
   */
  isOfficial: boolean
  /**
   * Community rating from 0-5 stars (average)
   */
  communityRating: number
  /**
   * Total number of ratings received
   */
  ratingCount: number

  // Sync status
  /**
   * Current synchronization status with the backend
   */
  syncStatus: SyncStatus
}

/**
 * TourSummary
 * Lightweight representation of a tour for list views.
 * Contains only essential display information without full content.
 */
export type TourSummary = Pick<
  PersistedTour,
  | 'id'
  | 'title'
  | 'description'
  | 'heroImageUri'
  | 'museumName'
  | 'createdAt'
  | 'communityRating'
  | 'ratingCount'
> & {
  /**
   * Number of artworks in the tour
   */
  artworkCount: number
}

/**
 * CreatePersistedTourParams
 * Parameters required to create a new persisted tour.
 * Used when saving a completed tour session.
 */
export type CreatePersistedTourParams = Omit<
  PersistedTour,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'isShared'
  | 'isOfficial'
  | 'communityRating'
  | 'ratingCount'
  | 'syncStatus'
>

/**
 * HistoryState
 * Zustand store state for managing persisted tour history.
 */
export type HistoryState = {
  /**
   * Array of all persisted tours
   */
  tours: PersistedTour[]
  /**
   * Whether the store is currently loading data
   */
  isLoading: boolean
  /**
   * Saves a new tour to the history
   */
  saveTour: (params: CreatePersistedTourParams) => string
  /**
   * Updates an existing tour with partial changes
   */
  updateTour: (id: string, updates: Partial<PersistedTour>) => void
  /**
   * Deletes a tour from the history
   */
  deleteTour: (id: string) => void
  /**
   * Retrieves a tour by its ID
   */
  getTour: (id: string) => PersistedTour | undefined
  /**
   * Retrieves all tours sorted by creation date (newest first)
   */
  getTours: () => PersistedTour[]
  /**
   * Sets the loading state
   */
  setLoading: (loading: boolean) => void
  /**
   * Resets the store to its initial state
   */
  reset: () => void
  /**
   * Initializes the store (called after hydration)
   */
  initialize: () => void
}

/**
 * TourUpdateParams
 * Parameters for updating a tour.
 */
export type TourUpdateParams = Pick<
  Partial<PersistedTour>,
  'title' | 'description' | 'heroImageUri'
>
