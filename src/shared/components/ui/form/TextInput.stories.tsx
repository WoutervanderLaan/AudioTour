import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'

import {FormField} from './FormField'
import {TextInput} from './TextInput'
import {Column} from '../layout/Column'

const meta = {
  title: 'Form/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>

export default meta

/**
 * Story
 * Storybook story type for TextInput component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FormField
      label="Email"
      hint="Enter your email address">
      <TextInput placeholder="Enter your email" />
    </FormField>
  ),
}

export const WithValue: Story = {
  render: () => (
    <FormField label="Username">
      <TextInput
        placeholder="Enter username"
        value="john.doe"
      />
    </FormField>
  ),
}

export const Required: Story = {
  render: () => (
    <FormField
      label="Password"
      required={true}>
      <TextInput
        placeholder="Enter password"
        secureTextEntry={true}
      />
    </FormField>
  ),
}

export const WithHint: Story = {
  render: () => (
    <FormField
      label="Phone Number"
      hint="Enter your phone number with country code">
      <TextInput placeholder="+1 (555) 123-4567" />
    </FormField>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormField
      label="Email"
      error="Please enter a valid email address">
      <TextInput
        placeholder="Enter your email"
        value="invalid-email"
        hasError={true}
      />
    </FormField>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormField
      label="Disabled Field"
      disabled={true}>
      <TextInput
        placeholder="Cannot edit this"
        value="Read-only value"
        disabled={true}
      />
    </FormField>
  ),
}

export const Multiline: Story = {
  render: () => (
    <FormField label="Description">
      <TextInput
        placeholder="Enter a description"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
    </FormField>
  ),
}

export const NoLabel: Story = {
  render: () => (
    <TextInput
      placeholder="Search..."
      accessibilityLabel="Search input"
    />
  ),
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
    <FormField
      label="Email Address"
      error={error}
      hint={!error ? 'We will never share your email' : undefined}
      required={true}>
      <TextInput
        placeholder="you@example.com"
        value={value}
        onChangeText={handleChange}
        hasError={!!error}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
    </FormField>
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
    <Column gap="md">
      <FormField
        label="Default"
        hint="Default state">
        <TextInput placeholder="Default state" />
      </FormField>
      <FormField label="With Value">
        <TextInput value="Sample text" />
      </FormField>
      <FormField
        label="Required"
        required={true}>
        <TextInput placeholder="Required field" />
      </FormField>
      <FormField
        label="With Hint"
        hint="This is a helpful hint">
        <TextInput placeholder="Helpful input" />
      </FormField>
      <FormField
        label="With Error"
        error="This field has an error">
        <TextInput
          value="invalid"
          hasError={true}
        />
      </FormField>
      <FormField
        label="Disabled"
        disabled={true}>
        <TextInput
          value="Cannot edit"
          disabled={true}
        />
      </FormField>
    </Column>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
