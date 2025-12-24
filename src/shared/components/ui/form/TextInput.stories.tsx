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

export const Default = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Email"
      hint="Enter your email address">
      <TextInput
        testID="StoryTextInput"
        placeholder="Enter your email"
      />
    </FormField>
  ),
}

export const WithValue = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Username">
      <TextInput
        testID="StoryTextInput"
        placeholder="Enter username"
        value="john.doe"
      />
    </FormField>
  ),
}

export const Required = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Password"
      required={true}>
      <TextInput
        testID="StoryTextInput"
        placeholder="Enter password"
        secureTextEntry={true}
      />
    </FormField>
  ),
}

export const WithHint = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Phone Number"
      hint="Enter your phone number with country code">
      <TextInput
        testID="StoryTextInput"
        placeholder="+1 (555) 123-4567"
      />
    </FormField>
  ),
}

export const WithError = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Email"
      error="Please enter a valid email address">
      <TextInput
        testID="StoryTextInput"
        placeholder="Enter your email"
        value="invalid-email"
        hasError={true}
      />
    </FormField>
  ),
}

export const Disabled = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Disabled Field"
      disabled={true}>
      <TextInput
        testID="StoryTextInput"
        placeholder="Cannot edit this"
        value="Read-only value"
        disabled={true}
      />
    </FormField>
  ),
}

export const Multiline = {
  render: () => (
    <FormField
      testID="StoryFormField"
      label="Description">
      <TextInput
        testID="StoryTextInput"
        placeholder="Enter a description"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
    </FormField>
  ),
}

export const NoLabel = {
  render: () => (
    <TextInput
      testID="StoryTextInput"
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
      testID="StoryFormField"
      label="Email Address"
      error={error}
      hint={!error ? 'We will never share your email' : undefined}
      required={true}>
      <TextInput
        testID="StoryTextInput"
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

export const Interactive = {
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
    <Column
      testID="StoryColumn"
      gap="md">
      <FormField
        testID="StoryFormField"
        label="Default"
        hint="Default state">
        <TextInput
          testID="StoryTextInput"
          placeholder="Default state"
        />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="With Value">
        <TextInput
          testID="StoryTextInput"
          value="Sample text"
        />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="Required"
        required={true}>
        <TextInput
          testID="StoryTextInput"
          placeholder="Required field"
        />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="With Hint"
        hint="This is a helpful hint">
        <TextInput
          testID="StoryTextInput"
          placeholder="Helpful input"
        />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="With Error"
        error="This field has an error">
        <TextInput
          testID="StoryTextInput"
          value="invalid"
          hasError={true}
        />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="Disabled"
        disabled={true}>
        <TextInput
          testID="StoryTextInput"
          value="Cannot edit"
          disabled={true}
        />
      </FormField>
    </Column>
  )
}

export const AllStates = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
