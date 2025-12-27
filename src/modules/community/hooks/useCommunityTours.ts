import {useMemo} from 'react'

import {useCommunityTourByIdQuery, useCommunityToursQuery} from '../api/queries'
import type {
  CommunityFilterOptions,
  CommunityTour,
  CommunityTourSummary,
} from '../types'

/**
 * UseCommunityToursResult
 * Return type for the useCommunityTours hook.
 */
type UseCommunityToursResult = {
  /**
   * Array of community tour summaries
   */
  tours: CommunityTourSummary[]
  /**
   * Total number of matching tours
   */
  total: number
  /**
   * Whether the query is currently loading
   */
  isLoading: boolean
  /**
   * Whether the query encountered an error
   */
  isError: boolean
  /**
   * Error object if the query failed
   */
  error: Error | null
  /**
   * Whether the tours list is empty
   */
  isEmpty: boolean
  /**
   * Function to refetch the tours
   */
  refetch: () => void
}

/**
 * useCommunityTours
 * Hook for fetching and filtering community tours.
 * Provides a convenient wrapper around the query with derived state.
 *
 * @param filters - Optional filter options
 * @returns Object containing tours data and query state
 *
 * @example
 * ```tsx
 * const { tours, isLoading, isEmpty } = useCommunityTours({
 *   minRating: 4,
 *   sortBy: 'rating'
 * })
 *
 * if (isLoading) return <LoadingSpinner />
 * if (isEmpty) return <EmptyState />
 * return tours.map(tour => <TourCard key={tour.id} tour={tour} />)
 * ```
 */
export const useCommunityTours = (
  filters?: CommunityFilterOptions,
): UseCommunityToursResult => {
  const {data, isLoading, isError, error, refetch} =
    useCommunityToursQuery(filters)

  const tours = useMemo(() => data?.tours ?? [], [data?.tours])
  const total = data?.total ?? 0
  const isEmpty = !isLoading && tours.length === 0

  return {
    tours,
    total,
    isLoading,
    isError,
    error: error ?? null,
    isEmpty,
    refetch,
  }
}

/**
 * UseCommunityTourByIdResult
 * Return type for the useCommunityTourById hook.
 */
type UseCommunityTourByIdResult = {
  /**
   * The community tour data
   */
  tour: CommunityTour | undefined
  /**
   * Whether the query is currently loading
   */
  isLoading: boolean
  /**
   * Whether the query encountered an error
   */
  isError: boolean
  /**
   * Error object if the query failed
   */
  error: Error | null
  /**
   * Function to refetch the tour
   */
  refetch: () => void
}

/**
 * useCommunityTourById
 * Hook for fetching a single community tour by ID.
 * Provides a convenient wrapper around the query.
 *
 * @param tourId - ID of the tour to fetch
 * @returns Object containing tour data and query state
 *
 * @example
 * ```tsx
 * const { tour, isLoading } = useCommunityTourById('tour-123')
 *
 * if (isLoading) return <LoadingSpinner />
 * if (!tour) return <NotFound />
 * return <TourDetail tour={tour} />
 * ```
 */
export const useCommunityTourById = (
  tourId: string,
): UseCommunityTourByIdResult => {
  const {data, isLoading, isError, error, refetch} =
    useCommunityTourByIdQuery(tourId)

  return {
    tour: data,
    isLoading,
    isError,
    error: error ?? null,
    refetch,
  }
}
