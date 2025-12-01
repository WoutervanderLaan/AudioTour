import type React from 'react'
import {useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
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
  const {theme} = useUnistyles()
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: Parameters<NonNullable<typeof onFocus>>[0]): void => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: Parameters<NonNullable<typeof onBlur>>[0]): void => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const hasError = !!error
  const helpText = error || hint

  // Generate unique IDs for accessibility
  const inputId = testID || 'text-input'
  const labelId = `${inputId}-label`
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Label
            nativeID={labelId}
            color={disabled ? 'secondary' : 'default'}
            accessibilityRole="text">
            {label}
            {required && (
              <Label
                color="warning"
                accessibilityLabel="required">
                {' '}
                *
              </Label>
            )}
          </Label>
        </View>
      )}
      <RNTextInput
        testID={testID}
        nativeID={inputId}
        editable={!disabled}
        style={[
          styles.input(theme),
          isFocused && styles.inputFocused(theme),
          hasError && styles.inputError(theme),
          disabled && styles.inputDisabled(theme),
          style,
        ]}
        placeholderTextColor={theme.color.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessible={true}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint || hint}
        accessibilityState={{
          disabled,
        }}
        accessibilityLabelledBy={label ? labelId : undefined}
        accessibilityDescribedBy={helpText ? (hasError ? errorId : hintId) : undefined}
        accessibilityInvalid={hasError}
        accessibilityRequired={required}
        {...rest}
      />
      {helpText && (
        <View style={styles.helpTextContainer}>
          <Label
            nativeID={hasError ? errorId : hintId}
            color={hasError ? 'warning' : 'secondary'}
            accessibilityRole="text"
            accessibilityLiveRegion={hasError ? 'polite' : 'off'}>
            {helpText}
          </Label>
        </View>
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
  input: (currentTheme: typeof theme): object => ({
    backgroundColor: currentTheme.color.textInput.container.background,
    borderWidth: 1,
    borderColor: currentTheme.color.text.tertiary,
    borderRadius: theme.size.sm,
    paddingVertical: theme.size.smd,
    paddingHorizontal: theme.size.md,
    fontSize: currentTheme.text.fontSize.body,
    fontFamily: currentTheme.text.fontFamily.regular,
    color: currentTheme.color.text.default,
    includeFontPadding: false,
    textAlignVertical: 'center',
  }),
  inputFocused: (currentTheme: typeof theme): object => ({
    borderColor: currentTheme.color.pressable.primary.default.background,
    borderWidth: 2,
  }),
  inputError: (currentTheme: typeof theme): object => ({
    borderColor: currentTheme.color.text.warning,
  }),
  inputDisabled: (currentTheme: typeof theme): object => ({
    opacity: 0.5,
    backgroundColor: currentTheme.color.text.tertiary,
  }),
  helpTextContainer: {
    marginTop: theme.size.xs,
  },
}))
