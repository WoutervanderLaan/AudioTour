import type {Control, FieldValues, Path} from 'react-hook-form'

import type {ImageInputProps} from './ImageInput.types'

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
