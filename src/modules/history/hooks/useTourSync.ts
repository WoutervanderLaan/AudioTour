import {useCallback, useEffect, useRef} from 'react'
import {AppState, type AppStateStatus} from 'react-native'

import {useSaveTourToCloud} from '../api/mutations'
import {useHistoryStore} from '../store/useHistoryStore'
import type {PersistedTour, SyncStatus} from '../types'

import {logger} from '@/core/lib/logger/logger'

const SYNC_DEBOUNCE_MS = 5000
const MAX_RETRY_ATTEMPTS = 3

/**
 * UseTourSyncReturn
 * Return type for the useTourSync hook
 */
type UseTourSyncReturn = {
  /**
   * Manually trigger sync for all local tours
   */
  syncAllTours: () => Promise<void>
  /**
   * Sync a specific tour by ID
   */
  syncTour: (tourId: string) => Promise<boolean>
  /**
   * Whether any sync operation is in progress
   */
  isSyncing: boolean
  /**
   * Number of tours pending sync
   */
  pendingCount: number
}

/**
 * useTourSync
 * Hook for managing bidirectional sync between local storage and backend API.
 * Automatically syncs tours when app comes to foreground and provides manual sync controls.
 *
 * @returns Object with sync functions and state
 *
 * @example
 * const { syncAllTours, isSyncing, pendingCount } = useTourSync()
 *
 * // Manually trigger sync
 * await syncAllTours()
 *
 * // Show sync status
 * if (pendingCount > 0) {
 *   console.log(`${pendingCount} tours pending sync`)
 * }
 */
export function useTourSync(): UseTourSyncReturn {
  const syncInProgressRef = useRef(false)
  const retryCountRef = useRef<Record<string, number>>({})

  // Store access
  const tours = useHistoryStore(state => state.tours)
  const updateTour = useHistoryStore(state => state.updateTour)

  // API mutation
  const {mutateAsync: saveToCloud, isPending: isSavePending} =
    useSaveTourToCloud()

  // Calculate pending count
  const pendingCount = tours.filter(
    tour => tour.syncStatus === 'local' || tour.syncStatus === 'error',
  ).length

  /**
   * updateSyncStatus
   * Helper to update a tour's sync status in the store.
   *
   * @param tourId - Tour ID to update
   * @param status - New sync status
   */
  const updateSyncStatus = useCallback(
    (tourId: string, status: SyncStatus): void => {
      updateTour(tourId, {syncStatus: status})
    },
    [updateTour],
  )

  /**
   * syncTour
   * Syncs a single tour to the cloud.
   * Handles optimistic updates and rollback on failure.
   *
   * @param tourId - Tour ID to sync
   * @returns Boolean indicating sync success
   */
  const syncTour = useCallback(
    async (tourId: string): Promise<boolean> => {
      const tour = tours.find(t => t.id === tourId)

      if (!tour) {
        logger.warn('[TourSync] Tour not found:', {tourId})
        return false
      }

      if (tour.syncStatus === 'synced' || tour.syncStatus === 'syncing') {
        logger.debug('[TourSync] Tour already synced or syncing:', {tourId})
        return true
      }

      // Check retry limit
      const retryCount = retryCountRef.current[tourId] ?? 0

      if (retryCount >= MAX_RETRY_ATTEMPTS) {
        logger.warn('[TourSync] Max retry attempts reached:', {
          tourId,
          retryCount,
        })
        return false
      }

      try {
        // Optimistic update
        updateSyncStatus(tourId, 'syncing')

        logger.debug('[TourSync] Syncing tour:', {tourId, title: tour.title})

        // Prepare tour data for cloud (excluding syncStatus)
        const {syncStatus: _, ...tourData} = tour

        await saveToCloud(tourData as Omit<PersistedTour, 'syncStatus'>)

        // Success
        updateSyncStatus(tourId, 'synced')
        delete retryCountRef.current[tourId]

        logger.info('[TourSync] Tour synced successfully:', {tourId})
        return true
      } catch (error) {
        // Rollback on failure
        retryCountRef.current[tourId] = retryCount + 1
        updateSyncStatus(tourId, 'error')

        logger.error('[TourSync] Failed to sync tour:', {
          tourId,
          error,
          retryCount: retryCount + 1,
        })
        return false
      }
    },
    [tours, updateSyncStatus, saveToCloud],
  )

  /**
   * syncAllTours
   * Syncs all tours that need syncing (local or error status).
   * Processes tours sequentially to avoid overwhelming the API.
   */
  const syncAllTours = useCallback(async (): Promise<void> => {
    if (syncInProgressRef.current) {
      logger.debug('[TourSync] Sync already in progress, skipping')
      return
    }

    const toursToSync = tours.filter(
      tour => tour.syncStatus === 'local' || tour.syncStatus === 'error',
    )

    if (toursToSync.length === 0) {
      logger.debug('[TourSync] No tours to sync')
      return
    }

    syncInProgressRef.current = true
    logger.info('[TourSync] Starting sync for', {count: toursToSync.length})

    let successCount = 0
    let failCount = 0

    for (const tour of toursToSync) {
      const success = await syncTour(tour.id)

      if (success) {
        successCount++
      } else {
        failCount++
      }

      // Small delay between syncs to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    syncInProgressRef.current = false

    logger.info('[TourSync] Sync complete:', {successCount, failCount})
  }, [tours, syncTour])

  // Auto-sync on app foreground
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    /**
     * handleAppStateChange
     * Triggers sync when app comes to foreground.
     *
     * @param nextState - New app state
     */
    const handleAppStateChange = (nextState: AppStateStatus): void => {
      if (nextState === 'active') {
        // Debounce to prevent multiple syncs on rapid state changes
        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }

        debounceTimer = setTimeout(() => {
          logger.debug('[TourSync] App became active, triggering sync')
          syncAllTours()
        }, SYNC_DEBOUNCE_MS)
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )

    return (): void => {
      subscription.remove()

      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [syncAllTours])

  return {
    syncAllTours,
    syncTour,
    isSyncing: isSavePending || syncInProgressRef.current,
    pendingCount,
  }
}
