/**
 * capitalizeFirstLetter
 * Capitalizes the first letter of a word
 *
 * @param {string} word - Word to capitalize
 * @returns {string} Word with first letter capitalized
 */
export const capitalizeFirstLetter = (word: string): string => {
  return word.slice(0, 1).toUpperCase() + word.slice(1)
}
