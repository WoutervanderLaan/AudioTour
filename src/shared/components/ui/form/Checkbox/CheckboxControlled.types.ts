import type {Control, FieldValues, Path} from 'react-hook-form'

import type {CheckboxProps} from './Checkbox.types'

/**
 * CheckboxControlledProps
 * Props for the CheckboxControlled component
 */
export type CheckboxControlledProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'onChange'
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
  /**
   * checkboxLabel
   */
  checkboxLabel?: string
}
