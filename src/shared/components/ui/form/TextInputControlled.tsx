import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {TextInput, type TextInputProps} from './TextInput'

/**
 * TextInputControlledProps
 * Props for the TextInputControlled component
 */
export type TextInputControlledProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'error'
> & {
  /**
   * control - React Hook Form control object
   */
  control: Control<T>
  /**
   * name - Field name in the form (must be a valid path in the form data)
   */
  name: Path<T>
  /**
   * defaultValue - Default value for the field
   */
  defaultValue?: string
}

/**
 * TextInputControlled
 * Text input component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base TextInput
 * - Zod validation support through react-hook-form
 *
 * Usage:
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { z } from 'zod'
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   password: z.string().min(8, 'Password must be at least 8 characters'),
 * })
 *
 * type FormData = z.infer<typeof schema>
 *
 * const MyForm = () => {
 *   const { control, handleSubmit } = useForm<FormData>({
 *     resolver: zodResolver(schema),
 *   })
 *
 *   return (
 *     <>
 *       <TextInputControlled
 *         control={control}
 *         name="email"
 *         label="Email"
 *         placeholder="you@example.com"
 *       />
 *       <TextInputControlled
 *         control={control}
 *         name="password"
 *         label="Password"
 *         secureTextEntry
 *       />
 *     </>
 *   )
 * }
 * ```
 *
 * @param {TextInputControlledProps<T>} props - Component props
 * @returns {React.JSX.Element} Rendered controlled text input
 */
export const TextInputControlled = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: TextInputControlledProps<T>): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as T[Path<T>]}
      render={({
        field: {onChange, onBlur, value},
        fieldState: {error},
      }): React.JSX.Element => (
        <TextInput
          value={value as string}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
