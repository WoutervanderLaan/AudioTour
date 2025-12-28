import {z} from 'zod'

/**
 * Zod validation schema for login form.
 * Validates email format and ensures password is provided.
 */
export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(60, 'Password cannot exceed 60 characters'),
})

/**
 * LoginForm
 * Type inferred from the loginSchema representing form data for logging in with validation rules.
 */
export type LoginForm = z.infer<typeof loginSchema>

/**
 * Zod validation schema for user registration form.
 * Enforces strong password requirements including minimum length,
 * uppercase letter, number, and special character.
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z.string().email('Please provide a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(60, 'Password cannot exceed 60 characters')
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine(val => /[!@#$%^&*]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
})

/**
 * RegisterForm
 * Type inferred from the registerSchema representing form data for user registration.
 */
export type RegisterForm = z.infer<typeof registerSchema>
