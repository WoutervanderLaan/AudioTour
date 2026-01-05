import type {PersistedTour} from '../types'

/**
 * SaveTourParams
 * Parameters for saving a tour to the cloud.
 */
export type SaveTourParams = Omit<PersistedTour, 'syncStatus'>

/**
 * SaveTourResponse
 * API response when saving a tour.
 */
export type SaveTourResponse = {
  /**
   * The saved tour with cloud ID
   */
  tour: PersistedTour
  /**
   * Success message
   */
  message: string
}

/**
 * UpdateTourParams
 * Parameters for updating a tour in the cloud.
 */
export type UpdateTourParams = {
  /**
   * Tour ID to update
   */
  id: string
  /**
   * Partial tour data to update
   */
  updates: Partial<PersistedTour>
}

/**
 * UpdateTourResponse
 * API response when updating a tour.
 */
export type UpdateTourResponse = {
  /**
   * The updated tour
   */
  tour: PersistedTour
  /**
   * Success message
   */
  message: string
}

/**
 * DeleteTourResponse
 * API response when deleting a tour.
 */
export type DeleteTourResponse = {
  /**
   * Success message
   */
  message: string
}

/**
 * ShareTourParams
 * Parameters for sharing/unsharing a tour.
 */
export type ShareTourParams = {
  /**
   * Tour ID to share
   */
  id: string
  /**
   * Whether to share or unshare
   */
  isShared: boolean
}
