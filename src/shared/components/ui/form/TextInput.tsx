import type React from 'react'
import {useState} from 'react'
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  View,
} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {Label} from '@/shared/components/ui/typography'

/**
 * TextInputProps
 * Props for the TextInput component
 */
export type TextInputProps = Omit<RNTextInputProps, 'editable'> & {
  /**
   * label - Accessible label for the input field
   */
  label?: string
  /**
   * error - Error message to display below the input
   */
  error?: string
  /**
   * hint - Helper text to display below the input
   */
  hint?: string
  /**
   * disabled - Whether the input is disabled
   */
  disabled?: boolean
  /**
   * required - Whether the input is required (adds asterisk to label)
   */
  required?: boolean
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
}

/**
 * InputLabelProps
 * Props for the InputLabel component
 */
type InputLabelProps = {
  /**
   * label - Text to display in the label
   */
  label: string
  /**
   * labelId - Native ID for the label element
   */
  labelId: string
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
 * InputLabel
 * Renders the label for the text input
 *
 * @param {InputLabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
const InputLabel = ({
  label,
  labelId,
  disabled,
  required,
}: InputLabelProps): React.JSX.Element => (
  <View style={styles.labelContainer}>
    <Label
      nativeID={labelId}
      color={disabled ? 'secondary' : 'default'}
      accessibilityRole="text">
      {label}
      {!!required && (
        <Label
          color="warning"
          accessibilityLabel="required">
          {' '}
          *
        </Label>
      )}
    </Label>
  </View>
)

/**
 * HelpTextProps
 * Props for the HelpText component
 */
type HelpTextProps = {
  /**
   * text - The help text or error message to display
   */
  text: string
  /**
   * helpTextId - Native ID for the help text element
   */
  helpTextId: string
  /**
   * hasError - Whether this is an error message
   */
  hasError: boolean
}

/**
 * HelpText
 * Renders the help text or error message for the text input
 *
 * @param {HelpTextProps} props - Component props
 * @returns {React.JSX.Element} Rendered help text element
 */
const HelpText = ({
  text,
  helpTextId,
  hasError,
}: HelpTextProps): React.JSX.Element => (
  <View style={styles.helpTextContainer}>
    <Label
      nativeID={helpTextId}
      color={hasError ? 'warning' : 'secondary'}
      accessibilityRole="text"
      accessibilityLiveRegion={hasError ? 'polite' : 'none'}>
      {text}
    </Label>
  </View>
)

/**
 * TextInput
 * Accessible text input component with theme integration and form validation support.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * Features:
 * - Accessible labels and error messages
 * - Focus state management
 * - Theme-based styling
 * - Error state visualization
 * - Helper text support
 * - Required field indicator
 *
 * @param {TextInputProps} props - Component props
 * @returns {React.JSX.Element} Rendered text input element
 */
/* eslint-disable complexity */
export const TextInput = ({
  label,
  error,
  hint,
  disabled = false,
  required = false,
  testID,
  style,
  onFocus,
  onBlur,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: TextInputProps): React.JSX.Element => {
  const [isFocused, setIsFocused] = useState(false)
  const {theme} = useUnistyles()

  /**
   * handleFocus
   * Handles focus events for the text input
   *
   * @param {Parameters<NonNullable<typeof onFocus>>[0]} e - Focus event
   * @returns {void}
   */
  const handleFocus = (e: Parameters<NonNullable<typeof onFocus>>[0]): void => {
    setIsFocused(true)
    onFocus?.(e)
  }

  /**
   * handleBlur
   * Handles blur events for the text input
   *
   * @param {Parameters<NonNullable<typeof onBlur>>[0]} e - Blur event
   * @returns {void}
   */
  const handleBlur = (e: Parameters<NonNullable<typeof onBlur>>[0]): void => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const hasError = Boolean(error)
  const helpText = error || hint
  const inputId = testID || 'text-input'
  const labelId = `${inputId}-label`
  const helpTextId = `${inputId}-${hasError ? 'error' : 'hint'}`
  const a11yLabel = accessibilityLabel || label
  const a11yHint = accessibilityHint || hint
  const editable = !disabled

  const inputStyles = [
    styles.input,
    isFocused && styles.inputFocused,
    hasError && styles.inputError,
    disabled && styles.inputDisabled,
    style,
  ]

  return (
    <View style={styles.container}>
      {!!label && (
        <InputLabel
          label={label}
          labelId={labelId}
          disabled={disabled}
          required={required}
        />
      )}
      <RNTextInput
        testID={testID}
        nativeID={inputId}
        editable={editable}
        style={inputStyles}
        placeholderTextColor={theme.color.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessible={true}
        accessibilityLabel={a11yLabel}
        accessibilityHint={a11yHint}
        accessibilityState={{disabled}}
        accessibilityLabelledBy={labelId}
        {...rest}
      />
      {!!helpText && (
        <HelpText
          text={helpText}
          helpTextId={helpTextId}
          hasError={hasError}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: theme.size.xs,
  },
  input: {
    backgroundColor: theme.color.textInput.container.background,
    borderWidth: 1,
    borderColor: theme.color.text.tertiary,
    borderRadius: theme.size.sm,
    paddingVertical: theme.size.smd,
    paddingHorizontal: theme.size.md,
    fontSize: theme.text.fontSize.body,
    fontFamily: theme.text.fontFamily.regular,
    color: theme.color.text.default,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  inputFocused: {
    borderColor: theme.color.pressable.primary.default.background,
    borderWidth: 2,
  },
  inputError: {
    borderColor: theme.color.text.warning,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: theme.color.text.tertiary,
  },
  helpTextContainer: {
    marginTop: theme.size.xs,
  },
}))
