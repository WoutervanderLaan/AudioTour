/**
 * TanStack Query key factory for the notifications module.
 *
 * Provides a hierarchical structure for query keys to enable efficient
 * cache invalidation and prefetching. Follows TanStack Query best practices
 * for key organization.
 *
 * @example
 * ```ts
 * // Invalidate all notification queries
 * queryClient.invalidateQueries({ queryKey: notificationKeys.all })
 *
 * // Invalidate only preferences query
 * queryClient.invalidateQueries({ queryKey: notificationKeys.preferences() })
 * ```
 */
export const notificationKeys = {
  /**
   * Base key for all notification-related queries.
   */
  all: ['notifications'] as const,

  /**
   * Query key for notification preferences.
   * @returns Preferences query key array
   */
  preferences: () => [...notificationKeys.all, 'preferences'] as const,

  /**
   * Query key for device registration status.
   * @returns Registration query key array
   */
  registration: () => [...notificationKeys.all, 'registration'] as const,
} as const
