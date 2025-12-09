import {apiClient} from '@/core/api/client'
import type {AuthState} from '@/modules/auth/types'
import {createModuleStore} from '@/store/createStore'

const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isInitialized: false,
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
  (set, get) => ({
    ...initialState,

    setAuth: (user, tokens): void => {
      set({
        user,
        tokens,
        isAuthenticated: true,
        isInitialized: true,
      })

      apiClient.setTokens(tokens.accessToken, tokens.refreshToken)
    },

    setUser: (user): void => set({user}),

    updateTokens: (tokens): void => {
      set({tokens})
      apiClient.setTokens(tokens.accessToken, tokens.refreshToken)
    },

    logout: (): void => {
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isInitialized: true,
      })
      apiClient.clearTokens()
    },

    reset: (): void => {
      set(initialState)
      apiClient.clearTokens()
    },

    initialize: (): void => {
      const state = get()

      if (state.tokens) {
        apiClient.setTokens(state.tokens.accessToken, state.tokens.refreshToken)
      }

      set({isInitialized: true})
    },
  }),
  {
    name: 'auth-module',
    persist: true,
    devtools: true,
  },
)
