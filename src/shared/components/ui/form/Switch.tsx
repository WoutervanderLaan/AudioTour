import type React from 'react'
import {
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * SwitchProps
 * Props for the Switch component
 */
export type SwitchProps = Omit<
  RNSwitchProps,
  'value' | 'onValueChange' | 'onChange' | 'testID'
> &
  TestProps<'Switch'> & {
    /** Accessible label for the switch */
    label?: string
    /** Whether the switch is disabled */
    disabled?: boolean
    /** Whether the switch is required (adds asterisk to label) */
    required?: boolean
    /** Whether the switch has an error (for styling) */
    hasError?: boolean
    /** Whether the switch is on (controlled) */
    value?: boolean
    /** Callback when switch state changes */
    onChange?: (value: boolean) => void
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
  /**
   * testID
   */
  testID: SwitchProps['testID']
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
  testID,
}: SwitchLabelProps): React.JSX.Element => (
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
 * Switch
 * Pure accessible switch/toggle component with theme integration.
 * Follows WCAG 2.1 AA standards for accessibility.
 * This component renders a switch with an inline label. Wrap with FormField for error/help text.
 *
 * Features:
 * - Accessible inline label
 * - Theme-based styling with platform-specific colors
 * - Error state visualization
 * - Required field indicator
 * - Keyboard accessible
 * - 44x44pt minimum touch target
 * - Both controlled and uncontrolled modes
 *
 * Usage with FormField:
 * ```tsx
 * <FormField
 *   error={errors.notifications}
 *   hint="Get notified when someone mentions you"
 * >
 *   <Switch
 *     label="Enable notifications"
 *     value={notificationsEnabled}
 *     onChange={setNotificationsEnabled}
 *   />
 * </FormField>
 * ```
 *
 * @param {SwitchProps} props - Component props
 * @returns {React.JSX.Element} Rendered switch element
 */
export const Switch = ({
  label,
  disabled = false,
  required = false,
  hasError = false,
  value = false,
  onChange,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...rest
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

  const switchId = testID || 'switch'
  const labelId = `${switchId}-label`
  const a11yLabel = accessibilityLabel || label

  return (
    <Row
      testID={`${testID}ContainerRow`}
      alignItems="center"
      gap="sm">
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
        accessibilityHint={accessibilityHint}
        accessibilityRole="switch"
        accessibilityState={{checked: value, disabled}}
        accessibilityLabelledBy={labelId}
        {...rest}
      />
      {!!label && (
        <SwitchLabel
          testID={testID}
          label={label}
          labelId={labelId}
          disabled={disabled}
          required={required}
        />
      )}
    </Row>
  )
}
