import {apiClient} from '@/core/api/client'
import type {User, AuthTokens} from '@/modules/auth/types'

import {useAuthStore} from './useAuthStore'

// Mock the API client
jest.mock('@/core/api/client', () => ({
  apiClient: {
    setTokens: jest.fn(),
    clearTokens: jest.fn(),
  },
}))

describe('useAuthStore', () => {
  const mockUser: User = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  }

  const mockTokens: AuthTokens = {
    accessToken: 'access-token-123',
    refreshToken: 'refresh-token-123',
    accessTokenExpiresAt: '2024-12-31T23:59:59Z',
    refreshTokenExpiresAt: '2025-01-31T23:59:59Z',
  }

  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useAuthStore.getState()
    reset()
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have null user', () => {
      const {user} = useAuthStore.getState()
      expect(user).toBeNull()
    })

    it('should have null tokens', () => {
      const {tokens} = useAuthStore.getState()
      expect(tokens).toBeNull()
    })

    it('should have isAuthenticated false', () => {
      const {isAuthenticated} = useAuthStore.getState()
      expect(isAuthenticated).toBe(false)
    })

    it('should have isInitialized false', () => {
      const {isInitialized} = useAuthStore.getState()
      expect(isInitialized).toBe(false)
    })
  })

  describe('setAuth', () => {
    it('should set user and tokens', () => {
      const {setAuth} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      const {user, tokens, isAuthenticated, isInitialized} = useAuthStore.getState()
      expect(user).toEqual(mockUser)
      expect(tokens).toEqual(mockTokens)
      expect(isAuthenticated).toBe(true)
      expect(isInitialized).toBe(true)
    })

    it('should call apiClient.setTokens', () => {
      const {setAuth} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      expect(apiClient.setTokens).toHaveBeenCalledWith(
        mockTokens.accessToken,
        mockTokens.refreshToken,
      )
    })

    it('should update existing auth', () => {
      const {setAuth} = useAuthStore.getState()
      const newUser: User = {
        id: 'user-456',
        email: 'new@example.com',
        name: 'New User',
      }
      const newTokens: AuthTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }

      setAuth(mockUser, mockTokens)
      setAuth(newUser, newTokens)

      const {user, tokens} = useAuthStore.getState()
      expect(user).toEqual(newUser)
      expect(tokens).toEqual(newTokens)
    })

    it('should handle tokens without expiration timestamps', () => {
      const {setAuth} = useAuthStore.getState()
      const tokensWithoutExpiry: AuthTokens = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      }

      setAuth(mockUser, tokensWithoutExpiry)

      const {tokens} = useAuthStore.getState()
      expect(tokens).toEqual(tokensWithoutExpiry)
    })
  })

  describe('setUser', () => {
    it('should update user', () => {
      const {setAuth, setUser} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      const updatedUser: User = {
        ...mockUser,
        name: 'Updated Name',
      }
      setUser(updatedUser)

      const {user} = useAuthStore.getState()
      expect(user).toEqual(updatedUser)
    })

    it('should not affect tokens', () => {
      const {setAuth, setUser} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      const updatedUser: User = {
        ...mockUser,
        name: 'Updated Name',
      }
      setUser(updatedUser)

      const {tokens} = useAuthStore.getState()
      expect(tokens).toEqual(mockTokens)
    })

    it('should not call apiClient', () => {
      const {setUser} = useAuthStore.getState()

      jest.clearAllMocks()
      setUser(mockUser)

      expect(apiClient.setTokens).not.toHaveBeenCalled()
      expect(apiClient.clearTokens).not.toHaveBeenCalled()
    })
  })

  describe('updateTokens', () => {
    it('should update tokens', () => {
      const {setAuth, updateTokens} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      const newTokens: AuthTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }
      updateTokens(newTokens)

      const {tokens} = useAuthStore.getState()
      expect(tokens).toEqual(newTokens)
    })

    it('should call apiClient.setTokens', () => {
      const {updateTokens} = useAuthStore.getState()
      const newTokens: AuthTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }

      jest.clearAllMocks()
      updateTokens(newTokens)

      expect(apiClient.setTokens).toHaveBeenCalledWith(
        newTokens.accessToken,
        newTokens.refreshToken,
      )
    })

    it('should not affect user', () => {
      const {setAuth, updateTokens} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)

      const newTokens: AuthTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }
      updateTokens(newTokens)

      const {user} = useAuthStore.getState()
      expect(user).toEqual(mockUser)
    })
  })

  describe('logout', () => {
    it('should clear auth state', () => {
      const {setAuth, logout} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      logout()

      const {user, tokens, isAuthenticated, isInitialized} = useAuthStore.getState()
      expect(user).toBeNull()
      expect(tokens).toBeNull()
      expect(isAuthenticated).toBe(false)
      expect(isInitialized).toBe(true)
    })

    it('should call apiClient.clearTokens', () => {
      const {setAuth, logout} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      jest.clearAllMocks()

      logout()

      expect(apiClient.clearTokens).toHaveBeenCalled()
    })

    it('should keep isInitialized true after logout', () => {
      const {setAuth, logout} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      logout()

      const {isInitialized} = useAuthStore.getState()
      expect(isInitialized).toBe(true)
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const {setAuth, reset} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      reset()

      const {user, tokens, isAuthenticated, isInitialized} = useAuthStore.getState()
      expect(user).toBeNull()
      expect(tokens).toBeNull()
      expect(isAuthenticated).toBe(false)
      expect(isInitialized).toBe(false)
    })

    it('should call apiClient.clearTokens', () => {
      const {setAuth, reset} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      jest.clearAllMocks()

      reset()

      expect(apiClient.clearTokens).toHaveBeenCalled()
    })

    it('should set isInitialized to false', () => {
      const {setAuth, reset} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      reset()

      const {isInitialized} = useAuthStore.getState()
      expect(isInitialized).toBe(false)
    })
  })

  describe('initialize', () => {
    it('should set isInitialized to true', () => {
      const {initialize} = useAuthStore.getState()

      initialize()

      const {isInitialized} = useAuthStore.getState()
      expect(isInitialized).toBe(true)
    })

    it('should call apiClient.setTokens if tokens exist', () => {
      const {setAuth, initialize} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      jest.clearAllMocks()

      initialize()

      expect(apiClient.setTokens).toHaveBeenCalledWith(
        mockTokens.accessToken,
        mockTokens.refreshToken,
      )
    })

    it('should not call apiClient.setTokens if no tokens', () => {
      const {initialize} = useAuthStore.getState()

      jest.clearAllMocks()
      initialize()

      expect(apiClient.setTokens).not.toHaveBeenCalled()
    })

    it('should not affect existing auth state', () => {
      const {setAuth, initialize} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      initialize()

      const {user, tokens, isAuthenticated} = useAuthStore.getState()
      expect(user).toEqual(mockUser)
      expect(tokens).toEqual(mockTokens)
      expect(isAuthenticated).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle logout when not authenticated', () => {
      const {logout} = useAuthStore.getState()

      logout()

      const {user, tokens, isAuthenticated} = useAuthStore.getState()
      expect(user).toBeNull()
      expect(tokens).toBeNull()
      expect(isAuthenticated).toBe(false)
    })

    it('should handle multiple sequential logins', () => {
      const {setAuth} = useAuthStore.getState()

      for (let i = 0; i < 3; i++) {
        const user: User = {
          id: `user-${i}`,
          email: `user${i}@example.com`,
          name: `User ${i}`,
        }
        const tokens: AuthTokens = {
          accessToken: `access-${i}`,
          refreshToken: `refresh-${i}`,
        }
        setAuth(user, tokens)
      }

      const {user, tokens} = useAuthStore.getState()
      expect(user?.id).toBe('user-2')
      expect(tokens?.accessToken).toBe('access-2')
    })

    it('should handle login, logout, login sequence', () => {
      const {setAuth, logout} = useAuthStore.getState()

      setAuth(mockUser, mockTokens)
      logout()

      const secondUser: User = {
        id: 'user-456',
        email: 'second@example.com',
        name: 'Second User',
      }
      const secondTokens: AuthTokens = {
        accessToken: 'second-access',
        refreshToken: 'second-refresh',
      }
      setAuth(secondUser, secondTokens)

      const {user, tokens, isAuthenticated} = useAuthStore.getState()
      expect(user).toEqual(secondUser)
      expect(tokens).toEqual(secondTokens)
      expect(isAuthenticated).toBe(true)
    })
  })
})
