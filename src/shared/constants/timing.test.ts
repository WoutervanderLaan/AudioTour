import {TIMING, type TimingKey} from './timing'

describe('TIMING', () => {
  describe('structure', () => {
    it('should have all timing constants', () => {
      expect(TIMING).toHaveProperty('TOKEN_CHECK_INTERVAL')
      expect(TIMING).toHaveProperty('QUERY_STALE_TIME')
      expect(TIMING).toHaveProperty('API_TIMEOUT_DEFAULT')
      expect(TIMING).toHaveProperty('API_TIMEOUT_EXTENDED')
      expect(TIMING).toHaveProperty('TOAST_DURATION_DEFAULT')
      expect(TIMING).toHaveProperty('TOAST_DURATION_SHORT')
      expect(TIMING).toHaveProperty('TOAST_DURATION_LONG')
    })

    it('should be readonly', () => {
      expect(Object.isFrozen(TIMING)).toBe(true)
    })

    it('should have correct number of properties', () => {
      expect(Object.keys(TIMING)).toHaveLength(7)
    })
  })

  describe('TOKEN_CHECK_INTERVAL', () => {
    it('should be 1 minute in milliseconds', () => {
      expect(TIMING.TOKEN_CHECK_INTERVAL).toBe(60_000)
    })

    it('should be a positive number', () => {
      expect(TIMING.TOKEN_CHECK_INTERVAL).toBeGreaterThan(0)
    })
  })

  describe('QUERY_STALE_TIME', () => {
    it('should be 5 minutes in milliseconds', () => {
      expect(TIMING.QUERY_STALE_TIME).toBe(5 * 60 * 1000)
    })

    it('should be greater than token check interval', () => {
      expect(TIMING.QUERY_STALE_TIME).toBeGreaterThan(TIMING.TOKEN_CHECK_INTERVAL)
    })
  })

  describe('API_TIMEOUT_DEFAULT', () => {
    it('should be 30 seconds in milliseconds', () => {
      expect(TIMING.API_TIMEOUT_DEFAULT).toBe(30_000)
    })

    it('should be reasonable for API requests', () => {
      expect(TIMING.API_TIMEOUT_DEFAULT).toBeGreaterThanOrEqual(10_000)
      expect(TIMING.API_TIMEOUT_DEFAULT).toBeLessThanOrEqual(60_000)
    })
  })

  describe('API_TIMEOUT_EXTENDED', () => {
    it('should be 2 minutes in milliseconds', () => {
      expect(TIMING.API_TIMEOUT_EXTENDED).toBe(120_000)
    })

    it('should be greater than default timeout', () => {
      expect(TIMING.API_TIMEOUT_EXTENDED).toBeGreaterThan(TIMING.API_TIMEOUT_DEFAULT)
    })

    it('should be exactly 4 times the default timeout', () => {
      expect(TIMING.API_TIMEOUT_EXTENDED).toBe(TIMING.API_TIMEOUT_DEFAULT * 4)
    })
  })

  describe('TOAST_DURATION_DEFAULT', () => {
    it('should be 3 seconds in milliseconds', () => {
      expect(TIMING.TOAST_DURATION_DEFAULT).toBe(3_000)
    })

    it('should be between short and long durations', () => {
      expect(TIMING.TOAST_DURATION_DEFAULT).toBeGreaterThan(TIMING.TOAST_DURATION_SHORT)
      expect(TIMING.TOAST_DURATION_DEFAULT).toBeLessThan(TIMING.TOAST_DURATION_LONG)
    })
  })

  describe('TOAST_DURATION_SHORT', () => {
    it('should be 2 seconds in milliseconds', () => {
      expect(TIMING.TOAST_DURATION_SHORT).toBe(2_000)
    })

    it('should be the shortest toast duration', () => {
      expect(TIMING.TOAST_DURATION_SHORT).toBeLessThan(TIMING.TOAST_DURATION_DEFAULT)
      expect(TIMING.TOAST_DURATION_SHORT).toBeLessThan(TIMING.TOAST_DURATION_LONG)
    })
  })

  describe('TOAST_DURATION_LONG', () => {
    it('should be 5 seconds in milliseconds', () => {
      expect(TIMING.TOAST_DURATION_LONG).toBe(5_000)
    })

    it('should be the longest toast duration', () => {
      expect(TIMING.TOAST_DURATION_LONG).toBeGreaterThan(TIMING.TOAST_DURATION_DEFAULT)
      expect(TIMING.TOAST_DURATION_LONG).toBeGreaterThan(TIMING.TOAST_DURATION_SHORT)
    })
  })

  describe('relationships', () => {
    it('should have toast durations in ascending order', () => {
      expect(TIMING.TOAST_DURATION_SHORT).toBeLessThan(TIMING.TOAST_DURATION_DEFAULT)
      expect(TIMING.TOAST_DURATION_DEFAULT).toBeLessThan(TIMING.TOAST_DURATION_LONG)
    })

    it('should have API timeouts in ascending order', () => {
      expect(TIMING.API_TIMEOUT_DEFAULT).toBeLessThan(TIMING.API_TIMEOUT_EXTENDED)
    })

    it('should have all values as positive numbers', () => {
      Object.values(TIMING).forEach(value => {
        expect(value).toBeGreaterThan(0)
        expect(typeof value).toBe('number')
      })
    })
  })

  describe('TimingKey type', () => {
    it('should match all TIMING keys', () => {
      const keys: TimingKey[] = [
        'TOKEN_CHECK_INTERVAL',
        'QUERY_STALE_TIME',
        'API_TIMEOUT_DEFAULT',
        'API_TIMEOUT_EXTENDED',
        'TOAST_DURATION_DEFAULT',
        'TOAST_DURATION_SHORT',
        'TOAST_DURATION_LONG',
      ]

      keys.forEach(key => {
        expect(TIMING[key]).toBeDefined()
      })
    })
  })

  describe('immutability', () => {
    it('should not allow modification of values', () => {
      expect(() => {
        // @ts-expect-error - testing immutability
        TIMING.TOKEN_CHECK_INTERVAL = 999
      }).toThrow()
    })

    it('should not allow adding new properties', () => {
      expect(() => {
        // @ts-expect-error - testing immutability
        TIMING.NEW_PROPERTY = 123
      }).toThrow()
    })

    it('should not allow deletion of properties', () => {
      expect(() => {
        // @ts-expect-error - testing immutability
        delete TIMING.TOKEN_CHECK_INTERVAL
      }).toThrow()
    })
  })
})
