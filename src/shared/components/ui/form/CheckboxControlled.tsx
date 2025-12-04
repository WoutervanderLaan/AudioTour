import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {Checkbox, type CheckboxProps} from './Checkbox'

/**
 * CheckboxControlledProps
 * Props for the CheckboxControlled component
 */
export type CheckboxControlledProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'onChange' | 'error'
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
  defaultValue?: boolean
}

/**
 * CheckboxControlled
 * Checkbox component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base Checkbox
 * - Zod validation support through react-hook-form
 *
 * Usage:
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { z } from 'zod'
 *
 * const schema = z.object({
 *   acceptTerms: z.boolean().refine(val => val === true, {
 *     message: 'You must accept the terms and conditions',
 *   }),
 *   subscribeNewsletter: z.boolean().optional(),
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
 *       <CheckboxControlled
 *         control={control}
 *         name="acceptTerms"
 *         label="I accept the terms and conditions"
 *         required={true}
 *       />
 *       <CheckboxControlled
 *         control={control}
 *         name="subscribeNewsletter"
 *         label="Subscribe to newsletter"
 *       />
 *     </>
 *   )
 * }
 * ```
 *
 * @param {CheckboxControlledProps<T>} props - Component props
 * @returns {React.JSX.Element} Rendered controlled checkbox
 */
export const CheckboxControlled = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: CheckboxControlledProps<T>): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as T[Path<T>]}
      render={({
        field: {onChange, value},
        fieldState: {error},
      }): React.JSX.Element => (
        <Checkbox
          checked={value as boolean}
          onChange={onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
