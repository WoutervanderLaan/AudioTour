import {renderHook, act} from '@testing-library/react'

import {apiClient} from '@/core/api/client'
import type {User, AuthTokens} from '@/modules/auth/types'

import {useAuthStore} from './useAuthStore'
import {useUser, useTokens, useIsAuthenticated, useAuthActions} from './selectors'

// Mock the API client
jest.mock('@/core/api/client', () => ({
  apiClient: {
    setTokens: jest.fn(),
    clearTokens: jest.fn(),
  },
}))

describe('auth selectors', () => {
  const mockUser: User = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  }

  const mockTokens: AuthTokens = {
    accessToken: 'access-token-123',
    refreshToken: 'refresh-token-123',
  }

  beforeEach(() => {
    // Reset store
    useAuthStore.getState().reset()
    jest.clearAllMocks()
  })

  describe('useUser', () => {
    it('should return null initially', () => {
      const {result} = renderHook(() => useUser())

      expect(result.current).toBeNull()
    })

    it('should return user when authenticated', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useUser())

      expect(result.current).toEqual(mockUser)
    })

    it('should update when user changes', () => {
      const {result} = renderHook(() => useUser())

      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })
      expect(result.current).toEqual(mockUser)

      const updatedUser: User = {...mockUser, name: 'Updated Name'}
      act(() => {
        useAuthStore.getState().setUser(updatedUser)
      })
      expect(result.current).toEqual(updatedUser)
    })

    it('should return null after logout', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useUser())
      expect(result.current).toEqual(mockUser)

      act(() => {
        useAuthStore.getState().logout()
      })
      expect(result.current).toBeNull()
    })
  })

  describe('useTokens', () => {
    it('should return null initially', () => {
      const {result} = renderHook(() => useTokens())

      expect(result.current).toBeNull()
    })

    it('should return tokens when authenticated', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useTokens())

      expect(result.current).toEqual(mockTokens)
    })

    it('should update when tokens change', () => {
      const {result} = renderHook(() => useTokens())

      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })
      expect(result.current).toEqual(mockTokens)

      const newTokens: AuthTokens = {
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
      }
      act(() => {
        useAuthStore.getState().updateTokens(newTokens)
      })
      expect(result.current).toEqual(newTokens)
    })

    it('should return null after logout', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useTokens())
      expect(result.current).toEqual(mockTokens)

      act(() => {
        useAuthStore.getState().logout()
      })
      expect(result.current).toBeNull()
    })
  })

  describe('useIsAuthenticated', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useIsAuthenticated())

      expect(result.current).toBe(false)
    })

    it('should return true when authenticated', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useIsAuthenticated())

      expect(result.current).toBe(true)
    })

    it('should return false after logout', () => {
      act(() => {
        useAuthStore.getState().setAuth(mockUser, mockTokens)
      })

      const {result} = renderHook(() => useIsAuthenticated())
      expect(result.current).toBe(true)

      act(() => {
        useAuthStore.getState().logout()
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useAuthActions', () => {
    it('should return all action methods', () => {
      const {result} = renderHook(() => useAuthActions())

      expect(result.current).toHaveProperty('setUser')
      expect(result.current).toHaveProperty('setAuth')
      expect(result.current).toHaveProperty('updateTokens')
      expect(result.current).toHaveProperty('logout')
      expect(result.current).toHaveProperty('reset')
    })

    it('should set auth via action', () => {
      const {result} = renderHook(() => useAuthActions())

      act(() => {
        result.current.setAuth(mockUser, mockTokens)
      })

      const state = useAuthStore.getState()
      expect(state.user).toEqual(mockUser)
      expect(state.tokens).toEqual(mockTokens)
      expect(state.isAuthenticated).toBe(true)
    })

    it('should update user via action', () => {
      const {result} = renderHook(() => useAuthActions())

      act(() => {
        result.current.setAuth(mockUser, mockTokens)
      })

      const updatedUser: User = {...mockUser, name: 'New Name'}
      act(() => {
        result.current.setUser(updatedUser)
      })

      expect(useAuthStore.getState().user).toEqual(updatedUser)
    })

    it('should update tokens via action', () => {
      const {result} = renderHook(() => useAuthActions())

      act(() => {
        result.current.setAuth(mockUser, mockTokens)
      })

      const newTokens: AuthTokens = {
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
      }
      act(() => {
        result.current.updateTokens(newTokens)
      })

      expect(useAuthStore.getState().tokens).toEqual(newTokens)
    })

    it('should logout via action', () => {
      const {result} = renderHook(() => useAuthActions())

      act(() => {
        result.current.setAuth(mockUser, mockTokens)
      })

      act(() => {
        result.current.logout()
      })

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.tokens).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useAuthActions())

      act(() => {
        result.current.setAuth(mockUser, mockTokens)
      })

      act(() => {
        result.current.reset()
      })

      const state = useAuthStore.getState()
      expect(state.user).toBeNull()
      expect(state.tokens).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.isInitialized).toBe(false)
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useAuthActions())

      const firstReference = result.current

      rerender()

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: userResult} = renderHook(() => useUser())
      const {result: tokensResult} = renderHook(() => useTokens())
      const {result: authResult} = renderHook(() => useIsAuthenticated())
      const {result: actionsResult} = renderHook(() => useAuthActions())

      act(() => {
        actionsResult.current.setAuth(mockUser, mockTokens)
      })

      expect(userResult.current).toEqual(mockUser)
      expect(tokensResult.current).toEqual(mockTokens)
      expect(authResult.current).toBe(true)

      act(() => {
        actionsResult.current.logout()
      })

      expect(userResult.current).toBeNull()
      expect(tokensResult.current).toBeNull()
      expect(authResult.current).toBe(false)
    })
  })
})
