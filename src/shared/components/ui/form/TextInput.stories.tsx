import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'

import {TextInput} from './TextInput'

const meta = {
  title: 'Form/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TextInput>

export default meta

/**
 * Story
 * Storybook story type for TextInput component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    value: 'john.doe',
  },
}

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
    secureTextEntry: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    hint: 'Enter your phone number with country code',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit this',
    value: 'Read-only value',
    disabled: true,
  },
}

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    multiline: true,
    numberOfLines: 4,
    textAlignVertical: 'top',
  },
}

export const NoLabel: Story = {
  args: {
    placeholder: 'Search...',
    accessibilityLabel: 'Search input',
  },
}

/**
 * InteractiveExample
 * Interactive example demonstrating controlled input with validation
 *
 * @returns {React.JSX.Element} Interactive story component
 */
const InteractiveExample = (): React.JSX.Element => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()

  const handleChange = (text: string): void => {
    setValue(text)
    // Simple email validation
    if (text && !text.includes('@')) {
      setError('Email must contain @')
    } else {
      setError(undefined)
    }
  }

  return (
    <TextInput
      label="Email Address"
      placeholder="you@example.com"
      value={value}
      onChangeText={handleChange}
      error={error}
      hint={!error ? 'We will never share your email' : undefined}
      required={true}
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
    />
  )
}

export const Interactive: Story = {
  render: (): React.JSX.Element => <InteractiveExample />,
}

/**
 * AllStatesExample
 * Displays all TextInput states side by side
 *
 * @returns {React.JSX.Element} All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  return (
    <View style={{gap: 24}}>
      <TextInput
        label="Default"
        placeholder="Default state"
      />
      <TextInput
        label="With Value"
        value="Sample text"
      />
      <TextInput
        label="Required"
        placeholder="Required field"
        required={true}
      />
      <TextInput
        label="With Hint"
        placeholder="Helpful input"
        hint="This is a helpful hint"
      />
      <TextInput
        label="With Error"
        value="invalid"
        error="This field has an error"
      />
      <TextInput
        label="Disabled"
        value="Cannot edit"
        disabled={true}
      />
    </View>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
