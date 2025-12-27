/**
 * TanStack Query key factory for the history module.
 *
 * Provides a hierarchical structure for query keys to enable efficient
 * cache invalidation and prefetching. Follows TanStack Query best practices
 * for key organization.
 *
 * @example
 * ```ts
 * // Invalidate all history queries
 * queryClient.invalidateQueries({ queryKey: historyKeys.all })
 *
 * // Invalidate only my tours query
 * queryClient.invalidateQueries({ queryKey: historyKeys.myTours() })
 *
 * // Get tour-specific query key
 * const tourKey = historyKeys.tour('tour-123')
 * ```
 */
export const historyKeys = {
  /**
   * Base key for all history-related queries.
   */
  all: ['history'] as const,

  /**
   * Query key for all tours belonging to the current user.
   * @returns My tours query key array
   */
  myTours: () => [...historyKeys.all, 'my-tours'] as const,

  /**
   * Query key for a specific tour by ID.
   * @param id - The tour ID
   * @returns Tour-specific query key array
   */
  tour: (id: string) => [...historyKeys.all, 'tour', id] as const,

  /**
   * Query key for community/shared tours.
   * @returns Community tours query key array
   */
  communityTours: () => [...historyKeys.all, 'community'] as const,

  /**
   * Query key for tours filtered by museum.
   * @param museumId - The museum ID to filter by
   * @returns Museum-filtered query key array
   */
  toursByMuseum: (museumId: string) =>
    [...historyKeys.all, 'museum', museumId] as const,
} as const
