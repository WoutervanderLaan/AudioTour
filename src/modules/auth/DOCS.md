# src/modules/auth

Authentication module handling user login, registration, and auth state management.

## Structure

- **api/** - Authentication API endpoints (queries and mutations)
- **hooks/** - Auth-specific hooks (useAuth)
- **navigation/** - Auth navigation stack and routes
- **screens/** - Login and register screens
- **store/** - Auth state management with Zustand (selectors and store)
- **types.ts** - Auth-related TypeScript types
- **module.config.ts** - Module configuration for app registry

## Purpose

Provides complete authentication functionality including login/register flows, auth state persistence, and protected route handling. Integrates with the app's navigation system through the module registry pattern.
