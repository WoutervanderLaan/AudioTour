import {TIMING} from './timing'

describe('TIMING', () => {
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
      expect(TIMING.QUERY_STALE_TIME).toBeGreaterThan(
        TIMING.TOKEN_CHECK_INTERVAL,
      )
    })
  })

  describe('API_TIMEOUT', () => {
    it('should be 30 seconds in milliseconds', () => {
      expect(TIMING.API_TIMEOUT).toBe(30_000)
    })

    it('should be reasonable for API requests', () => {
      expect(TIMING.API_TIMEOUT).toBeGreaterThanOrEqual(10_000)
      expect(TIMING.API_TIMEOUT).toBeLessThanOrEqual(60_000)
    })
  })

  describe('TOAST_DURATION', () => {
    it('should be 3 seconds in milliseconds', () => {
      expect(TIMING.TOAST_DURATION).toBe(3_000)
    })
  })
})
