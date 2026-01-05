import {useShallow} from 'zustand/shallow'

import {useAuthStore} from './useAuthStore'

import type {AuthTokens, User} from '@/modules/auth/types'

// Selectors for optimized re-renders
/**
 * useUser
 * React hook that returns the current authenticated user from the auth store.
 *
 * @returns Current user object or null if not authenticated
 */
export const useUser = (): User | null => useAuthStore(state => state.user)
/**
 * useTokens
 * React hook that returns the current authentication tokens from the auth store.
 *
 * @returns Authentication tokens object or null if not authenticated
 */
export const useTokens = (): AuthTokens | null =>
  useAuthStore(state => state.tokens)
/**
 * useIsAuthenticated
 * React hook that returns whether the user is currently authenticated.
 *
 * @returns Boolean indicating authentication status
 */
export const useIsAuthenticated = (): boolean =>
  useAuthStore(state => state.isAuthenticated)

// Action selectors
/**
 * useAuthActions
 * React hook that returns all auth-related actions for managing authentication state.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing setUser, setAuth, updateTokens, logout, and reset action functions
 */
export const useAuthActions = (): {
  setUser: (user: User) => void
  setAuth: (user: User, tokens: AuthTokens) => void
  updateTokens: (tokens: AuthTokens) => void
  logout: () => void
  reset: () => void
} =>
  useAuthStore(
    useShallow(state => ({
      setUser: state.setUser,
      setAuth: state.setAuth,
      updateTokens: state.updateTokens,
      logout: state.logout,
      reset: state.reset,
    })),
  )
