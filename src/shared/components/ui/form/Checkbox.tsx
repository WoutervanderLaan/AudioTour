import type React from 'react'
import {useState} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
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
export type CheckboxProps = Omit<PressableProps, 'onPress'> & {
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
 * CheckIcon
 * Renders the check mark icon inside the checkbox
 */
const CheckIcon = (): React.JSX.Element => (
  <View style={styles.checkIcon}>
    <View style={styles.checkIconLine1} />
    <View style={styles.checkIconLine2} />
  </View>
)

/**
 * Checkbox
 * Accessible checkbox component with theme integration and form validation support.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * Features:
 * - Accessible labels and error messages
 * - Focus state management
 * - Theme-based styling
 * - Error state visualization
 * - Helper text support
 * - Required field indicator
 * - Keyboard accessible
 */
/* eslint-disable complexity */
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
  onPressIn,
  onPressOut,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: CheckboxProps): React.JSX.Element => {
  const [isFocused, setIsFocused] = useState(false)

  /** Handles press events for the checkbox */
  const handlePress = (): void => {
    if (!disabled) {
      onChange?.(!checked)
    }
  }

  /** Handles press in events for the checkbox */
  const handlePressIn = (
    e: Parameters<NonNullable<typeof onPressIn>>[0],
  ): void => {
    setIsFocused(true)
    onPressIn?.(e)
  }

  /** Handles press out events for the checkbox */
  const handlePressOut = (
    e: Parameters<NonNullable<typeof onPressOut>>[0],
  ): void => {
    setIsFocused(false)
    onPressOut?.(e)
  }

  const hasError = Boolean(error)
  const helpText = error || hint
  const checkboxId = testID || 'checkbox'
  const labelId = `${checkboxId}-label`
  const helpTextId = `${checkboxId}-${hasError ? 'error' : 'hint'}`
  const a11yLabel = accessibilityLabel || label
  const a11yHint = accessibilityHint || hint

  const containerStyles = [styles.checkboxRow, style]

  const boxStyles = [
    styles.checkboxBox,
    checked && styles.checkboxBoxChecked,
    isFocused && styles.checkboxBoxFocused,
    hasError && styles.checkboxBoxError,
    disabled && styles.checkboxBoxDisabled,
  ]

  return (
    <View style={styles.container}>
      <Pressable
        testID={testID}
        nativeID={checkboxId}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
        <View style={boxStyles}>{checked ? <CheckIcon /> : null}</View>
        {Boolean(label) && (
          <CheckboxLabel
            label={label!}
            labelId={labelId}
            disabled={disabled}
            required={required}
          />
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
  checkboxBoxFocused: {
    borderWidth: 3,
    borderColor: theme.color.pressable.primary.default.background,
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
  checkIcon: {
    width: 14,
    height: 14,
    position: 'relative',
  },
  checkIconLine1: {
    position: 'absolute',
    width: 2,
    height: 8,
    bottom: 2,
    left: 3,
    backgroundColor: theme.color.pressable.primary.default.label,
    transform: [{rotate: '45deg'}],
  },
  checkIconLine2: {
    position: 'absolute',
    width: 2,
    height: 12,
    bottom: 0,
    right: 2,
    backgroundColor: theme.color.pressable.primary.default.label,
    transform: [{rotate: '-45deg'}],
  },
}))
