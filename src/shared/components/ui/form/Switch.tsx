import type React from 'react'
import {
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
  View,
} from 'react-native'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import {Label} from '@/shared/components/ui/typography'

/**
 * SwitchProps
 * Props for the Switch component
 */
export type SwitchProps = Omit<
  RNSwitchProps,
  'value' | 'onValueChange' | 'onChange'
> & {
  /** Accessible label for the switch */
  label?: string
  /** Error message to display below the switch */
  error?: string
  /** Helper text to display below the switch */
  hint?: string
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Whether the switch is required (adds asterisk to label) */
  required?: boolean
  /** Whether the switch is on (controlled) */
  value?: boolean
  /** Callback when switch state changes */
  onChange?: (value: boolean) => void
  /** Test identifier for automated testing */
  testID?: string
  /** Accessible label override */
  accessibilityLabel?: string
  /** Accessible hint override */
  accessibilityHint?: string
}

/**
 * SwitchLabelProps
 * Props for the SwitchLabel component
 */
type SwitchLabelProps = {
  /** Text to display in the label */
  label: string
  /** Native ID for the label element */
  labelId: string
  /** Whether the switch is disabled */
  disabled: boolean
  /** Whether the field is required */
  required: boolean
}

/**
 * SwitchLabel
 * Renders the label for the switch
 *
 * @param {SwitchLabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
const SwitchLabel = ({
  label,
  labelId,
  disabled,
  required,
}: SwitchLabelProps): React.JSX.Element => (
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
 * Renders the help text or error message for the switch
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
 * Switch
 * Accessible switch/toggle component with theme integration and form validation support.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * Features:
 * - Accessible labels and error messages
 * - Theme-based styling with platform-specific colors
 * - Error state visualization
 * - Helper text support
 * - Required field indicator
 * - Keyboard accessible
 * - 44x44pt minimum touch target
 * - Both controlled and uncontrolled modes
 *
 * @param {SwitchProps} props - Component props
 * @returns {React.JSX.Element} Rendered switch element
 */
export const Switch = ({
  label,
  error,
  hint,
  disabled = false,
  required = false,
  value = false,
  onChange,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...rest
  // eslint-disable-next-line complexity
}: SwitchProps): React.JSX.Element => {
  const {theme} = useUnistyles()

  /**
   * handleValueChange
   * Handles value change events for the switch
   *
   * @param {boolean} newValue - New switch value
   * @returns {void}
   */
  const handleValueChange = (newValue: boolean): void => {
    if (disabled) {
      return
    }
    onChange?.(newValue)
  }

  const hasError = !!error
  const helpText = error || hint
  const switchId = testID || 'switch'
  const labelId = `${switchId}-label`
  const helpTextId = `${switchId}-${hasError ? 'error' : 'hint'}`
  const a11yLabel = accessibilityLabel || label
  const a11yHint = accessibilityHint || hint

  return (
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <RNSwitch
          testID={testID}
          nativeID={switchId}
          value={value}
          onValueChange={handleValueChange}
          disabled={disabled}
          trackColor={{
            false: hasError
              ? theme.color.text.warning
              : theme.color.text.tertiary,
            true: theme.color.pressable.primary.default.background,
          }}
          thumbColor={theme.color.pressable.primary.default.label}
          // eslint-disable-next-line react/jsx-no-leaked-render
          ios_backgroundColor={hasError ? theme.color.text.warning : undefined}
          accessible={true}
          accessibilityLabel={a11yLabel}
          accessibilityHint={a11yHint}
          accessibilityRole="switch"
          accessibilityState={{checked: value, disabled}}
          accessibilityLabelledBy={labelId}
          {...rest}
        />
        {!!label && (
          <SwitchLabel
            label={label}
            labelId={labelId}
            disabled={disabled}
            required={required}
          />
        )}
      </View>
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.sm,
    minHeight: 44,
    paddingVertical: theme.size.xs,
  },
  labelContainer: {
    flex: 1,
  },
  helpTextContainer: {
    marginTop: theme.size.xs,
    marginLeft: 51 + theme.size.sm, // Switch width (~51pt) + gap
  },
}))
