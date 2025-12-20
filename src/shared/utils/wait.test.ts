import {wait} from './wait'

describe('wait', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return a promise', () => {
    const result = wait(100)
    expect(result).toBeInstanceOf(Promise)
  })

  it('should resolve after specified milliseconds', async () => {
    const promise = wait(1000)

    // Fast-forward time
    jest.advanceTimersByTime(1000)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should not resolve before specified time', async () => {
    const callback = jest.fn()
    const promise = wait(1000).then(callback)

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
    const promise = wait(100)
    jest.advanceTimersByTime(100)

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
    const promise = wait(10000)
    jest.advanceTimersByTime(10000)

    await expect(promise).resolves.toBeUndefined()
  })

  it('should allow multiple concurrent waits', async () => {
    const promise1 = wait(100)
    const promise2 = wait(200)
    const promise3 = wait(300)

    jest.advanceTimersByTime(300)

    await expect(Promise.all([promise1, promise2, promise3])).resolves.toEqual([
      undefined,
      undefined,
      undefined,
    ])
  })

  it('should work in async/await context', async () => {
    const start = Date.now()
    const waitPromise = wait(500)

    jest.advanceTimersByTime(500)

    await waitPromise
    // In fake timer context, time doesn't actually pass
    expect(Date.now() - start).toBeLessThan(100)
  })

  it('should actually call setTimeout with correct delay', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout')

    wait(1000)

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1)
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000)

    setTimeoutSpy.mockRestore()
  })

  it('should be chainable with other promises', async () => {
    const result = wait(100)
      .then(() => 'first')
      .then(val => `${val}-second`)

    jest.advanceTimersByTime(100)

    await expect(result).resolves.toBe('first-second')
  })

  describe('edge cases', () => {
    it('should handle negative numbers as zero', async () => {
      // setTimeout treats negative numbers as 0
      const promise = wait(-100)
      jest.advanceTimersByTime(0)

      await expect(promise).resolves.toBeUndefined()
    })

    it('should handle decimal milliseconds', async () => {
      const promise = wait(100.5)
      jest.advanceTimersByTime(101)

      await expect(promise).resolves.toBeUndefined()
    })

    it('should handle very large numbers', async () => {
      const promise = wait(Number.MAX_SAFE_INTEGER)
      jest.advanceTimersByTime(Number.MAX_SAFE_INTEGER)

      await expect(promise).resolves.toBeUndefined()
    })

    it('should work correctly when called multiple times sequentially', async () => {
      await wait(100).then(() => jest.advanceTimersByTime(100))
      await wait(200).then(() => jest.advanceTimersByTime(200))
      await wait(300).then(() => jest.advanceTimersByTime(300))

      // Should complete without errors
      expect(true).toBe(true)
    })
  })
})
