import {capitalizeFirstLetter} from './capitalizeFirstLetter'

describe('capitalizeFirstLetter', () => {
  it('should return a lowercase word with first letter capitalized', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test')
  })
})
