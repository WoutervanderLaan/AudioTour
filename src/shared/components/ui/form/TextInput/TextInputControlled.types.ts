import type {Control, FieldValues, Path} from 'react-hook-form'

import type {TextInputProps} from './TextInput.types'

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
