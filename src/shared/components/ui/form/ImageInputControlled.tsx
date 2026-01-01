import type React from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {FormField} from './FormField'
import {ImageInput, type ImageInputProps} from './ImageInput'

import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * ImageInputControlledProps
 * Props for the ImageInputControlled component
 */
export type ImageInputControlledProps<T extends FieldValues> = Omit<
  ImageInputProps,
  'value' | 'onChange'
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
 * ImageInputControlled
 * Image input component integrated with React Hook Form and Zod validation.
 * Automatically handles form state, validation errors, and accessibility.
 * Uses FormField for consistent label, error, and help text rendering.
 *
 * Features:
 * - Seamless react-hook-form integration
 * - Automatic validation error display
 * - Type-safe field names with Path<T>
 * - All accessibility features from base ImageInput
 * - Zod validation support through react-hook-form
 * - Multiple image selection with configurable max limit
 * - Custom label with image count display
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
 *       hint="Select up to 5 photos"
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
  label,
  hint,
  required,
  disabled,
  maxImages = 5,
  testID,
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
      }): React.JSX.Element => {
        const images: string[] = value ?? []

        return (
          <FormField
            testID={`${testID}FormField`}
            label={label}
            error={error?.message}
            hint={hint}
            disabled={disabled}
            required={required}
            renderLabel={
              // eslint-disable-next-line react/jsx-no-leaked-render
              label
                ? ({label, labelId, disabled, required}): React.JSX.Element => (
                    <Row
                      testID={`${testID}LabelRow`}
                      gap="xs"
                      center>
                      <Text.Label
                        testID={`${testID}LabelText`}
                        nativeID={labelId}
                        color={disabled ? 'secondary' : 'default'}
                        accessibilityRole="text">
                        {label}
                        {!!required && (
                          <Text.Label
                            testID={`${testID}RequiredText`}
                            color="warning"
                            accessibilityLabel="required">
                            {' '}
                            *
                          </Text.Label>
                        )}
                      </Text.Label>
                      <Text.Label
                        testID={`${testID}CountText`}
                        color="secondary">
                        {images.length} / {maxImages}
                      </Text.Label>
                    </Row>
                  )
                : undefined
            }>
            <ImageInput
              value={images}
              onChange={onChange}
              maxImages={maxImages}
              disabled={disabled}
              testID={testID}
              {...rest}
            />
          </FormField>
        )
      }}
    />
  )
}
