import {z} from 'zod'

import {ONBOARDING_STEPS} from '../config/steps'
import {OnboardingStepType} from '../types'

/**
 * createStepSchema
 * Creates a Zod schema for the current step based on its configuration
 *
 * @param stepIndex - Index of the current step
 * @returns Zod schema for the step
 */
export const createStepSchema = (
  stepIndex: number,
): z.ZodObject<{[key: string]: z.ZodTypeAny}> => {
  const step = ONBOARDING_STEPS[stepIndex]

  if (!step) {
    return z.object({})
  }

  let fieldSchema: z.ZodTypeAny

  switch (step.type) {
    case OnboardingStepType.RADIO: {
      const validValues = step.options?.map(o => o.value) ?? []
      if (validValues.length > 0) {
        if (step.required) {
          fieldSchema = z.enum(validValues as [string, ...string[]], {
            required_error: 'Please select an option',
          })
        } else {
          fieldSchema = z.enum(validValues as [string, ...string[]]).optional()
        }
      } else {
        fieldSchema = step.required
          ? z.string({required_error: 'Please select an option'})
          : z.string().optional()
      }
      break
    }
    case OnboardingStepType.TOGGLE:
      fieldSchema = z.boolean().optional()
      break
    case OnboardingStepType.TEXT:
      if (step.required) {
        fieldSchema = z.string().min(1, 'This field is required')
      } else {
        fieldSchema = z.string().optional()
      }
      break
    default:
      fieldSchema = z.string().optional()
  }

  return z.object({
    [step.id]: fieldSchema,
  })
}

/**
 * StepFormData
 * Represents the form data for a single onboarding step as a key-value record.
 * The key is the step ID and the value is the user's answer (string, boolean, or other type).
 */
export type StepFormData = Record<string, unknown>
