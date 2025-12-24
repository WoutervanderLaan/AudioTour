import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {FormField} from './FormField'
import {RadioGroup, type RadioGroupProps} from './RadioGroup'

/**
 * RadioGroupControlledProps
 * Props for the RadioGroupControlled component
 */
export type RadioGroupControlledProps<
  TFieldValues extends FieldValues,
  TValue extends string = string,
> = Omit<RadioGroupProps<TValue>, 'value' | 'onChange' | 'hasError'> & {
  /**
   * control - React Hook Form control object
   */
  control: Control<TFieldValues>
  /**
   * name - Field name in the form (must be a valid path in the form data)
   */
  name: Path<TFieldValues>
  /**
   * defaultValue - Default value for the field
   */
  defaultValue?: TValue
  /**
   * label - Label text for the radio group
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
 * RadioGroupControlled
 * Radio group component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 * Uses FormField for consistent label, error, and help text rendering.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base RadioGroup
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
 *   theme: z.enum(['light', 'dark', 'auto'], {
 *     required_error: 'Please select a theme',
 *   }),
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
 *     <RadioGroupControlled
 *       control={control}
 *       name="theme"
 *       label="Theme Preference"
 *       hint="Select your preferred theme"
 *       required
 *       options={[
 *         { value: 'light', label: 'Light', description: 'Light color scheme' },
 *         { value: 'dark', label: 'Dark', description: 'Dark color scheme' },
 *         { value: 'auto', label: 'Auto', description: 'Follow system' },
 *       ]}
 *     />
 *   )
 * }
 * ```
 *
 * @param {RadioGroupControlledProps<TFieldValues, TValue>} props - Component props
 * @returns {React.JSX.Element} Rendered controlled radio group
 */
export const RadioGroupControlled = <
  TFieldValues extends FieldValues,
  TValue extends string = string,
>({
  control,
  name,
  defaultValue,
  label,
  hint,
  required,
  disabled,
  testID,
  ...rest
}: RadioGroupControlledProps<TFieldValues, TValue>): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as TFieldValues[Path<TFieldValues>]}
      render={({
        field: {onChange, value},
        fieldState: {error},
      }): React.JSX.Element => (
        <FormField
          testID={`${testID}FormField`}
          label={label}
          error={error?.message}
          hint={hint}
          disabled={disabled}
          required={required}>
          <RadioGroup
            value={value as TValue}
            onChange={onChange as (value: TValue) => void}
            hasError={!!error}
            disabled={disabled}
            testID={testID}
            {...rest}
          />
        </FormField>
      )}
    />
  )
}
