import {authKeys} from './keys'

describe('authKeys', () => {
  describe('structure', () => {
    it('should have all key methods', () => {
      expect(authKeys).toHaveProperty('all')
      expect(authKeys).toHaveProperty('session')
      expect(authKeys).toHaveProperty('profile')
      expect(authKeys).toHaveProperty('verify')
      expect(authKeys).toHaveProperty('user')
    })

    it('should have function methods', () => {
      expect(typeof authKeys.session).toBe('function')
      expect(typeof authKeys.profile).toBe('function')
      expect(typeof authKeys.verify).toBe('function')
      expect(typeof authKeys.user).toBe('function')
    })
  })

  describe('all key', () => {
    it('should return base key array', () => {
      expect(authKeys.all).toEqual(['auth'])
    })

    it('should be readonly', () => {
      expect(Object.isFrozen(authKeys.all)).toBe(true)
    })
  })

  describe('session key', () => {
    it('should return session key array', () => {
      expect(authKeys.session()).toEqual(['auth', 'session'])
    })

    it('should include base key', () => {
      const key = authKeys.session()
      expect(key[0]).toBe('auth')
    })

    it('should be readonly', () => {
      const key = authKeys.session()
      expect(Object.isFrozen(key)).toBe(true)
    })
  })

  describe('profile key', () => {
    it('should return profile key array', () => {
      expect(authKeys.profile()).toEqual(['auth', 'profile'])
    })

    it('should include base key', () => {
      const key = authKeys.profile()
      expect(key[0]).toBe('auth')
    })

    it('should be readonly', () => {
      const key = authKeys.profile()
      expect(Object.isFrozen(key)).toBe(true)
    })
  })

  describe('verify key', () => {
    it('should return verify key array', () => {
      expect(authKeys.verify()).toEqual(['auth', 'verify'])
    })

    it('should include base key', () => {
      const key = authKeys.verify()
      expect(key[0]).toBe('auth')
    })

    it('should be readonly', () => {
      const key = authKeys.verify()
      expect(Object.isFrozen(key)).toBe(true)
    })
  })

  describe('user key', () => {
    it('should return user key array with ID', () => {
      expect(authKeys.user('user-123')).toEqual(['auth', 'user', 'user-123'])
    })

    it('should include base key', () => {
      const key = authKeys.user('user-123')
      expect(key[0]).toBe('auth')
    })

    it('should include user ID', () => {
      const userId = 'test-user-456'
      const key = authKeys.user(userId)
      expect(key[2]).toBe(userId)
    })

    it('should be readonly', () => {
      const key = authKeys.user('user-123')
      expect(Object.isFrozen(key)).toBe(true)
    })

    it('should create different keys for different user IDs', () => {
      const key1 = authKeys.user('user-1')
      const key2 = authKeys.user('user-2')

      expect(key1).not.toEqual(key2)
      expect(key1[2]).toBe('user-1')
      expect(key2[2]).toBe('user-2')
    })
  })

  describe('hierarchical structure', () => {
    it('should maintain consistent base key', () => {
      const baseKey = authKeys.all

      expect(authKeys.session()[0]).toBe(baseKey[0])
      expect(authKeys.profile()[0]).toBe(baseKey[0])
      expect(authKeys.verify()[0]).toBe(baseKey[0])
      expect(authKeys.user('123')[0]).toBe(baseKey[0])
    })

    it('should have unique second-level keys', () => {
      const secondLevelKeys = [
        authKeys.session()[1],
        authKeys.profile()[1],
        authKeys.verify()[1],
        authKeys.user('123')[1],
      ]

      const uniqueKeys = new Set(secondLevelKeys)
      expect(uniqueKeys.size).toBe(secondLevelKeys.length)
    })

    it('should support TanStack Query invalidation patterns', () => {
      // Invalidate all auth queries
      expect(authKeys.all).toEqual(['auth'])

      // Invalidate specific query
      expect(authKeys.session()).toContain('session')
      expect(authKeys.profile()).toContain('profile')
    })
  })

  describe('edge cases', () => {
    it('should handle empty string user ID', () => {
      const key = authKeys.user('')
      expect(key).toEqual(['auth', 'user', ''])
    })

    it('should handle special characters in user ID', () => {
      const userId = 'user-123-!@#$%'
      const key = authKeys.user(userId)
      expect(key[2]).toBe(userId)
    })

    it('should handle very long user ID', () => {
      const longUserId = 'user-' + 'a'.repeat(1000)
      const key = authKeys.user(longUserId)
      expect(key[2]).toBe(longUserId)
    })

    it('should be callable multiple times with same result', () => {
      const key1 = authKeys.session()
      const key2 = authKeys.session()

      expect(key1).toEqual(key2)
    })
  })
})
