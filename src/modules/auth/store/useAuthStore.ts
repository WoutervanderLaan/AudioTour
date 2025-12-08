import type {AuthState} from '@/modules/auth/types'
import {createModuleStore} from '@/store/createStore'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

/**
 * Zustand store for authentication state management.
 *
 * Manages user authentication state including user data, auth token, and authentication status.
 * Persists to AsyncStorage to maintain auth state across app restarts.
 *
 * @returns Auth store hook with state and actions
 */
export const useAuthStore = createModuleStore<AuthState>(
  set => ({
    ...initialState,

    setUser: (user): void => set({user, isAuthenticated: true}),

    setToken: (token): void => set({token}),

    logout: (): void => set({user: null, token: null, isAuthenticated: false}),

    reset: (): void => set(initialState),
  }),
  {
    name: 'auth-module',
    persist: true,
    devtools: true,
  },
)
