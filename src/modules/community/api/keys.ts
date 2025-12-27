import type {CommunityFilterOptions, NearbySearchParams} from '../types'

/**
 * TanStack Query key factory for the community module.
 *
 * Provides a hierarchical structure for query keys to enable efficient
 * cache invalidation and prefetching. Follows TanStack Query best practices
 * for key organization.
 *
 * @example
 * ```ts
 * // Invalidate all community queries
 * queryClient.invalidateQueries({ queryKey: communityKeys.all })
 *
 * // Invalidate only tours list query
 * queryClient.invalidateQueries({ queryKey: communityKeys.tours() })
 *
 * // Get tour-specific query key
 * const tourKey = communityKeys.tour('tour-123')
 * ```
 */
export const communityKeys = {
  /**
   * Base key for all community-related queries.
   */
  all: ['community'] as const,

  /**
   * Query key for all community tours with optional filters.
   * @param filters - Optional filter options
   * @returns Tours query key array
   */
  tours: (filters?: CommunityFilterOptions) =>
    filters !== undefined
      ? ([...communityKeys.all, 'tours', filters] as const)
      : ([...communityKeys.all, 'tours'] as const),

  /**
   * Query key for a specific tour by ID.
   * @param id - The tour ID
   * @returns Tour-specific query key array
   */
  tour: (id: string) => [...communityKeys.all, 'tour', id] as const,

  /**
   * Query key for recommended tours based on user history.
   * @returns Recommended tours query key array
   */
  recommended: () => [...communityKeys.all, 'recommended'] as const,

  /**
   * Query key for nearby tours based on location.
   * @param params - Location parameters
   * @returns Nearby tours query key array
   */
  nearby: (params: NearbySearchParams) =>
    [
      ...communityKeys.all,
      'nearby',
      params.latitude,
      params.longitude,
      params.radiusKm,
    ] as const,

  /**
   * Query key for user's rating on a specific tour.
   * @param tourId - The tour ID
   * @returns User rating query key array
   */
  userRating: (tourId: string) =>
    [...communityKeys.all, 'rating', tourId] as const,
} as const
