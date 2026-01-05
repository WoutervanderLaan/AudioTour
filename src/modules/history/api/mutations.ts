import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {historyKeys} from './keys'
import type {
  DeleteTourResponse,
  SaveTourParams,
  SaveTourResponse,
  ShareTourParams,
  UpdateTourParams,
  UpdateTourResponse,
} from './mutations.types'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger/logger'

/**
 * useSaveTourToCloud
 * Mutation hook for saving a tour to the cloud.
 * Creates a new tour record on the backend.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: saveTour, isPending } = useSaveTourToCloud()
 *
 * const handleSave = async () => {
 *   const result = await saveTour(tourData)
 *   console.log('Saved tour:', result.tour.id)
 * }
 * ```
 */
export function useSaveTourToCloud(): UseMutationResult<
  SaveTourResponse,
  Error,
  SaveTourParams
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: SaveTourParams) => {
      logger.debug('[HistoryAPI] Saving tour to cloud:', {
        id: params.id,
        title: params.title,
      })

      const response = await apiClient.post<SaveTourResponse>('/tours', params)

      logger.debug('[HistoryAPI] Tour saved to cloud:', response.data.tour.id)
      return response.data
    },
    onSuccess: () => {
      // Invalidate tours list to refetch
      queryClient.invalidateQueries({queryKey: historyKeys.myTours()})
    },
    onError: error => {
      logger.error('[HistoryAPI] Error saving tour to cloud:', error)
    },
  })
}

/**
 * useUpdateCloudTour
 * Mutation hook for updating a tour in the cloud.
 * Patches an existing tour record on the backend.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: updateTour } = useUpdateCloudTour()
 *
 * const handleUpdate = async () => {
 *   await updateTour({ id: 'tour-123', updates: { title: 'New Title' } })
 * }
 * ```
 */
export function useUpdateCloudTour(): UseMutationResult<
  UpdateTourResponse,
  Error,
  UpdateTourParams
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, updates}: UpdateTourParams) => {
      logger.debug('[HistoryAPI] Updating tour in cloud:', {id})

      const response = await apiClient.patch<UpdateTourResponse>(
        `/tours/${id}`,
        updates,
      )

      logger.debug('[HistoryAPI] Tour updated in cloud')
      return response.data
    },
    onSuccess: (data, variables) => {
      // Invalidate specific tour and tours list
      queryClient.invalidateQueries({queryKey: historyKeys.tour(variables.id)})
      queryClient.invalidateQueries({queryKey: historyKeys.myTours()})
    },
    onError: error => {
      logger.error('[HistoryAPI] Error updating tour in cloud:', error)
    },
  })
}

/**
 * useDeleteCloudTour
 * Mutation hook for deleting a tour from the cloud.
 * Removes the tour record from the backend.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: deleteTour } = useDeleteCloudTour()
 *
 * const handleDelete = async () => {
 *   await deleteTour('tour-123')
 * }
 * ```
 */
export function useDeleteCloudTour(): UseMutationResult<
  DeleteTourResponse,
  Error,
  string
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tourId: string) => {
      logger.debug('[HistoryAPI] Deleting tour from cloud:', {tourId})

      const response = await apiClient.delete<DeleteTourResponse>(
        `/tours/${tourId}`,
      )

      logger.debug('[HistoryAPI] Tour deleted from cloud')
      return response.data
    },
    onSuccess: (_, tourId) => {
      // Invalidate specific tour and tours list
      queryClient.invalidateQueries({queryKey: historyKeys.tour(tourId)})
      queryClient.invalidateQueries({queryKey: historyKeys.myTours()})
    },
    onError: error => {
      logger.error('[HistoryAPI] Error deleting tour from cloud:', error)
    },
  })
}

/**
 * useShareTour
 * Mutation hook for sharing or unsharing a tour with the community.
 *
 * @returns Mutation object with mutate function and state
 *
 * @example
 * ```tsx
 * const { mutateAsync: shareTour } = useShareTour()
 *
 * const handleShare = async () => {
 *   await shareTour({ id: 'tour-123', isShared: true })
 * }
 * ```
 */
export function useShareTour(): UseMutationResult<
  UpdateTourResponse,
  Error,
  ShareTourParams
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({id, isShared}: ShareTourParams) => {
      logger.debug('[HistoryAPI] Updating tour share status:', {id, isShared})

      const response = await apiClient.patch<UpdateTourResponse>(
        `/tours/${id}/share`,
        {isShared},
      )

      logger.debug('[HistoryAPI] Tour share status updated')
      return response.data
    },
    onSuccess: (data, variables) => {
      // Invalidate specific tour, my tours, and community tours
      queryClient.invalidateQueries({queryKey: historyKeys.tour(variables.id)})
      queryClient.invalidateQueries({queryKey: historyKeys.myTours()})
      queryClient.invalidateQueries({queryKey: historyKeys.communityTours()})
    },
    onError: error => {
      logger.error('[HistoryAPI] Error updating tour share status:', error)
    },
  })
}
