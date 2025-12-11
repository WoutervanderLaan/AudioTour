/**
 * wait
 * TODO: describe what it does.
 *
 * @param {*} ms
 * @returns {*} describe return value
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
