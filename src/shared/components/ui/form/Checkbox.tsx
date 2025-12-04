import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {CheckboxPressable} from '@/shared/components/ui/pressable'
import {Label} from '@/shared/components/ui/typography'

/**
 * CHECKBOX_SIZE
 * Size of the checkbox box in points
 */
const CHECKBOX_SIZE = 24

/**
 * CheckboxProps
 * Props for the Checkbox component
 */
export type CheckboxProps = {
  /** Accessible label for the checkbox */
  label?: string
  /** Error message to display below the checkbox */
  error?: string
  /** Helper text to display below the checkbox */
  hint?: string
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Whether the checkbox is required (adds asterisk to label) */
  required?: boolean
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void
  /** Test identifier for automated testing */
  testID?: string
  /** Accessible label override */
  accessibilityLabel?: string
  /** Accessible hint override */
  accessibilityHint?: string
}

/**
 * CheckboxLabelProps
 * Props for the CheckboxLabel component
 */
type CheckboxLabelProps = {
  /** Text to display in the label */
  label: string
  /** Native ID for the label element */
  labelId: string
  /** Whether the checkbox is disabled */
  disabled: boolean
  /** Whether the field is required */
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
  <Box flex={1}>
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
  </Box>
)

/**
 * HelpTextProps
 * Props for the HelpText component
 */
type HelpTextProps = {
  /** The help text or error message to display */
  text: string
  /** Native ID for the help text element */
  helpTextId: string
  /** Whether this is an error message */
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
  <Box>
    <Label
      nativeID={helpTextId}
      color={hasError ? 'warning' : 'secondary'}
      accessibilityRole="text"
      accessibilityLiveRegion={hasError ? 'polite' : 'none'}>
      {text}
    </Label>
  </Box>
)

/**
 * CheckIndicator
 * Renders the check indicator inside the checkbox when checked.
 * Uses a simple filled rounded square for clear visual indication.
 *
 * @returns {React.JSX.Element} Rendered check indicator element
 */
const CheckIndicator = (): React.JSX.Element => (
  <Box style={styles.checkIndicator} />
)

/**
 * CheckboxBox
 * Renders the checkbox box with appropriate styling
 *
 * @param {object} props - Component props
 * @param {string} props.checkboxId - ID for the checkbox element
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {boolean} props.hasError - Whether there is an error
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @returns {React.JSX.Element} Rendered checkbox box
 */
const CheckboxBox = ({
  checkboxId,
  checked,
  hasError,
  disabled,
}: {
  checkboxId: string
  checked: boolean
  hasError: boolean
  disabled: boolean
}): React.JSX.Element => (
  <Box
    nativeID={checkboxId}
    style={[
      styles.checkboxBox,
      checked && styles.checkboxBoxChecked,
      hasError && styles.checkboxBoxError,
      disabled && styles.checkboxBoxDisabled,
    ]}>
    {!!checked && <CheckIndicator />}
  </Box>
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
  accessibilityLabel,
  accessibilityHint,
}: CheckboxProps): React.JSX.Element => {
  /**
   * handlePress
   * Handles press events for the checkbox
   */
  const handlePress = (): void => {
    if (disabled) {
      return
    }
    onChange?.(!checked)
  }

  const hasError = !!error
  const helpText = error || hint
  const checkboxId = testID || 'checkbox'
  const labelId = `${checkboxId}-label`
  const helpTextId = `${checkboxId}-${hasError ? 'error' : 'hint'}`

  return (
    <Column>
      <CheckboxPressable
        testID={testID}
        onPress={handlePress}
        disabled={disabled}
        style={({pressed}) => [
          styles.checkboxRow,
          pressed && styles.checkboxRowPressed,
        ]}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint || hint}
        accessibilityState={{checked, disabled}}
        accessibilityLabelledBy={labelId}>
        <CheckboxBox
          checkboxId={checkboxId}
          checked={checked}
          hasError={hasError}
          disabled={disabled}
        />
        {!!label && (
          <CheckboxLabel
            label={label}
            labelId={labelId}
            disabled={disabled}
            required={required}
          />
        )}
      </CheckboxPressable>
      {!!helpText && (
        <HelpText
          text={helpText}
          helpTextId={helpTextId}
          hasError={hasError}
        />
      )}
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.sm,
    minHeight: 44,
    paddingVertical: theme.size.xs,
  },
  checkboxRowPressed: {
    opacity: 0.7,
  },
  checkboxBox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
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
  checkboxBoxError: {
    borderColor: theme.color.text.warning,
  },
  checkboxBoxDisabled: {
    opacity: 0.5,
  },

  // helpTextContainer: {
  //   marginTop: theme.size.xs,
  //   marginLeft: CHECKBOX_SIZE + theme.size.sm,
  // },
  checkIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: theme.color.pressable.primary.default.label,
  },
}))
