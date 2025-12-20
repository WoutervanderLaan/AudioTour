import {act, renderHook} from '@testing-library/react-native'
import * as Crypto from 'expo-crypto'

import {
  useCurrentUser,
  useSessionId,
  useUserSessionActions,
} from './userSessionSelectors'
import {type UserProfile, useUserSessionStore} from './userSessionStore'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid-123'),
}))

describe('userSessionSelectors', () => {
  beforeEach(() => {
    // Reset store
    const {regenerateSession} = useUserSessionStore.getState()
    regenerateSession()
    jest.clearAllMocks()
  })

  describe('useSessionId', () => {
    it('should return current session ID', () => {
      const {result} = renderHook(() => useSessionId())

      expect(result.current).toBe('test-uuid-123')
    })

    it('should update when session is regenerated', () => {
      const {result} = renderHook(() => useSessionId())
      const initialSessionId = result.current

      act(() => {
        ;(Crypto.randomUUID as jest.Mock).mockReturnValueOnce('new-uuid-456')
        useUserSessionStore.getState().regenerateSession()
      })

      expect(result.current).toBe('new-uuid-456')
      expect(result.current).not.toBe(initialSessionId)
    })
  })

  describe('useCurrentUser', () => {
    it('should return undefined initially', () => {
      const {result} = renderHook(() => useCurrentUser())

      expect(result.current).toBeUndefined()
    })

    it('should return user when set', () => {
      const testUser: UserProfile = {
        id: 'user-123',
        displayName: 'Test User',
      }

      act(() => {
        useUserSessionStore.getState().setUser(testUser)
      })

      const {result} = renderHook(() => useCurrentUser())

      expect(result.current).toEqual(testUser)
    })

    it('should update when user changes', () => {
      const {result} = renderHook(() => useCurrentUser())

      const firstUser: UserProfile = {id: 'user-1', displayName: 'First'}
      act(() => {
        useUserSessionStore.getState().setUser(firstUser)
      })
      expect(result.current).toEqual(firstUser)

      const secondUser: UserProfile = {id: 'user-2', displayName: 'Second'}
      act(() => {
        useUserSessionStore.getState().setUser(secondUser)
      })
      expect(result.current).toEqual(secondUser)
    })

    it('should return undefined when user is cleared', () => {
      const testUser: UserProfile = {id: 'user-123', displayName: 'Test'}

      act(() => {
        useUserSessionStore.getState().setUser(testUser)
      })

      const {result} = renderHook(() => useCurrentUser())
      expect(result.current).toEqual(testUser)

      act(() => {
        useUserSessionStore.getState().setUser(undefined)
      })
      expect(result.current).toBeUndefined()
    })
  })

  describe('useUserSessionActions', () => {
    it('should return action methods', () => {
      const {result} = renderHook(() => useUserSessionActions())

      expect(result.current).toHaveProperty('setUser')
      expect(result.current).toHaveProperty('regenerateSession')
      expect(typeof result.current.setUser).toBe('function')
      expect(typeof result.current.regenerateSession).toBe('function')
    })

    it('should set user via action', () => {
      const {result} = renderHook(() => useUserSessionActions())
      const testUser: UserProfile = {id: 'user-123', displayName: 'Test'}

      act(() => {
        result.current.setUser(testUser)
      })

      expect(useUserSessionStore.getState().user).toEqual(testUser)
    })

    it('should regenerate session via action', () => {
      const {result} = renderHook(() => useUserSessionActions())

      act(() => {
        ;(Crypto.randomUUID as jest.Mock).mockReturnValueOnce(
          'regenerated-uuid',
        )
        result.current.regenerateSession()
      })

      expect(useUserSessionStore.getState().sessionId).toBe('regenerated-uuid')
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useUserSessionActions())

      const firstReference = result.current

      rerender(null)

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: sessionResult} = renderHook(() => useSessionId())
      const {result: userResult} = renderHook(() => useCurrentUser())
      const {result: actionsResult} = renderHook(() => useUserSessionActions())

      const testUser: UserProfile = {id: 'user-123', displayName: 'Test'}

      act(() => {
        actionsResult.current.setUser(testUser)
      })

      expect(userResult.current).toEqual(testUser)
      expect(sessionResult.current).toBe('test-uuid-123')

      act(() => {
        ;(Crypto.randomUUID as jest.Mock).mockReturnValueOnce('new-session')
        actionsResult.current.regenerateSession()
      })

      expect(userResult.current).toEqual(testUser) // user unchanged
      expect(sessionResult.current).toBe('new-session') // session changed
    })
  })
})
