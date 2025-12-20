import {z} from 'zod'

import {datetime} from '@/core/lib/datetime'

export const objectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  artist: z.string().optional(),
  description: z.string().max(200, 'Description too long'),
  year: z.number().max(datetime.currentYear()),
  category: z.enum(['painting', 'sculpture', 'photography'], {
    required_error: 'Please select a category',
  }),
  notifications: z.boolean().refine(Boolean, {message: 'Must be true mate'}),
  acceptTerms: z.boolean().refine(Boolean, {message: 'Must be true mate'}),
})

/**
 * ObjectForm
 * Type inferred from the objectSchema representing form data for museum object creation with validation rules.
 */
export type ObjectForm = z.infer<typeof objectSchema>
