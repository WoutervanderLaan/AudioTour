import {TIME} from '../types/Time'
import {TIMING} from './timing'

describe('TIMING', () => {
  describe('TOKEN_CHECK_INTERVAL', () => {
    it('should be 1 minute in milliseconds', () => {
      expect(TIMING.TOKEN_CHECK_INTERVAL).toBe(TIME.MINUTE)
    })

    it('should be a positive number', () => {
      expect(TIMING.TOKEN_CHECK_INTERVAL).toBeGreaterThan(0)
    })
  })

  describe('QUERY_STALE_TIME', () => {
    it('should be 5 minutes in milliseconds', () => {
      expect(TIMING.QUERY_STALE_TIME).toBe(5 * TIME.MINUTE)
    })

    it('should be greater than token check interval', () => {
      expect(TIMING.QUERY_STALE_TIME).toBeGreaterThan(
        TIMING.TOKEN_CHECK_INTERVAL,
      )
    })
  })

  describe('API_TIMEOUT', () => {
    it('should be 30 seconds in milliseconds', () => {
      expect(TIMING.API_TIMEOUT).toBe(30 * TIME.SECOND)
    })

    it('should be reasonable for API requests', () => {
      expect(TIMING.API_TIMEOUT).toBeGreaterThanOrEqual(10 * TIME.SECOND)
      expect(TIMING.API_TIMEOUT).toBeLessThanOrEqual(TIME.MINUTE)
    })
  })

  describe('TOAST_DURATION', () => {
    it('should be 3 seconds in milliseconds', () => {
      expect(TIMING.TOAST_DURATION).toBe(3 * TIME.SECOND)
    })
  })
})
