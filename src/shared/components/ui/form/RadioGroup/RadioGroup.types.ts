import type {TestProps} from '@/shared/types/TestProps'

/**
 * RadioOption
 * Type definition for a single radio option
 */
export type RadioOption<T extends string = string> = {
  /**
   * value - Unique identifier for the option
   */
  value: T
  /**
   * label - Display text for the option
   */
  label: string
  /**
   * description - Optional description text
   */
  description?: string
  /**
   * disabled - Whether this option is disabled
   */
  disabled?: boolean
}

/**
 * RadioGroupProps
 * Props for the RadioGroup component
 */
export type RadioGroupProps<T extends string = string> =
  TestProps<'RadioGroup'> & {
    /**
     * options - Array of options to display
     */
    options: RadioOption<T>[]
    /**
     * value - Currently selected value
     */
    value?: T
    /**
     * onChange - Callback when selection changes
     */
    onChange?: (value: T) => void
    /**
     * disabled - Whether the entire group is disabled
     */
    disabled?: boolean
    /**
     * hasError - Whether there is an error (for styling)
     */
    hasError?: boolean
  }
