import type {Control, FieldValues, Path} from 'react-hook-form'

import type {SwitchProps} from './Switch.types'

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
