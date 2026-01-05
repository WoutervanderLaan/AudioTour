import type {ReactNode} from 'react'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * FormFieldProps
 * Props for the FormField component
 */
export type FormFieldProps = TestProps<'FormField'> & {
  /**
   * children - The form input element to wrap
   */
  children: ReactNode
  /**
   * label - Label text for the input field
   */
  label?: string
  /**
   * error - Error message to display
   */
  error?: string
  /**
   * hint - Helper text to display when no error
   */
  hint?: string
  /**
   * disabled - Whether the field is disabled
   */
  disabled?: boolean
  /**
   * required - Whether the field is required (adds asterisk to label)
   */
  required?: boolean
  /**
   * labelId - Native ID for the label element
   */
  labelId?: string
  /**
   * helpTextId - Native ID for the help text element
   */
  helpTextId?: string
  /**
   * gap - Gap between label, input, and help text (default: 'xs')
   */
  gap?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * renderLabel - Optional custom label renderer for complex labels
   */
  renderLabel?: (props: {
    label: string
    labelId?: string
    disabled: boolean
    required: boolean
  }) => ReactNode
}

/**
 * FormFieldLabelProps
 * Props for the FormFieldLabel component
 */
export type FormFieldLabelProps = {
  /**
   * label - Text to display in the label
   */
  label: string
  /**
   * labelId - Native ID for the label element
   */
  labelId?: string
  /**
   * disabled - Whether the input is disabled
   */
  disabled: boolean
  /**
   * required - Whether the field is required
   */
  required: boolean
  /**
   * testID - Test ID for the label
   */
  testID?: string
}

/**
 * FormFieldHelpTextProps
 * Props for the FormFieldHelpText component
 */
export type FormFieldHelpTextProps = {
  /**
   * text - The help text or error message to display
   */
  text: string
  /**
   * helpTextId - Native ID for the help text element
   */
  helpTextId?: string
  /**
   * hasError - Whether this is an error message
   */
  hasError: boolean
  /**
   * testID - Test ID for the help text
   */
  testID?: string
}
