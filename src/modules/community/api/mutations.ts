import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {communityKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger/logger'
import type {
  RateTourParams,
  ReportTourParams,
  TourRating,
} from '@/modules/community/types'

/**
 * RateTourResponse
 * API response when rating a tour.
 */
type RateTourResponse = {
  /**
   * The created or updated rating
   */
  rating: TourRating
  /**
   * Updated average rating for the tour
   */
  averageRating: number
  /**
   * Updated total rating count for the tour
   */
  ratingCount: number
  /**
   * Success message
   */
  message: string
}

/**
 * ReportTourResponse
 * API response when reporting a tour.
 */
type ReportTourResponse = {
  /**
   * Report ID for tracking
   */
  reportId: string
  /**
   * Success message
   */
  message: string
}

/**
 * useRateTour
 * Mutation hook for submitting or updating a tour rating.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: rateTour, isPending } = useRateTour()
 *
 * const handleRate = async (rating: number) => {
 *   await rateTour({ tourId: 'tour-123', rating })
 * }
 * ```
 */
export function useRateTour(): UseMutationResult<
  RateTourResponse,
  Error,
  RateTourParams
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({tourId, rating}: RateTourParams) => {
      logger.debug('[CommunityAPI] Rating tour:', {tourId, rating})

      const response = await apiClient.post<RateTourResponse>(
        `/community/tours/${tourId}/rate`,
        {rating},
      )

      logger.debug('[CommunityAPI] Tour rated successfully')
      return response.data
    },
    onSuccess: (data, variables) => {
      // Invalidate tour detail to refresh rating display
      queryClient.invalidateQueries({
        queryKey: communityKeys.tour(variables.tourId),
      })
      // Invalidate user's rating cache
      queryClient.invalidateQueries({
        queryKey: communityKeys.userRating(variables.tourId),
      })
      // Invalidate tours list to refresh average ratings
      queryClient.invalidateQueries({queryKey: communityKeys.tours()})
    },
    onError: error => {
      logger.error('[CommunityAPI] Error rating tour:', error)
    },
  })
}

/**
 * useReportTour
 * Mutation hook for reporting inappropriate tour content.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: reportTour, isPending } = useReportTour()
 *
 * const handleReport = async () => {
 *   await reportTour({
 *     tourId: 'tour-123',
 *     reason: 'inappropriate',
 *     details: 'Contains offensive content'
 *   })
 * }
 * ```
 */
export function useReportTour(): UseMutationResult<
  ReportTourResponse,
  Error,
  ReportTourParams
> {
  return useMutation({
    mutationFn: async ({tourId, reason, details}: ReportTourParams) => {
      logger.debug('[CommunityAPI] Reporting tour:', {tourId, reason})

      const response = await apiClient.post<ReportTourResponse>(
        `/community/tours/${tourId}/report`,
        {reason, details},
      )

      logger.debug('[CommunityAPI] Tour reported successfully')
      return response.data
    },
    onError: error => {
      logger.error('[CommunityAPI] Error reporting tour:', error)
    },
  })
}
