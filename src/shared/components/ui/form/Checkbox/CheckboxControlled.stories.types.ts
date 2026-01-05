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
 * TODO: describe what this type represents.
 */
export type SimpleFormData = z.infer<typeof simpleSchema>

/**
 * ComplexFormData
 * TODO: describe what this type represents.
 */
export type ComplexFormData = z.infer<typeof complexSchema>

/**
 * DefaultValuesFormData
 * TODO: describe what this type represents.
 */
export type DefaultValuesFormData = z.infer<typeof defaultValuesSchema>

/**
 * ConditionalFormData
 * TODO: describe what this type represents.
 */
export type ConditionalFormData = z.infer<typeof conditionalSchema>
