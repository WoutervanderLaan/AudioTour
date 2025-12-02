// src/modules/auth/store/selectors.ts

import {useAuthStore} from './useAuthStore'

import type {User} from '@/modules/auth/types'

// Selectors for optimized re-renders
/**
 * useUser
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useUser = (): User | null => useAuthStore(state => state.user)
/**
 * useToken
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useToken = (): string | null => useAuthStore(state => state.token)
/**
 * useIsAuthenticated
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useIsAuthenticated = (): boolean =>
  useAuthStore(state => state.isAuthenticated)

// Action selectors
/**
 * useAuthActions
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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
