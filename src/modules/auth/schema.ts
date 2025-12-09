import {z} from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine(val => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(val => /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    }),
})

/**
 * LoginForm
 * Type inferred from the loginSchema representing form data for logging in with validation rules.
 */
export type LoginForm = z.infer<typeof loginSchema>
