import {TIME} from '../types/Time'
import {wait} from './wait'

describe('wait', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return a promise', () => {
    const result = wait(TIME.MILLISECOND * 100)
    expect(result).toBeInstanceOf(Promise)
  })

  it('should resolve after specified milliseconds', async () => {
    const promise = wait(TIME.SECOND)

    // Fast-forward time
    jest.advanceTimersByTime(1000)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should not resolve before specified time', async () => {
    const callback = jest.fn()
    const promise = wait(TIME.SECOND).then(callback)

    // Only advance 500ms
    jest.advanceTimersByTime(500)

    // Promise should not have resolved yet
    expect(callback).not.toHaveBeenCalled()

    // Complete the remaining time
    jest.advanceTimersByTime(500)

    await promise
    expect(callback).toHaveBeenCalled()
  })

  it('should resolve with undefined', async () => {
    const promise = wait(TIME.MILLISECOND * 100)
    jest.advanceTimersByTime(TIME.MILLISECOND * 100)

    const result = await promise
    expect(result).toBeUndefined()
  })

  it('should handle zero milliseconds', async () => {
    const promise = wait(0)
    jest.advanceTimersByTime(0)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should handle very small delays', async () => {
    const promise = wait(1)
    jest.advanceTimersByTime(1)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should handle large delays', async () => {
    const promise = wait(TIME.SECOND * 10)
    jest.advanceTimersByTime(TIME.SECOND * 10)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should allow multiple concurrent waits', async () => {
    const promise1 = wait(TIME.MILLISECOND * 100)
    const promise2 = wait(TIME.MILLISECOND * 200)
    const promise3 = wait(TIME.MILLISECOND * 300)

    jest.advanceTimersByTime(TIME.MILLISECOND * 300)

    await expect(Promise.all([promise1, promise2, promise3])).resolves.toEqual([
      undefined,
      undefined,
      undefined,
    ])
  })

  it('should actually call setTimeout with correct delay', () => {
    const setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout')

    wait(TIME.SECOND)

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1)
    expect(setTimeoutSpy).toHaveBeenCalledWith(
      expect.any(Function),
      TIME.SECOND,
    )

    setTimeoutSpy.mockRestore()
  })

  it('should be chainable with other promises', async () => {
    const result = wait(TIME.MILLISECOND * 100)
      .then(() => 'first')
      .then(val => `${val}-second`)

    jest.advanceTimersByTime(TIME.MILLISECOND * 100)

    await expect(result).resolves.toBe('first-second')
  })

  describe('edge cases', () => {
    it('should convert negative numbers to asbolutes', async () => {
      // setTimeout converts negative numbers to absolutes
      const promise = wait(-100)
      jest.advanceTimersByTime(100)

      await expect(promise).resolves.toBeUndefined()
    })

    it('should round decimal milliseconds', async () => {
      const promise = wait(100.5)
      jest.advanceTimersByTime(101)
      await expect(promise).resolves.toBeUndefined()
    })

    it('should handle very large numbers', async () => {
      const promise = wait(Number.MAX_SAFE_INTEGER)
      jest.advanceTimersByTime(Number.MAX_SAFE_INTEGER)

      await expect(promise).resolves.toBeUndefined()
    })
  })
})
