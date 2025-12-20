import * as Crypto from 'expo-crypto'

import type {UserProfile} from './userSessionStore'
import {useUserSessionStore} from './userSessionStore'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid-123'),
}))

describe('userSessionStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const {regenerateSession} = useUserSessionStore.getState()
    regenerateSession()
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have a sessionId', () => {
      const {sessionId} = useUserSessionStore.getState()
      expect(sessionId).toBe('test-uuid-123')
    })

    it('should have undefined user initially', () => {
      const {user} = useUserSessionStore.getState()
      expect(user).toBeUndefined()
    })
  })

  describe('setUser', () => {
    it('should set user profile', () => {
      const {setUser} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        id: 'user-123',
        displayName: 'Test User',
      }

      setUser(testUser)

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual(testUser)
    })

    it('should update user profile', () => {
      const {setUser} = useUserSessionStore.getState()
      const firstUser: UserProfile = {
        id: 'user-123',
        displayName: 'First User',
      }
      const secondUser: UserProfile = {
        id: 'user-456',
        displayName: 'Second User',
      }

      setUser(firstUser)
      expect(useUserSessionStore.getState().user).toEqual(firstUser)

      setUser(secondUser)
      expect(useUserSessionStore.getState().user).toEqual(secondUser)
    })

    it('should set user to undefined', () => {
      const {setUser} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        id: 'user-123',
        displayName: 'Test User',
      }

      setUser(testUser)
      expect(useUserSessionStore.getState().user).toEqual(testUser)

      setUser(undefined)
      expect(useUserSessionStore.getState().user).toBeUndefined()
    })

    it('should handle user with only id', () => {
      const {setUser} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        id: 'user-123',
      }

      setUser(testUser)

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual(testUser)
      expect(user?.displayName).toBeUndefined()
    })

    it('should handle user with only displayName', () => {
      const {setUser} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        displayName: 'Test User',
      }

      setUser(testUser)

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual(testUser)
      expect(user?.id).toBeUndefined()
    })
  })

  describe('regenerateSession', () => {
    it('should generate a new session ID', () => {
      const {regenerateSession, sessionId: initialSessionId} =
        useUserSessionStore.getState()

      // Change the mock to return a different UUID
      ;(Crypto.randomUUID as jest.Mock).mockReturnValueOnce('new-uuid-456')

      regenerateSession()

      const {sessionId: newSessionId} = useUserSessionStore.getState()
      expect(newSessionId).toBe('new-uuid-456')
      expect(newSessionId).not.toBe(initialSessionId)
    })

    it('should not affect user state when regenerating session', () => {
      const {setUser, regenerateSession} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        id: 'user-123',
        displayName: 'Test User',
      }

      setUser(testUser)
      ;(Crypto.randomUUID as jest.Mock).mockReturnValueOnce('new-uuid-789')
      regenerateSession()

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual(testUser)
    })

    it('should call Crypto.randomUUID when regenerating', () => {
      const {regenerateSession} = useUserSessionStore.getState()

      regenerateSession()

      expect(Crypto.randomUUID).toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    it('should handle multiple sequential setUser calls', () => {
      const {setUser} = useUserSessionStore.getState()

      for (let i = 0; i < 5; i++) {
        const user: UserProfile = {
          id: `user-${i}`,
          displayName: `User ${i}`,
        }
        setUser(user)
      }

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual({
        id: 'user-4',
        displayName: 'User 4',
      })
    })

    it('should handle empty strings in user profile', () => {
      const {setUser} = useUserSessionStore.getState()
      const testUser: UserProfile = {
        id: '',
        displayName: '',
      }

      setUser(testUser)

      const {user} = useUserSessionStore.getState()
      expect(user).toEqual(testUser)
    })
  })
})
