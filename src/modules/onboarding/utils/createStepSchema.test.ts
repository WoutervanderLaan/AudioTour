import {z} from 'zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {OnboardingStepType} from '../types'

import {createStepSchema} from './createStepSchema'

describe('createStepSchema', () => {
  describe('RADIO type steps', () => {
    it('should create enum schema for required RADIO step', () => {
      // First step is experience_level - required RADIO
      const schema = createStepSchema(0)

      // Valid value
      expect(() => schema.parse({experience_level: 'beginner'})).not.toThrow()
      expect(() => schema.parse({experience_level: 'intermediate'})).not.toThrow()
      expect(() => schema.parse({experience_level: 'advanced'})).not.toThrow()

      // Invalid value
      expect(() => schema.parse({experience_level: 'invalid'})).toThrow()

      // Missing required field
      expect(() => schema.parse({})).toThrow()
    })

    it('should create enum schema for all RADIO steps', () => {
      // Step 1: preferred_style
      const schema1 = createStepSchema(1)
      expect(() => schema1.parse({preferred_style: 'storytelling'})).not.toThrow()
      expect(() => schema1.parse({preferred_style: 'factual'})).not.toThrow()
      expect(() => schema1.parse({preferred_style: 'conversational'})).not.toThrow()
      expect(() => schema1.parse({preferred_style: 'invalid'})).toThrow()

      // Step 2: interests
      const schema2 = createStepSchema(2)
      expect(() => schema2.parse({interests: 'art'})).not.toThrow()
      expect(() => schema2.parse({interests: 'history'})).not.toThrow()
      expect(() => schema2.parse({interests: 'science'})).not.toThrow()
      expect(() => schema2.parse({interests: 'invalid'})).toThrow()

      // Step 3: tour_length
      const schema3 = createStepSchema(3)
      expect(() => schema3.parse({tour_length: 'short'})).not.toThrow()
      expect(() => schema3.parse({tour_length: 'medium'})).not.toThrow()
      expect(() => schema3.parse({tour_length: 'long'})).not.toThrow()
      expect(() => schema3.parse({tour_length: 'invalid'})).toThrow()
    })

    it('should validate exact enum values', () => {
      const schema = createStepSchema(0)

      const result = schema.parse({experience_level: 'beginner'})
      expect(result.experience_level).toBe('beginner')
    })

    it('should provide error for invalid enum value', () => {
      const schema = createStepSchema(0)

      expect(() => {
        schema.parse({experience_level: 'expert'})
      }).toThrow(z.ZodError)
    })

    it('should provide error for missing required field', () => {
      const schema = createStepSchema(0)

      try {
        schema.parse({})
        fail('Should have thrown validation error')
      } catch (error) {
        expect(error).toBeInstanceOf(z.ZodError)
        const zodError = error as z.ZodError
        expect(zodError.errors[0].message).toContain('Please select an option')
      }
    })
  })

  describe('TOGGLE type steps', () => {
    it('should create boolean schema for TOGGLE step', () => {
      // Step 4: accessibility (TOGGLE type)
      const schema = createStepSchema(4)

      // Valid boolean values
      expect(() => schema.parse({accessibility: true})).not.toThrow()
      expect(() => schema.parse({accessibility: false})).not.toThrow()

      // Optional field
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should accept boolean values', () => {
      const schema = createStepSchema(4)

      const result1 = schema.parse({accessibility: true})
      expect(result1.accessibility).toBe(true)

      const result2 = schema.parse({accessibility: false})
      expect(result2.accessibility).toBe(false)
    })

    it('should make TOGGLE field optional', () => {
      const schema = createStepSchema(4)

      const result = schema.parse({})
      expect(result.accessibility).toBeUndefined()
    })

    it('should reject non-boolean values for TOGGLE', () => {
      const schema = createStepSchema(4)

      expect(() => schema.parse({accessibility: 'yes'})).toThrow()
      expect(() => schema.parse({accessibility: 1})).toThrow()
      expect(() => schema.parse({accessibility: null})).toThrow()
    })
  })

  describe('edge cases', () => {
    it('should return empty schema for invalid step index', () => {
      const schema = createStepSchema(999)

      expect(schema).toBeInstanceOf(z.ZodObject)
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should return empty schema for negative index', () => {
      const schema = createStepSchema(-1)

      expect(schema).toBeInstanceOf(z.ZodObject)
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should handle step with correct field name', () => {
      const step = ONBOARDING_STEPS[0]
      const schema = createStepSchema(0)

      const result = schema.parse({[step.id]: 'beginner'})
      expect(result).toHaveProperty(step.id)
    })

    it('should validate only the specific step field', () => {
      const schema = createStepSchema(0)

      // Should only validate experience_level, ignore other fields
      const result = schema.parse({
        experience_level: 'beginner',
        other_field: 'ignored',
      })

      expect(result.experience_level).toBe('beginner')
    })
  })

  describe('schema structure', () => {
    it('should return ZodObject type', () => {
      const schema = createStepSchema(0)
      expect(schema).toBeInstanceOf(z.ZodObject)
    })

    it('should have single field matching step id', () => {
      const schema = createStepSchema(0)
      const keys = Object.keys(schema.shape)

      expect(keys).toHaveLength(1)
      expect(keys[0]).toBe('experience_level')
    })

    it('should create different schemas for different steps', () => {
      const schema0 = createStepSchema(0)
      const schema1 = createStepSchema(1)

      const keys0 = Object.keys(schema0.shape)
      const keys1 = Object.keys(schema1.shape)

      expect(keys0[0]).toBe('experience_level')
      expect(keys1[0]).toBe('preferred_style')
    })
  })

  describe('all configured steps', () => {
    it('should create valid schema for each step', () => {
      ONBOARDING_STEPS.forEach((step, index) => {
        const schema = createStepSchema(index)
        expect(schema).toBeInstanceOf(z.ZodObject)

        const keys = Object.keys(schema.shape)
        expect(keys).toContain(step.id)
      })
    })

    it('should validate step type correctly', () => {
      ONBOARDING_STEPS.forEach((step, index) => {
        const schema = createStepSchema(index)

        if (step.type === OnboardingStepType.RADIO && step.options) {
          // Test with first valid option
          const validValue = step.options[0].value
          expect(() => schema.parse({[step.id]: validValue})).not.toThrow()

          // Test with invalid option
          expect(() => schema.parse({[step.id]: 'invalid-option-xyz'})).toThrow()
        } else if (step.type === OnboardingStepType.TOGGLE) {
          expect(() => schema.parse({[step.id]: true})).not.toThrow()
          expect(() => schema.parse({[step.id]: false})).not.toThrow()
        } else if (step.type === OnboardingStepType.TEXT) {
          expect(() => schema.parse({[step.id]: 'some text'})).not.toThrow()
        }
      })
    })
  })

  describe('TEXT type steps (potential future steps)', () => {
    // These tests demonstrate how TEXT type would work if added to config

    it('should create string schema for TEXT type', () => {
      // Mock a TEXT type step
      const mockTextStep = {
        id: 'text_field',
        type: OnboardingStepType.TEXT,
        title: 'Text Input',
        description: 'Enter text',
        required: true,
      }

      // Temporarily add to steps
      const originalSteps = [...ONBOARDING_STEPS]
      ONBOARDING_STEPS.push(mockTextStep)

      const schema = createStepSchema(ONBOARDING_STEPS.length - 1)

      expect(() => schema.parse({text_field: 'some text'})).not.toThrow()
      expect(() => schema.parse({text_field: ''})).toThrow() // required, min length 1

      // Restore original steps
      ONBOARDING_STEPS.length = originalSteps.length
    })

    it('should make optional TEXT field not required', () => {
      // Mock an optional TEXT type step
      const mockTextStep = {
        id: 'optional_text',
        type: OnboardingStepType.TEXT,
        title: 'Optional Text',
        description: 'Enter text',
        required: false,
      }

      const originalSteps = [...ONBOARDING_STEPS]
      ONBOARDING_STEPS.push(mockTextStep)

      const schema = createStepSchema(ONBOARDING_STEPS.length - 1)

      expect(() => schema.parse({})).not.toThrow()
      expect(() => schema.parse({optional_text: ''})).not.toThrow()
      expect(() => schema.parse({optional_text: 'text'})).not.toThrow()

      // Restore original steps
      ONBOARDING_STEPS.length = originalSteps.length
    })
  })

  describe('required vs optional fields', () => {
    it('should enforce required RADIO fields', () => {
      // All current RADIO steps are required
      const radioStepIndexes = [0, 1, 2, 3]

      radioStepIndexes.forEach(index => {
        const schema = createStepSchema(index)
        const step = ONBOARDING_STEPS[index]

        expect(() => schema.parse({})).toThrow()
        expect(() => schema.parse({[step.id]: undefined})).toThrow()
      })
    })

    it('should allow optional TOGGLE fields to be omitted', () => {
      const schema = createStepSchema(4) // accessibility is optional

      expect(() => schema.parse({})).not.toThrow()

      const result = schema.parse({})
      expect(result.accessibility).toBeUndefined()
    })
  })

  describe('validation error messages', () => {
    it('should provide descriptive error for required field', () => {
      const schema = createStepSchema(0)

      try {
        schema.parse({})
      } catch (error) {
        const zodError = error as z.ZodError
        expect(zodError.errors[0].message).toBe('Please select an option')
      }
    })

    it('should provide error for invalid enum value', () => {
      const schema = createStepSchema(0)

      try {
        schema.parse({experience_level: 'not-valid'})
      } catch (error) {
        const zodError = error as z.ZodError
        expect(zodError.errors[0].code).toBe('invalid_enum_value')
      }
    })
  })

  describe('type safety', () => {
    it('should parse and return correct types', () => {
      const schema = createStepSchema(0)
      const result = schema.parse({experience_level: 'beginner'})

      expect(typeof result.experience_level).toBe('string')
      expect(result.experience_level).toBe('beginner')
    })

    it('should parse boolean for TOGGLE type', () => {
      const schema = createStepSchema(4)
      const result = schema.parse({accessibility: true})

      expect(typeof result.accessibility).toBe('boolean')
      expect(result.accessibility).toBe(true)
    })
  })
})
