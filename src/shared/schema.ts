import {z} from 'zod'

export const objectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  artist: z.string().optional(),
  description: z.string().max(200, 'Description too long'),
  year: z.number().max(new Date().getFullYear()),
  category: z.enum(['painting', 'sculpture', 'photography'], {
    required_error: 'Please select a category',
  }),
})

/**
 * ObjectForm
 * TODO: describe what this type represents.
 */
export type ObjectForm = z.infer<typeof objectSchema>
