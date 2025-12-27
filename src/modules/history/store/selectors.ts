import {useMemo} from 'react'

import {useShallow} from 'zustand/shallow'

import {useHistoryStore} from './useHistoryStore'

import type {
  CreatePersistedTourParams,
  PersistedTour,
  TourSummary,
} from '@/modules/history/types'

// State selectors

/**
 * useTours
 * React hook that returns all persisted tours from the history store.
 * Tours are sorted by creation date with newest first.
 *
 * @returns Array of persisted tours sorted by creation date
 */
export const useTours = (): PersistedTour[] => {
  const tours = useHistoryStore(state => state.tours)

  return useMemo(
    () => [...tours].sort((a, b) => b.createdAt - a.createdAt),
    [tours],
  )
}

/**
 * useTourById
 * React hook that returns a specific tour by its ID.
 *
 * @param id - The tour ID to retrieve
 * @returns The tour if found, undefined otherwise
 */
export const useTourById = (id: string): PersistedTour | undefined =>
  useHistoryStore(state => state.getTour(id))

/**
 * useHistoryLoading
 * React hook that returns the loading state of the history store.
 *
 * @returns Boolean indicating if the store is loading
 */
export const useHistoryLoading = (): boolean =>
  useHistoryStore(state => state.isLoading)

/**
 * useTourCount
 * React hook that returns the total number of persisted tours.
 *
 * @returns Number of tours in the history
 */
export const useTourCount = (): number =>
  useHistoryStore(state => state.tours.length)

/**
 * useTourSummaries
 * React hook that returns lightweight tour summaries for list views.
 * Memoized to prevent unnecessary recalculations.
 *
 * @returns Array of tour summaries sorted by creation date
 */
export const useTourSummaries = (): TourSummary[] => {
  const tours = useHistoryStore(state => state.tours)

  return useMemo(
    () =>
      [...tours]
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(tour => ({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          heroImageUri: tour.heroImageUri,
          museumName: tour.museumName,
          createdAt: tour.createdAt,
          communityRating: tour.communityRating,
          ratingCount: tour.ratingCount,
          artworkCount: tour.feedItems.length,
        })),
    [tours],
  )
}

/**
 * useSharedTours
 * React hook that returns only tours that have been shared publicly.
 *
 * @returns Array of shared tours sorted by creation date
 */
export const useSharedTours = (): PersistedTour[] => {
  const tours = useHistoryStore(state => state.tours)

  return useMemo(
    () =>
      tours
        .filter(tour => tour.isShared)
        .sort((a, b) => b.createdAt - a.createdAt),
    [tours],
  )
}

/**
 * useLocalTours
 * React hook that returns only tours that need syncing (local status).
 *
 * @returns Array of local-only tours
 */
export const useLocalTours = (): PersistedTour[] => {
  const tours = useHistoryStore(state => state.tours)

  return useMemo(
    () => tours.filter(tour => tour.syncStatus === 'local'),
    [tours],
  )
}

// Action selectors

/**
 * useHistoryActions
 * React hook that returns all history-related actions.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing saveTour, updateTour, deleteTour, and reset action functions
 */
export const useHistoryActions = (): {
  saveTour: (params: CreatePersistedTourParams) => string
  updateTour: (id: string, updates: Partial<PersistedTour>) => void
  deleteTour: (id: string) => void
  reset: () => void
} =>
  useHistoryStore(
    useShallow(state => ({
      saveTour: state.saveTour,
      updateTour: state.updateTour,
      deleteTour: state.deleteTour,
      reset: state.reset,
    })),
  )
