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
 * Form data type for image input with small thumbnail display.
 * Inferred from smallThumbnailsSchema validation schema.
 */
export type SmallThumbnailsFormData = z.infer<typeof smallThumbnailsSchema>

/**
 * SimpleFormData
 * Form data type for simple image input with photo array validation (1-5 photos).
 * Inferred from simpleSchema validation schema.
 */
export type SimpleFormData = z.infer<typeof simpleSchema>

/**
 * SingleImageFormData
 * Form data type for single image input (e.g., profile photo).
 * Inferred from singleImageSchema validation schema.
 */
export type SingleImageFormData = z.infer<typeof singleImageSchema>

/**
 * ComplexFormData
 * Form data type for complex image input with title, description, gallery photos, and cover photo.
 * Inferred from complexSchema validation schema.
 */
export type ComplexFormData = z.infer<typeof complexSchema>

/**
 * DefaultValuesFormData
 * Form data type for image input with pre-populated default photo values.
 * Inferred from defaultValuesSchema validation schema.
 */
export type DefaultValuesFormData = z.infer<typeof defaultValuesSchema>
