import {useCallback, useMemo} from 'react'

import {useHistoryLoading, useTourSummaries} from '../store/selectors'
import type {HistorySortOption, TourSummary} from '../types'
import {matchesSearchQuery} from '../utils/matchesSearchQuery'
import {sortTours} from '../utils/sortTours'

/**
 * UseHistoryToursOptions
 * Options for filtering and sorting tour history.
 */
export type UseHistoryToursOptions = {
  /**
   * Search query to filter tours by title, description, or museum name
   */
  searchQuery?: string
  /**
   * Sorting option for the tour list
   */
  sortBy?: HistorySortOption
}

/**
 * UseHistoryToursResult
 * Return type for the useHistoryTours hook.
 */
export type UseHistoryToursResult = {
  /**
   * Filtered and sorted tour summaries
   */
  tours: TourSummary[]
  /**
   * Whether the store is currently loading
   */
  isLoading: boolean
  /**
   * Whether the tour list is empty (after filtering)
   */
  isEmpty: boolean
  /**
   * Function to trigger a refresh (placeholder for future API integration)
   */
  refetch: () => void
}

/**
 * useHistoryTours
 * Hook for fetching and filtering the user's tour history.
 * Provides filtering by search query and various sorting options.
 *
 * @param options - Filtering and sorting options
 * @returns Filtered tour summaries with loading state
 *
 * @example
 * ```tsx
 * const { tours, isLoading, isEmpty } = useHistoryTours({
 *   searchQuery: 'Rijksmuseum',
 *   sortBy: 'date-desc'
 * })
 * ```
 */
export function useHistoryTours(
  options: UseHistoryToursOptions = {},
): UseHistoryToursResult {
  const {searchQuery = '', sortBy = 'date-desc'} = options

  const allTours = useTourSummaries()
  const isLoading = useHistoryLoading()

  /**
   * filteredTours
   * Memoized filtered and sorted tour list.
   */
  const filteredTours = useMemo(() => {
    const filtered = allTours.filter(tour =>
      matchesSearchQuery(tour, searchQuery),
    )
    return sortTours(filtered, sortBy)
  }, [allTours, searchQuery, sortBy])

  /**
   * refetch
   * Placeholder function for refreshing tour data.
   * Currently a no-op since data comes from local store.
   * Will be implemented when API sync is added.
   */
  const refetch = useCallback((): void => {
    // Placeholder for future API integration
    // Currently data comes from local store which auto-updates
  }, [])

  return {
    tours: filteredTours,
    isLoading,
    isEmpty: filteredTours.length === 0,
    refetch,
  }
}
