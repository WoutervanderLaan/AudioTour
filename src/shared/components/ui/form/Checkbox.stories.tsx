import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'

import {Checkbox} from './Checkbox'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta

/**
 * Story
 * Storybook story type for Checkbox component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Enable notifications',
    hint: 'You will receive updates about your orders',
  },
}

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'This option is already selected',
    checked: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Select item',
  },
}

/**
 * InteractiveExample
 * Interactive example demonstrating controlled checkbox with state
 *
 * @returns {React.JSX.Element} Interactive story component
 */
const InteractiveExample = (): React.JSX.Element => {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState<string>()

  /**
   * handleChange
   * Handles checkbox state changes with validation
   *
   * @param {boolean} value - New checked state
   * @returns {void}
   */
  const handleChange = (value: boolean): void => {
    setChecked(value)
    // Simple validation
    if (!value) {
      setError('You must accept the terms to continue')
    } else {
      setError(undefined)
    }
  }

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={checked}
      onChange={handleChange}
      error={error}
      hint={!error ? 'Please read the terms carefully' : undefined}
      required={true}
    />
  )
}

export const Interactive: Story = {
  render: (): React.JSX.Element => <InteractiveExample />,
}

/**
 * AllStatesExample
 * Displays all Checkbox states side by side
 *
 * @returns {React.JSX.Element} All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  return (
    <View style={{gap: 24}}>
      <Checkbox label="Default (unchecked)" />
      <Checkbox
        label="Checked"
        checked={true}
      />
      <Checkbox
        label="Required"
        required={true}
      />
      <Checkbox
        label="With Hint"
        hint="This is a helpful hint"
      />
      <Checkbox
        label="With Error"
        error="This field has an error"
      />
      <Checkbox
        label="Disabled (unchecked)"
        disabled={true}
      />
      <Checkbox
        label="Disabled (checked)"
        checked={true}
        disabled={true}
      />
    </View>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}

/**
 * MultipleCheckboxesExample
 * Example showing multiple checkboxes working together
 *
 * @returns {React.JSX.Element} Multiple checkboxes example
 */
const MultipleCheckboxesExample = (): React.JSX.Element => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: false,
  })

  return (
    <View style={{gap: 16}}>
      <Checkbox
        label="Email notifications"
        checked={preferences.email}
        onChange={(checked): void =>
          setPreferences(prev => ({...prev, email: checked}))
        }
        hint="Receive updates via email"
      />
      <Checkbox
        label="SMS notifications"
        checked={preferences.sms}
        onChange={(checked): void =>
          setPreferences(prev => ({...prev, sms: checked}))
        }
        hint="Receive updates via SMS"
      />
      <Checkbox
        label="Push notifications"
        checked={preferences.push}
        onChange={(checked): void =>
          setPreferences(prev => ({...prev, push: checked}))
        }
        hint="Receive updates via push notifications"
      />
    </View>
  )
}

export const MultipleCheckboxes: Story = {
  render: (): React.JSX.Element => <MultipleCheckboxesExample />,
}
