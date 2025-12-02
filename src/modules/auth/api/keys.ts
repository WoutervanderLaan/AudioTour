/**
 * Query key factory for auth module
 * Helps with invalidation and prefetching
 */
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  user: (id: string) => [...authKeys.all, 'user', id] as const,
} as const
