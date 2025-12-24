import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {FormField} from './FormField'
import {TextInput, type TextInputProps} from './TextInput'

/**
 * TextInputControlledProps
 * Props for the TextInputControlled component
 */
export type TextInputControlledProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'hasError' | 'inputId' | 'labelId'
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
  /**
   * label - Label text for the input field
   */
  label?: string
  /**
   * hint - Helper text to display when no error
   */
  hint?: string
  /**
   * required - Whether the field is required (adds asterisk to label)
   */
  required?: boolean
}

/**
 * TextInputControlled
 * Text input component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 * Uses FormField for consistent label, error, and help text rendering.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base TextInput
 * - Zod validation support through react-hook-form
 * - Consistent form field styling with FormField
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
 *         hint="We'll never share your email"
 *       />
 *       <TextInputControlled
 *         control={control}
 *         name="password"
 *         label="Password"
 *         secureTextEntry
 *         required
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
  label,
  hint,
  required,
  disabled,
  testID,
  ...rest
}: TextInputControlledProps<T>): React.JSX.Element => {
  const inputId = testID || `input-${name}`
  const labelId = `${inputId}-label`
  const helpTextId = `${inputId}-help`

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as T[Path<T>]}
      render={({
        field: {onChange, onBlur, value},
        fieldState: {error},
      }): React.JSX.Element => (
        <FormField
          testID={`${testID}FormField`}
          label={label}
          error={error?.message}
          hint={hint}
          disabled={disabled}
          required={required}
          labelId={labelId}
          helpTextId={helpTextId}>
          <TextInput
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            hasError={!!error}
            disabled={disabled}
            inputId={inputId}
            labelId={labelId}
            testID={testID}
            {...rest}
          />
        </FormField>
      )}
    />
  )
}
