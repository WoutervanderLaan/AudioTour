import type React from 'react'
import {Controller, type FieldValues, type Path} from 'react-hook-form'

import {FormField} from '../FormField/FormField'
import {Checkbox} from './Checkbox'
import type {CheckboxControlledProps} from './CheckboxControlled.types'

/**
 * CheckboxControlled
 * Checkbox component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 * Uses FormField for error and help text rendering.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base Checkbox
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
 *         hint="Please read our terms carefully"
 *         required={true}
 *       />
 *       <CheckboxControlled
 *         control={control}
 *         name="subscribeNewsletter"
 *         label="Subscribe to newsletter"
 *         hint="Get updates about new features"
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
  hint,
  disabled,
  testID,
  label,
  checkboxLabel,
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
        <FormField
          testID={`${testID}FormField`}
          error={error?.message}
          hint={hint}
          disabled={disabled}
          label={label}>
          <Checkbox
            checked={value as boolean}
            onChange={onChange}
            disabled={disabled}
            testID={testID}
            label={checkboxLabel}
            {...rest}
          />
        </FormField>
      )}
    />
  )
}
