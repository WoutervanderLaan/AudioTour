# src/modules/auth/store

Zustand store and selectors for authentication state management.

## Files

- **useAuthStore.ts** - Auth Zustand store with user, token, and auth actions
- **selectors.ts** - Memoized selectors for accessing auth state

## Purpose

Manages authentication state globally using Zustand. Provides a centralized place for storing user information, auth tokens, and authentication status. Selectors help optimize re-renders by memoizing derived state.
