import {useCallback, useRef} from 'react'

import {useTourStore} from '../store/useTourStore'

import {logger} from '@/core/lib/logger/logger'
import {useHistoryStore} from '@/modules/history/store/useHistoryStore'
import type {CreatePersistedTourParams} from '@/modules/history/types'
import {
  generateTourDescription,
  generateTourTitle,
  getHeroImageUri,
} from '@/modules/history/utils/tourTitleGenerator'
import {KNOWN_MUSEUMS} from '@/shared/constants/museums'
import type {Coordinates} from '@/shared/hooks/useUserLocation'
import {useMuseumStore} from '@/store/slices/museumStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

const UNKNOWN_LOCATION = 'Unknown Location'
const MIN_ITEMS_TO_SAVE = 1

/**
 * UseTourPersistenceReturn
 * Return type for the useTourPersistence hook
 */
type UseTourPersistenceReturn = {
  /**
   * Saves the current tour to history and returns the saved tour ID
   */
  saveTourToHistory: (coordinates?: Coordinates | null) => string | null
  /**
   * Whether the current tour has enough content to be saved
   */
  canSaveTour: () => boolean
  /**
   * Whether the tour has already been saved in this session
   */
  isSaved: boolean
}

/**
 * useTourPersistence
 * Hook for managing tour persistence, including saving the current tour session to history.
 * Handles collecting tour data from various stores and generating metadata.
 *
 * @returns Object with saveTourToHistory function and state indicators
 *
 * @example
 * const { saveTourToHistory, canSaveTour } = useTourPersistence()
 *
 * if (canSaveTour()) {
 *   const tourId = saveTourToHistory(userCoordinates)
 * }
 */
export function useTourPersistence(): UseTourPersistenceReturn {
  const savedTourIdRef = useRef<string | null>(null)

  // Tour store
  const feedItems = useTourStore(state => state.feedItems)

  // Museum store
  const currentMuseumId = useMuseumStore(state => state.currentMuseumId)

  // User session store
  const sessionId = useUserSessionStore(state => state.sessionId)
  const userId = useUserSessionStore(state => state.user?.id ?? null)

  // History store
  const saveTour = useHistoryStore(state => state.saveTour)

  /**
   * canSaveTour
   * Checks if the current tour has enough content to be saved.
   *
   * @returns Boolean indicating if tour can be saved
   */
  const canSaveTour = useCallback((): boolean => {
    // Only save tours with at least one feed item
    const readyItems = feedItems.filter(
      item => item.status === 'ready' || item.status === 'error',
    )
    return readyItems.length >= MIN_ITEMS_TO_SAVE
  }, [feedItems])

  /**
   * saveTourToHistory
   * Collects all tour data and saves it to the history store.
   * Returns the generated tour ID if successful, null if tour cannot be saved.
   *
   * @param coordinates - Optional user coordinates at tour location
   * @returns Generated tour ID or null if save failed/skipped
   */
  const saveTourToHistory = useCallback(
    (coordinates?: Coordinates | null): string | null => {
      // Prevent duplicate saves
      if (savedTourIdRef.current) {
        logger.debug('[TourPersistence] Tour already saved, skipping')
        return savedTourIdRef.current
      }

      if (!canSaveTour()) {
        logger.debug('[TourPersistence] No content to save')
        return null
      }

      // Get museum info
      const museum = currentMuseumId
        ? KNOWN_MUSEUMS.find(m => m.id === currentMuseumId)
        : undefined

      const museumName = museum?.name ?? UNKNOWN_LOCATION
      const museumId = museum?.id ?? null

      // Generate title and description
      const title = generateTourTitle(feedItems, museumName)
      const description = generateTourDescription(feedItems)
      const heroImageUri = getHeroImageUri(feedItems)

      const tourParams: CreatePersistedTourParams = {
        title,
        description,
        heroImageUri,
        museumId,
        museumName,
        coordinates: coordinates ?? null,
        feedItems: [...feedItems],
        userId,
        sessionId,
      }

      logger.debug('[TourPersistence] Saving tour:', {
        title,
        itemCount: feedItems.length,
        museumName,
      })

      const tourId = saveTour(tourParams)
      savedTourIdRef.current = tourId

      logger.info('[TourPersistence] Tour saved successfully:', {tourId})

      return tourId
    },
    [canSaveTour, currentMuseumId, feedItems, userId, sessionId, saveTour],
  )

  return {
    saveTourToHistory,
    canSaveTour,
    isSaved: savedTourIdRef.current !== null,
  }
}
