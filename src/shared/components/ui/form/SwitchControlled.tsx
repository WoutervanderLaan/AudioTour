import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {FormField} from './FormField'
import {Switch, type SwitchProps} from './Switch'

/**
 * SwitchControlledProps
 * Props for the SwitchControlled component
 */
export type SwitchControlledProps<T extends FieldValues> = Omit<
  SwitchProps,
  'value' | 'onChange' | 'hasError'
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
  /**
   * hint - Helper text to display when no error
   */
  hint?: string
}

/**
 * SwitchControlled
 * Switch component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 * Uses FormField for error and help text rendering.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base Switch
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
 *   notifications: z.boolean(),
 *   darkMode: z.boolean().refine(val => val === true, {
 *     message: 'Dark mode must be enabled',
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
 *     <>
 *       <SwitchControlled
 *         control={control}
 *         name="notifications"
 *         label="Enable notifications"
 *         hint="Receive updates about your account"
 *       />
 *       <SwitchControlled
 *         control={control}
 *         name="darkMode"
 *         label="Dark mode"
 *         hint="Dark mode must be enabled"
 *         required={true}
 *       />
 *     </>
 *   )
 * }
 * ```
 *
 * @param {SwitchControlledProps<T>} props - Component props
 * @returns {React.JSX.Element} Rendered controlled switch
 */
export const SwitchControlled = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  hint,
  disabled,
  testID,
  ...rest
}: SwitchControlledProps<T>): React.JSX.Element => {
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
          error={error?.message}
          hint={hint}
          disabled={disabled}
          testID={testID}>
          <Switch
            value={value as boolean}
            onChange={onChange}
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
