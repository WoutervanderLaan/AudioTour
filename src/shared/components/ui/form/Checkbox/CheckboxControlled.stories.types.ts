import {z} from 'zod'

/**
 * Simple form schema with required checkbox
 */
export const simpleSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

/**
 * Complex form schema with multiple checkboxes
 */
export const complexSchema = z
  .object({
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    acceptPrivacy: z.boolean().refine(val => val === true, {
      message: 'You must accept the privacy policy',
    }),
    subscribeNewsletter: z.boolean().optional(),
    enableNotifications: z.boolean().optional(),
    enableSms: z.boolean().optional(),
    over18: z.boolean().refine(val => val === true, {
      message: 'You must be over 18 to use this service',
    }),
  })
  .refine(
    data => {
      if (data.enableSms && !data.enableNotifications) {
        return false
      }
      return true
    },
    {
      message: 'You must enable notifications to receive SMS updates',
      path: ['enableSms'],
    },
  )

/**
 * Form with default values
 */
export const defaultValuesSchema = z.object({
  subscribeNewsletter: z.boolean(),
  enableNotifications: z.boolean(),
})

/**
 * Conditional validation schema
 */
export const conditionalSchema = z
  .object({
    hasPromoCode: z.boolean(),
    promoCodeAccepted: z.boolean().optional(),
  })
  .refine(
    data => {
      // If user has promo code, they must accept the promo code terms
      if (data.hasPromoCode && !data.promoCodeAccepted) {
        return false
      }
      return true
    },
    {
      message: 'You must accept the promo code terms',
      path: ['promoCodeAccepted'],
    },
  )

/**
 * SimpleFormData
 * Form data type for simple checkbox form with terms acceptance.
 * Inferred from simpleSchema validation schema.
 */
export type SimpleFormData = z.infer<typeof simpleSchema>

/**
 * ComplexFormData
 * Form data type for complex checkbox form with multiple required and optional checkboxes.
 * Includes cross-field validation (e.g., SMS requires notifications to be enabled).
 * Inferred from complexSchema validation schema.
 */
export type ComplexFormData = z.infer<typeof complexSchema>

/**
 * DefaultValuesFormData
 * Form data type for checkbox form with pre-populated default boolean values.
 * Inferred from defaultValuesSchema validation schema.
 */
export type DefaultValuesFormData = z.infer<typeof defaultValuesSchema>

/**
 * ConditionalFormData
 * Form data type for checkbox form with conditional validation rules.
 * Requires accepting promo code terms only when hasPromoCode is true.
 * Inferred from conditionalSchema validation schema.
 */
export type ConditionalFormData = z.infer<typeof conditionalSchema>
