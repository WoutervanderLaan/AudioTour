import {capitalizeFirstLetter} from './capitalizeFirstLetter'

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a lowercase word', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test')
  })

  it('should handle already capitalized words', () => {
    expect(capitalizeFirstLetter('Test')).toBe('Test')
  })

  it('should handle single character strings', () => {
    expect(capitalizeFirstLetter('a')).toBe('A')
  })

  it('should handle empty strings', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })
})
