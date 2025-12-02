import type {AuthState} from '@/modules/auth/types'
import {createModuleStore} from '@/store/createStore'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

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
