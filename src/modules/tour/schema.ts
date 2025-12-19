import z from 'zod'

/**
 * Zod validation schema for photo submission form.
 * Validates photo array (1-5 photos) and optional artwork metadata fields.
 */
export const photoSubmitSchema = z.object({
  photos: z
    .array(z.string())
    .max(5, 'Only five photos can be used at once')
    .min(1, 'Add at least one photo'),
  title: z.string().optional(),
  artist: z.string().optional(),
  year: z.string().optional(),
  material: z.string().optional(),
  description: z.string().optional(),
})

/**
 * PhotoSubmitForm
 * Form data type for photo submission
 */
export type PhotoSubmitForm = z.infer<typeof photoSubmitSchema>
