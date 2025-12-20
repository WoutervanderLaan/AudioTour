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

  it('should capitalize first letter of multi-word strings', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world')
  })

  it('should handle strings with leading spaces', () => {
    expect(capitalizeFirstLetter(' test')).toBe(' test')
  })

  it('should handle strings starting with numbers', () => {
    expect(capitalizeFirstLetter('123abc')).toBe('123abc')
  })

  it('should handle strings with special characters at start', () => {
    expect(capitalizeFirstLetter('!hello')).toBe('!hello')
    expect(capitalizeFirstLetter('@test')).toBe('@test')
    expect(capitalizeFirstLetter('#world')).toBe('#world')
  })

  it('should handle all uppercase strings', () => {
    expect(capitalizeFirstLetter('HELLO')).toBe('HELLO')
  })

  it('should handle mixed case strings', () => {
    expect(capitalizeFirstLetter('hElLo')).toBe('HElLo')
  })

  it('should handle unicode characters', () => {
    expect(capitalizeFirstLetter('école')).toBe('École')
    expect(capitalizeFirstLetter('über')).toBe('Über')
  })

  it('should handle emoji at start', () => {
    expect(capitalizeFirstLetter('😀hello')).toBe('😀hello')
  })

  it('should handle newlines and tabs', () => {
    expect(capitalizeFirstLetter('\nhello')).toBe('\nhello')
    expect(capitalizeFirstLetter('\thello')).toBe('\thello')
  })
})
