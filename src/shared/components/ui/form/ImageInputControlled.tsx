import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {ImageInput, type ImageInputProps} from './ImageInput'

/**
 * ImageInputControlledProps
 * Props for the ImageInputControlled component
 */
export type ImageInputControlledProps<T extends FieldValues> = Omit<
  ImageInputProps,
  'value' | 'onChange' | 'error'
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
  defaultValue?: string[]
}

/**
 * ImageInputControlled
 * Image input component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base ImageInput
 * - Zod validation support through react-hook-form
 * - Multiple image selection with configurable max limit
 *
 * Usage:
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { z } from 'zod'
 *
 * const schema = z.object({
 *   photos: z
 *     .array(z.string())
 *     .min(1, 'At least one photo is required')
 *     .max(5, 'Maximum 5 photos allowed'),
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
 *     <ImageInputControlled
 *       control={control}
 *       name="photos"
 *       label="Upload Photos"
 *       maxImages={5}
 *       required
 *     />
 *   )
 * }
 * ```
 *
 * @param props - Component props
 * @returns Rendered controlled image input
 */
export const ImageInputControlled = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: ImageInputControlledProps<T>): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as T[Path<T>]}
      render={({
        field: {onChange, value},
        fieldState: {error},
      }): React.JSX.Element => (
        <ImageInput
          value={value as string[]}
          onChange={onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}
