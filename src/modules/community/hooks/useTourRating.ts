import {useCallback} from 'react'

import {useRateTour} from '../api/mutations'
import {useUserTourRatingQuery} from '../api/queries'
import type {TourRating} from '../types'

/**
 * UseTourRatingResult
 * Return type for the useTourRating hook.
 */
type UseTourRatingResult = {
  /**
   * The user's existing rating for this tour, if any
   */
  existingRating: TourRating | null
  /**
   * Whether the rating query is loading
   */
  isLoadingRating: boolean
  /**
   * Whether a rating submission is in progress
   */
  isSubmitting: boolean
  /**
   * Submit a new rating for the tour
   */
  submitRating: (rating: number) => Promise<void>
  /**
   * Whether there was an error submitting the rating
   */
  isError: boolean
  /**
   * Error message if submission failed
   */
  error: Error | null
}

/**
 * useTourRating
 * Hook for managing tour ratings - fetching existing rating and submitting new ones.
 * Handles optimistic updates and error states.
 *
 * @param tourId - ID of the tour to manage ratings for
 * @returns Object containing rating state and submission function
 *
 * @example
 * ```tsx
 * const {
 *   existingRating,
 *   isSubmitting,
 *   submitRating,
 *   isError
 * } = useTourRating('tour-123')
 *
 * const handleRate = async (value: number) => {
 *   await submitRating(value)
 *   toast.show('Rating submitted!')
 * }
 *
 * return (
 *   <RatingInput
 *     value={existingRating?.rating}
 *     onRate={handleRate}
 *     disabled={isSubmitting}
 *   />
 * )
 * ```
 */
export const useTourRating = (tourId: string): UseTourRatingResult => {
  const {data: existingRating, isLoading: isLoadingRating} =
    useUserTourRatingQuery(tourId)

  const {
    mutateAsync: rateTour,
    isPending: isSubmitting,
    isError,
    error,
  } = useRateTour()

  const submitRating = useCallback(
    async (rating: number): Promise<void> => {
      await rateTour({tourId, rating})
    },
    [tourId, rateTour],
  )

  return {
    existingRating: existingRating ?? null,
    isLoadingRating,
    isSubmitting,
    submitRating,
    isError,
    error: error ?? null,
  }
}
