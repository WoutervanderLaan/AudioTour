/**
 * Query key factory for API endpoints.
 *
 * Provides a centralized, type-safe way to manage TanStack Query keys.
 * This prevents key conflicts and makes it easier to invalidate/refetch queries.
 *
 * @example
 * ```typescript
 * // Use in a query
 * useQuery({
 *   queryKey: apiKeys.recommendations.list(sessionId, museumId),
 *   queryFn: () => fetchRecommendations(sessionId, museumId)
 * })
 *
 * // Invalidate all recommendations
 * queryClient.invalidateQueries({ queryKey: apiKeys.recommendations.all })
 * ```
 */

export const apiKeys = {
  /**
   * Query keys for recommendation-related queries
   */
  recommendations: {
    /**
     * Base key for all recommendation queries
     */
    all: ['recommendations'] as const,
    /**
     * Key for recommendation list query with specific parameters
     *
     * @param {string} sessionId - User session identifier
     * @param {string} [museumId] - Optional current museum ID for context
     * @returns Query key array for this specific recommendation query
     */
    list: (sessionId: string, museumId?: string) =>
      [...apiKeys.recommendations.all, sessionId, museumId] as const,
  },
  /**
   * Query keys for museum object-related queries
   */
  museumObjects: {
    /**
     * Base key for all museum object queries
     */
    all: ['museum-objects'] as const,
    /**
     * Key for museum objects list query for a specific museum
     *
     * @param {string} museumId - Museum identifier
     * @returns Query key array for this specific museum's objects
     */
    list: (museumId: string) =>
      [...apiKeys.museumObjects.all, museumId] as const,
  },
  /**
   * Mutation keys for narrative generation
   */
  narrative: {
    /**
     * Base key for narrative operations
     */
    all: ['narrative'] as const,
    /**
     * Key for generating narrative for a specific object
     *
     * @param {string} objectId - Museum object identifier
     * @returns Mutation key array
     */
    generate: (objectId: string) =>
      [...apiKeys.narrative.all, 'generate', objectId] as const,
  },
  /**
   * Mutation keys for audio generation
   */
  audio: {
    /**
     * Base key for audio operations
     */
    all: ['audio'] as const,
    /**
     * Key for generating audio
     *
     * @returns Mutation key array
     */
    generate: () => [...apiKeys.audio.all, 'generate'] as const,
  },
  /**
   * Mutation keys for photo upload/artwork processing
   */
  artwork: {
    /**
     * Base key for artwork operations
     */
    all: ['artwork'] as const,
    /**
     * Key for uploading and processing artwork
     *
     * @returns Mutation key array
     */
    process: () => [...apiKeys.artwork.all, 'process'] as const,
  },
} as const
