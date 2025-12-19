import type React from 'react'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * FormFieldProps
 * Props for the FormField component
 */
export type FormFieldProps = {
  /**
   * children - The form input element to wrap
   */
  children: React.ReactNode
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
   * testID - Test identifier for automated testing
   */
  testID?: string
  /**
   * renderLabel - Optional custom label renderer for complex labels
   */
  renderLabel?: (props: {
    label: string
    labelId?: string
    disabled: boolean
    required: boolean
  }) => React.ReactNode
}

/**
 * FormFieldLabelProps
 * Props for the FormFieldLabel component
 */
type FormFieldLabelProps = {
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
}

/**
 * FormFieldLabel
 * Renders the label for the form field
 *
 * @param {FormFieldLabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
const FormFieldLabel = ({
  label,
  labelId,
  disabled,
  required,
}: FormFieldLabelProps): React.JSX.Element => (
  <Row>
    <Text.Label
      nativeID={labelId}
      color={disabled ? 'secondary' : 'default'}
      accessibilityRole="text">
      {label}
      {!!required && (
        <Text.Label
          color="warning"
          accessibilityLabel="required">
          {' '}
          *
        </Text.Label>
      )}
    </Text.Label>
  </Row>
)

/**
 * FormFieldHelpTextProps
 * Props for the FormFieldHelpText component
 */
type FormFieldHelpTextProps = {
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
}

/**
 * FormFieldHelpText
 * Renders the help text or error message for the form field
 *
 * @param {FormFieldHelpTextProps} props - Component props
 * @returns {React.JSX.Element} Rendered help text element
 */
const FormFieldHelpText = ({
  text,
  helpTextId,
  hasError,
}: FormFieldHelpTextProps): React.JSX.Element => (
  <Text.Label
    nativeID={helpTextId}
    color={hasError ? 'warning' : 'secondary'}
    accessibilityRole="text"
    accessibilityLiveRegion={hasError ? 'polite' : 'none'}>
    {text}
  </Text.Label>
)

/**
 * FormField
 * Wrapper component that provides consistent label, error, and help text rendering
 * for form input components. This component separates the presentational wrapper
 * from the actual input logic, allowing form inputs to focus on their core functionality.
 *
 * Features:
 * - Accessible labels with required indicator
 * - Error state visualization
 * - Helper text support
 * - Disabled state support
 * - Flexible layout with configurable gap
 * - Custom label rendering support
 * - Follows WCAG 2.1 AA standards for accessibility
 *
 * Usage:
 * ```tsx
 * <FormField
 *   label="Email"
 *   error={errors.email?.message}
 *   hint="We'll never share your email"
 *   required
 * >
 *   <TextInput
 *     value={email}
 *     onChangeText={setEmail}
 *     placeholder="you@example.com"
 *   />
 * </FormField>
 * ```
 *
 * @param {FormFieldProps} props - Component props
 * @returns {React.JSX.Element} Rendered form field wrapper
 */
export const FormField = ({
  children,
  label,
  error,
  hint,
  disabled = false,
  required = false,
  labelId,
  helpTextId,
  gap = 'xs',
  testID,
  renderLabel,
}: FormFieldProps): React.JSX.Element => {
  const hasError = Boolean(error)
  const helpText = error || hint

  return (
    <Column
      gap={gap}
      alignItems="flex-start"
      testID={testID}>
      {!!label &&
        (renderLabel ? (
          renderLabel({label, labelId, disabled, required})
        ) : (
          <FormFieldLabel
            label={label}
            labelId={labelId}
            disabled={disabled}
            required={required}
          />
        ))}
      {children}
      {!!helpText && (
        <FormFieldHelpText
          text={helpText}
          helpTextId={helpTextId}
          hasError={hasError}
        />
      )}
    </Column>
  )
}
