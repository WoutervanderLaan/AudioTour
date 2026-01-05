import type React from 'react'

import type {
  FormFieldHelpTextProps,
  FormFieldLabelProps,
  FormFieldProps,
} from './FormField.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

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
  testID,
}: FormFieldLabelProps): React.JSX.Element => (
  <Row testID={`${testID}LabelRow`}>
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
  </Row>
)

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
  testID,
}: FormFieldHelpTextProps): React.JSX.Element => (
  <Text.Label
    testID={`${testID}HelpText`}
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
      testID={`${testID}Container`}>
      {!!label &&
        (renderLabel ? (
          renderLabel({label, labelId, disabled, required})
        ) : (
          <FormFieldLabel
            label={label}
            labelId={labelId}
            disabled={disabled}
            required={required}
            testID={testID}
          />
        ))}
      {children}
      {!!helpText && (
        <FormFieldHelpText
          text={helpText}
          helpTextId={helpTextId}
          hasError={hasError}
          testID={testID}
        />
      )}
    </Column>
  )
}
