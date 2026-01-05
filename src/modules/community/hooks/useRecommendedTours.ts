import {useMemo} from 'react'

import {useRecommendedToursQuery} from '../api/queries'
import type {CommunityTourSummary} from '../types'

/**
 * UseRecommendedToursResult
 * Return type for the useRecommendedTours hook.
 */
type UseRecommendedToursResult = {
  /**
   * Array of recommended tour summaries
   */
  tours: CommunityTourSummary[]
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
   * Whether the recommendations list is empty
   */
  isEmpty: boolean
  /**
   * Function to refetch the recommendations
   */
  refetch: () => void
}

/**
 * useRecommendedTours
 * Hook for fetching personalized tour recommendations based on user history.
 * Recommendations are generated server-side based on:
 * - Museums the user has previously visited
 * - Tags from past tours
 * - User preferences from profile
 * - Community ratings (highly-rated tours are boosted)
 *
 * Falls back to popular tours if user has no history.
 *
 * @returns Object containing recommended tours and query state
 *
 * @example
 * ```tsx
 * const { tours, isLoading, isEmpty } = useRecommendedTours()
 *
 * if (isLoading) return <LoadingSpinner />
 * if (isEmpty) return <NoRecommendations />
 * return (
 *   <FlatList
 *     data={tours}
 *     renderItem={({ item }) => <TourCard tour={item} />}
 *     horizontal
 *   />
 * )
 * ```
 */
export const useRecommendedTours = (): UseRecommendedToursResult => {
  const {data, isLoading, isError, error, refetch} = useRecommendedToursQuery()

  const tours = useMemo(() => data?.tours ?? [], [data?.tours])
  const isEmpty = !isLoading && tours.length === 0

  return {
    tours,
    isLoading,
    isError,
    error: error ?? null,
    isEmpty,
    refetch,
  }
}
