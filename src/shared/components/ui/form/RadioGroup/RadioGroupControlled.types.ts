import type {Control, FieldValues, Path} from 'react-hook-form'

import type {RadioGroupProps} from './RadioGroup.types'

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
