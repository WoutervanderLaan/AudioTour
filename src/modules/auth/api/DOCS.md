# src/modules/auth/api

Authentication API endpoints using TanStack Query.

## Files

- **queries.ts** - Auth-related query hooks (e.g., fetching user profile)
- **mutations.ts** - Auth mutation hooks (login, register, logout)
- **keys.ts** - Query key factory for auth queries
- **mocks.ts** - Mock api responses for development and testing purposes

## Purpose

Encapsulates all authentication-related API calls using TanStack Query. Provides typed hooks for components to perform auth operations with automatic caching, refetching, and error handling.
