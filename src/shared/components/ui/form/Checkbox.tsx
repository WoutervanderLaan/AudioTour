import type React from 'react'
import {
  // eslint-disable-next-line no-restricted-imports -- Checkbox is a base form control component
  Pressable,
  type PressableProps,
  View,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Label} from '@/shared/components/ui/typography'

/**
 * CheckboxProps
 * Props for the Checkbox component
 */
export type CheckboxProps = Omit<PressableProps, 'onPress' | 'children'> & {
  /**
   * label - Accessible label for the checkbox
   */
  label?: string
  /**
   * error - Error message to display below the checkbox
   */
  error?: string
  /**
   * hint - Helper text to display below the checkbox
   */
  hint?: string
  /**
   * disabled - Whether the checkbox is disabled
   */
  disabled?: boolean
  /**
   * required - Whether the checkbox is required (adds asterisk to label)
   */
  required?: boolean
  /**
   * checked - Whether the checkbox is checked
   */
  checked?: boolean
  /**
   * onChange - Callback when checkbox state changes
   */
  onChange?: (checked: boolean) => void
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
}

/**
 * CheckboxLabelProps
 * Props for the CheckboxLabel component
 */
type CheckboxLabelProps = {
  /**
   * label - Text to display in the label
   */
  label: string
  /**
   * labelId - Native ID for the label element
   */
  labelId: string
  /**
   * disabled - Whether the checkbox is disabled
   */
  disabled: boolean
  /**
   * required - Whether the field is required
   */
  required: boolean
}

/**
 * CheckboxLabel
 * Renders the label for the checkbox
 *
 * @param {CheckboxLabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
const CheckboxLabel = ({
  label,
  labelId,
  disabled,
  required,
}: CheckboxLabelProps): React.JSX.Element => (
  <View style={styles.labelContainer}>
    <Label
      nativeID={labelId}
      color={disabled ? 'secondary' : 'default'}
      accessibilityRole="text">
      {label}
      {Boolean(required) && (
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
 * Renders the help text or error message for the checkbox
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
 * CheckIndicator
 * Renders the check indicator inside the checkbox when checked.
 * Uses a simple filled rounded square for clear visual indication.
 *
 * @returns {React.JSX.Element} Rendered check indicator element
 */
const CheckIndicator = (): React.JSX.Element => (
  <View style={styles.checkIndicator} />
)

/**
 * Checkbox
 * Accessible checkbox component with theme integration and form validation support.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * Features:
 * - Accessible labels and error messages
 * - Pressed state visual feedback
 * - Theme-based styling
 * - Error state visualization
 * - Helper text support
 * - Required field indicator
 * - Keyboard accessible
 * - 44x44pt minimum touch target
 *
 * @param {CheckboxProps} props - Component props
 * @returns {React.JSX.Element} Rendered checkbox element
 */
export const Checkbox = ({
  label,
  error,
  hint,
  disabled = false,
  required = false,
  checked = false,
  onChange,
  testID,
  style,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: CheckboxProps): React.JSX.Element => {
  /**
   * handlePress
   * Handles press events for the checkbox
   *
   * @returns {void}
   */
  const handlePress = (): void => {
    if (!disabled) {
      onChange?.(!checked)
    }
  }

  const hasError = Boolean(error)
  const helpText = error || hint
  const checkboxId = testID || 'checkbox'
  const labelId = `${checkboxId}-label`
  const helpTextId = `${checkboxId}-${hasError ? 'error' : 'hint'}`
  const a11yLabel = accessibilityLabel || label
  const a11yHint = accessibilityHint || hint

  const containerStyles = [styles.checkboxRow, style]

  return (
    <View style={styles.container}>
      <Pressable
        testID={testID}
        nativeID={checkboxId}
        onPress={handlePress}
        disabled={disabled}
        style={containerStyles}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityLabel={a11yLabel}
        accessibilityHint={a11yHint}
        accessibilityState={{
          checked,
          disabled,
        }}
        accessibilityLabelledBy={labelId}
        {...rest}>
        {({pressed}) => (
          <>
            <View
              style={[
                styles.checkboxBox,
                checked && styles.checkboxBoxChecked,
                hasError && styles.checkboxBoxError,
                disabled && styles.checkboxBoxDisabled,
                pressed && styles.checkboxBoxPressed,
              ]}>
              {checked ? <CheckIndicator /> : null}
            </View>
            {Boolean(label) && (
              <CheckboxLabel
                label={label!}
                labelId={labelId}
                disabled={disabled}
                required={required}
              />
            )}
          </>
        )}
      </Pressable>
      {Boolean(helpText) && (
        <HelpText
          text={helpText!}
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.sm,
    minHeight: 44,
    paddingVertical: theme.size.xs,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.color.text.tertiary,
    borderRadius: theme.size.xs,
    backgroundColor: theme.color.textInput.container.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: theme.color.pressable.primary.default.background,
    borderColor: theme.color.pressable.primary.default.background,
  },
  checkboxBoxPressed: {
    opacity: 0.7,
  },
  checkboxBoxError: {
    borderColor: theme.color.text.warning,
  },
  checkboxBoxDisabled: {
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
  },
  helpTextContainer: {
    marginTop: theme.size.xs,
    marginLeft: 24 + theme.size.sm,
  },
  checkIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: theme.color.pressable.primary.default.label,
  },
}))
