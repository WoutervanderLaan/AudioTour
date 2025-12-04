import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Pressable, Text, View} from 'react-native'
import {z} from 'zod'

import {Switch} from './Switch'
import {SwitchControlled} from './SwitchControlled'

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Switch>

export default meta

/**
 * Story
 * Storybook story type for Switch component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
}

export const On: Story = {
  args: {
    label: 'Dark mode',
    value: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Accept terms and conditions',
    required: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Auto-save',
    hint: 'Automatically save your changes',
  },
}

export const WithError: Story = {
  args: {
    label: 'Enable location services',
    error: 'Location services are required for this feature',
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    label: 'This option is already enabled',
    value: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Toggle feature',
  },
}

/**
 * InteractiveExample
 * Interactive example demonstrating controlled switch with state
 *
 * @returns {React.JSX.Element} Interactive story component
 */
const InteractiveExample = (): React.JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [error, setError] = useState<string>()

  /**
   * handleChange
   * Handles switch state changes with validation
   *
   * @param {boolean} value - New switch state
   * @returns {void}
   */
  const handleChange = (value: boolean): void => {
    setIsEnabled(value)
    // Simple validation
    if (!value) {
      setError('This feature must be enabled to continue')
    } else {
      setError(undefined)
    }
  }

  return (
    <Switch
      label="Enable two-factor authentication"
      value={isEnabled}
      onChange={handleChange}
      error={error}
      hint={!error ? 'Recommended for account security' : undefined}
      required={true}
    />
  )
}

export const Interactive: Story = {
  render: (): React.JSX.Element => <InteractiveExample />,
}

/**
 * AllStatesExample
 * Displays all Switch states side by side
 *
 * @returns {React.JSX.Element} All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  return (
    <View style={{gap: 24}}>
      <Switch label="Default (off)" />
      <Switch
        label="On"
        value={true}
      />
      <Switch
        label="Required"
        required={true}
      />
      <Switch
        label="With Hint"
        hint="This is a helpful hint"
      />
      <Switch
        label="With Error"
        error="This field has an error"
      />
      <Switch
        label="Disabled (off)"
        disabled={true}
      />
      <Switch
        label="Disabled (on)"
        value={true}
        disabled={true}
      />
    </View>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}

/**
 * MultipleSwitchesExample
 * Example showing multiple switches working together for settings
 *
 * @returns {React.JSX.Element} Multiple switches example
 */
const MultipleSwitchesExample = (): React.JSX.Element => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
  })

  return (
    <View style={{gap: 16}}>
      <Switch
        label="Push notifications"
        value={settings.notifications}
        onChange={(value): void =>
          setSettings(prev => ({...prev, notifications: value}))
        }
        hint="Receive updates and alerts"
      />
      <Switch
        label="Dark mode"
        value={settings.darkMode}
        onChange={(value): void =>
          setSettings(prev => ({...prev, darkMode: value}))
        }
        hint="Use dark theme throughout the app"
      />
      <Switch
        label="Auto-save"
        value={settings.autoSave}
        onChange={(value): void =>
          setSettings(prev => ({...prev, autoSave: value}))
        }
        hint="Automatically save your changes"
      />
      <Switch
        label="Analytics"
        value={settings.analytics}
        onChange={(value): void =>
          setSettings(prev => ({...prev, analytics: value}))
        }
        hint="Help us improve by sharing usage data"
      />
    </View>
  )
}

export const MultipleSwitches: Story = {
  render: (): React.JSX.Element => <MultipleSwitchesExample />,
}

/**
 * SettingsFormSchema
 * Zod schema for settings form validation
 */
const SettingsFormSchema = z.object({
  notifications: z.boolean(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  darkMode: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions to continue',
  }),
})

/**
 * SettingsFormData
 * Type inferred from the Zod schema
 */
type SettingsFormData = z.infer<typeof SettingsFormSchema>

/**
 * ReactHookFormExample
 * Demonstrates SwitchControlled integration with react-hook-form and Zod validation
 *
 * @returns {React.JSX.Element} Form example component
 */
const ReactHookFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<SettingsFormData>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      notifications: true,
      emailNotifications: false,
      pushNotifications: true,
      darkMode: false,
      termsAccepted: false,
    },
  })

  const [submittedData, setSubmittedData] = useState<SettingsFormData | null>(
    null,
  )

  /**
   * onSubmit
   * Handles form submission
   *
   * @param {SettingsFormData} data - Form data
   * @returns {void}
   */
  const onSubmit = (data: SettingsFormData): void => {
    setSubmittedData(data)
  }

  return (
    <View style={{gap: 16}}>
      <SwitchControlled
        control={control}
        name="notifications"
        label="Enable notifications"
        hint="Master toggle for all notifications"
      />
      <SwitchControlled
        control={control}
        name="emailNotifications"
        label="Email notifications"
        hint="Receive updates via email"
      />
      <SwitchControlled
        control={control}
        name="pushNotifications"
        label="Push notifications"
        hint="Receive push notifications on your device"
      />
      <SwitchControlled
        control={control}
        name="darkMode"
        label="Dark mode"
        hint="Use dark theme throughout the app"
      />
      <SwitchControlled
        control={control}
        name="termsAccepted"
        label="I accept the terms and conditions"
        required={true}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: '#007AFF',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 8,
        }}>
        <Text style={{color: 'white', fontWeight: '600'}}>Save Settings</Text>
      </Pressable>
      {submittedData ? (
        <View
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
          }}>
          <Text style={{fontWeight: '600', marginBottom: 8}}>
            Submitted Data:
          </Text>
          <Text>{JSON.stringify(submittedData, null, 2)}</Text>
        </View>
      ) : null}
      {formState.errors ? (
        <View style={{marginTop: 8}}>
          <Text style={{color: 'red'}}>
            Errors: {JSON.stringify(formState.errors, null, 2)}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export const ReactHookFormIntegration: Story = {
  render: (): React.JSX.Element => <ReactHookFormExample />,
}
