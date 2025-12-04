// src/modules/auth/store/selectors.ts

import {useAuthStore} from './useAuthStore'

import type {User} from '@/modules/auth/types'

// Selectors for optimized re-renders
/**
 * useUser
 * React hook that returns the current authenticated user from the auth store.
 *
 * @returns {*} Current user object or null if not authenticated
 */
export const useUser = (): User | null => useAuthStore(state => state.user)
/**
 * useToken
 * React hook that returns the current authentication token from the auth store.
 *
 * @returns {*} Authentication token string or null if not authenticated
 */
export const useToken = (): string | null => useAuthStore(state => state.token)
/**
 * useIsAuthenticated
 * React hook that returns whether the user is currently authenticated.
 *
 * @returns {*} Boolean indicating authentication status
 */
export const useIsAuthenticated = (): boolean =>
  useAuthStore(state => state.isAuthenticated)

// Action selectors
/**
 * useAuthActions
 * React hook that returns all auth-related actions for managing authentication state.
 *
 * @returns {*} Object containing setUser, setToken, logout, and reset action functions
 */
export const useAuthActions = (): {
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
  reset: () => void
} =>
  useAuthStore(state => ({
    setUser: state.setUser,
    setToken: state.setToken,
    logout: state.logout,
    reset: state.reset,
  }))
