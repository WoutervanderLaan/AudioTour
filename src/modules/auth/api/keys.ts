/**
 * TanStack Query key factory for the auth module.
 *
 * Provides a hierarchical structure for query keys to enable efficient
 * cache invalidation and prefetching. Follows TanStack Query best practices
 * for key organization.
 *
 * @example
 * ```ts
 * // Invalidate all auth queries
 * queryClient.invalidateQueries({ queryKey: authKeys.all })
 *
 * // Invalidate only session query
 * queryClient.invalidateQueries({ queryKey: authKeys.session() })
 *
 * // Get user-specific query key
 * const userKey = authKeys.user('user-123')
 * ```
 */
export const authKeys = {
  /**
   * Base key for all auth-related queries.
   */
  all: ['auth'] as const,

  /**
   * Query key for the current session.
   * @returns Session query key array
   */
  session: () => [...authKeys.all, 'session'] as const,

  /**
   * Query key for the current user's profile.
   * @returns Profile query key array
   */
  profile: () => [...authKeys.all, 'profile'] as const,

  /**
   * Query key for the current token refresh.
   * @returns Verify query key array
   */
  verify: () => [...authKeys.all, 'verify'] as const,

  /**
   * Query key for a specific user by ID.
   * @param id - The user ID
   * @returns User-specific query key array
   */
  user: (id: string) => [...authKeys.all, 'user', id] as const,
} as const
