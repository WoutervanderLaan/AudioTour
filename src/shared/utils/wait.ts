/**
 * wait
 * Creates a delay by returning a Promise that resolves after the specified number of milliseconds.
 * Useful for adding delays in asynchronous operations, testing, or implementing timeouts.
 *
 * @param ms - The number of milliseconds to wait before resolving the Promise
 * @returns A Promise that resolves after the specified delay with no value
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
