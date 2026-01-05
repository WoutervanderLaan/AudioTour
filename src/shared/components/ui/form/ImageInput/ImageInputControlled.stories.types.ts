import z from 'zod'

/**
 * Simple form schema for validation
 */
export const simpleSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

/**
 * Single image schema
 */
export const singleImageSchema = z.object({
  profilePhoto: z
    .array(z.string())
    .min(1, 'Profile photo is required')
    .max(1, 'Only one photo allowed'),
})

/**
 * Complex form schema with multiple fields
 */
export const complexSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(3, 'Maximum 3 photos allowed'),
  coverPhoto: z
    .array(z.string())
    .min(1, 'Cover photo is required')
    .max(1, 'Only one cover photo allowed'),
})

/**
 * Form with default values schema
 */
export const defaultValuesSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

/**
 * Small thumbnails schema
 */
export const smallThumbnailsSchema = z.object({
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
})

/**
 * SmallThumbnailsFormData
 * TODO: describe what this type represents.
 */
export type SmallThumbnailsFormData = z.infer<typeof smallThumbnailsSchema>

/**
 * SimpleFormData
 * TODO: describe what this type represents.
 */
export type SimpleFormData = z.infer<typeof simpleSchema>

/**
 * SingleImageFormData
 * TODO: describe what this type represents.
 */
export type SingleImageFormData = z.infer<typeof singleImageSchema>

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
