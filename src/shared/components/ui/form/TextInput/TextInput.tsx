import type React from 'react'
import {useState} from 'react'
import {TextInput as RNTextInput} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import type {TextInputProps} from './TextInput.types'

export type {TextInputProps} from './TextInput.types'

/**
 * TextInput
 * Pure accessible text input component with theme integration and focus state management.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * This is a pure input component that should be wrapped with FormField for label,
 * error, and help text functionality.
 *
 * Features:
 * - Focus state management
 * - Theme-based styling
 * - Error state visualization
 * - Disabled state support
 * - Accessible with proper ARIA attributes
 *
 * Usage with FormField:
 * ```tsx
 * <FormField
 *   label="Email"
 *   error={errors.email}
 *   hint="Enter your email address"
 * >
 *   <TextInput
 *     value={email}
 *     onChangeText={setEmail}
 *     placeholder="you@example.com"
 *   />
 * </FormField>
 * ```
 *
 * @param {TextInputProps} props - Component props
 * @returns {React.JSX.Element} Rendered text input element
 */
export const TextInput = ({
  disabled = false,
  hasError = false,
  testID,
  inputId,
  labelId,
  style,
  onFocus,
  onBlur,
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

  const editable = !disabled
  const nativeId = inputId || testID || 'text-input'

  const inputStyles = [
    styles.input,
    isFocused && styles.focused,
    hasError && styles.error,
    disabled && styles.disabled,
    style,
  ]

  return (
    <RNTextInput
      testID={testID}
      nativeID={nativeId}
      editable={editable}
      style={inputStyles}
      placeholderTextColor={theme.color.text.tertiary}
      onFocus={handleFocus}
      onBlur={handleBlur}
      accessible={true}
      accessibilityState={{disabled}}
      accessibilityLabelledBy={labelId}
      {...rest}
    />
  )
}

const styles = StyleSheet.create(theme => ({
  input: {
    // backgroundColor: theme.color.textInput.container.background,
    paddingHorizontal: theme.size.md,
    paddingVertical: theme.size.smd,
    fontFamily: theme.text.fontFamily.regular,
    color: theme.color.text.default,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...theme.styles.border.sharp,
  },
  focused: {
    // borderColor: theme.color.textInput.border,
  },
  error: {
    borderColor: theme.color.text.warning,
  },
  disabled: {
    opacity: theme.opacity.disabled,
  },
}))
