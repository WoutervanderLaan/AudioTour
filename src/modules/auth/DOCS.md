# src/modules/auth

Authentication module handling user login, registration, and auth state management.

## Structure

- **api/** - Authentication API endpoints (queries and mutations)
- **hooks/** - Auth-specific hooks (useAuth)
- **screens/** - Login and register screens
- **store/** - Auth state management with Zustand (selectors and store)
- **schema.ts** - Auth form validation schemas using Zod
- **types.ts** - Auth-related TypeScript types
- **routes.types.ts** - Auth route type definitions
- **screenConfig.ts** - Auth navigation stack and routes configuration
- **index.ts** - Module configuration export for app registry

## Purpose

Provides complete authentication functionality including login/register flows, auth state persistence, and protected route handling. Integrates with the app's navigation system through the module registry pattern.
