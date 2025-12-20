import {notificationKeys} from './keys'

describe('notificationKeys', () => {
  describe('structure', () => {
    it('should have all key methods', () => {
      expect(notificationKeys).toHaveProperty('all')
      expect(notificationKeys).toHaveProperty('preferences')
      expect(notificationKeys).toHaveProperty('registration')
    })

    it('should have function methods', () => {
      expect(typeof notificationKeys.preferences).toBe('function')
      expect(typeof notificationKeys.registration).toBe('function')
    })
  })

  describe('all key', () => {
    it('should return base key array', () => {
      expect(notificationKeys.all).toEqual(['notifications'])
    })
  })

  describe('preferences key', () => {
    it('should return preferences key array', () => {
      expect(notificationKeys.preferences()).toEqual([
        'notifications',
        'preferences',
      ])
    })

    it('should include base key', () => {
      const key = notificationKeys.preferences()
      expect(key[0]).toBe('notifications')
    })
  })

  describe('registration key', () => {
    it('should return registration key array', () => {
      expect(notificationKeys.registration()).toEqual([
        'notifications',
        'registration',
      ])
    })

    it('should include base key', () => {
      const key = notificationKeys.registration()
      expect(key[0]).toBe('notifications')
    })
  })

  describe('hierarchical structure', () => {
    it('should maintain consistent base key', () => {
      const baseKey = notificationKeys.all

      expect(notificationKeys.preferences()[0]).toBe(baseKey[0])
      expect(notificationKeys.registration()[0]).toBe(baseKey[0])
    })

    it('should have unique second-level keys', () => {
      const secondLevelKeys = [
        notificationKeys.preferences()[1],
        notificationKeys.registration()[1],
      ]

      const uniqueKeys = new Set(secondLevelKeys)
      expect(uniqueKeys.size).toBe(secondLevelKeys.length)
    })

    it('should support TanStack Query invalidation patterns', () => {
      // Invalidate all notification queries
      expect(notificationKeys.all).toEqual(['notifications'])

      // Invalidate specific query
      expect(notificationKeys.preferences()).toContain('preferences')
      expect(notificationKeys.registration()).toContain('registration')
    })
  })

  describe('edge cases', () => {
    it('should be callable multiple times with same result', () => {
      const key1 = notificationKeys.preferences()
      const key2 = notificationKeys.preferences()

      expect(key1).toEqual(key2)
    })
  })
})
