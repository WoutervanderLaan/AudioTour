import React, {useState} from 'react'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {GradientBackground} from '../gradient/GradientBackground'
import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {Text} from '../typography'
import {FormField} from './FormField'
import {TextInput} from './TextInput'

const meta = {
  title: 'Form/FormField',
  component: FormField,
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta

/**
 * Story
 * Storybook story type for FormField component
 */
type Story = StoryObj<typeof meta>

/**
 * SimpleInput
 * A simple text input component for demo purposes
 *
 * @returns {React.JSX.Element} Simple input component
 */
const SimpleInput = (): React.JSX.Element => (
  <TextInput
    testID="StoryTextInput"
    placeholder="Enter text..."
  />
)

export const Default: Story = {
  args: {
    label: 'Email Address',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    hint: 'Choose a unique username',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    testID: 'StoryFormField',
    children: <SimpleInput />,
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    hint: 'Enter your first and last name',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    disabled: true,
    hint: 'This field cannot be edited',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

export const WithoutLabel: Story = {
  args: {
    hint: 'Search for items...',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

export const CustomGap: Story = {
  args: {
    label: 'Description',
    hint: 'Provide a detailed description',
    gap: 'md',
    children: <SimpleInput />,
    testID: 'StoryFormField',
  },
}

/**
 * InteractiveExample
 * Interactive example demonstrating FormField with controlled input
 *
 * @returns {React.JSX.Element} Interactive story component
 */
const InteractiveExample = (): React.JSX.Element => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()

  /**
   * handleChange
   * TODO: describe what it does.
   *
   * @param {*} text
   * @returns {*} describe return value
   */
  const handleChange = (text: string): void => {
    setValue(text)
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
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </FormField>
  )
}

export const Interactive = {
  render: (): React.JSX.Element => <InteractiveExample />,
}

/**
 * CustomLabelExample
 * Example demonstrating custom label rendering
 *
 * @returns {React.JSX.Element} Custom label example component
 */
const CustomLabelExample = (): React.JSX.Element => (
  <FormField
    testID="StoryFormField"
    label="Custom Label"
    required
    hint="This field has a custom label with extra styling"
    renderLabel={({label, required}) => (
      <GradientBackground testID="StoryGradientBackground">
        <Row
          testID="StoryRow"
          padding="md">
          <Text.Title
            testID="StoryText"
            color="inverse">
            {label}
          </Text.Title>
          {!!required && (
            <Text.Title
              testID="StoryText"
              color="warning">
              *
            </Text.Title>
          )}
        </Row>
      </GradientBackground>
    )}>
    <SimpleInput />
  </FormField>
)

export const CustomLabel = {
  render: (): React.JSX.Element => <CustomLabelExample />,
}

/**
 * AllStatesExample
 * Displays all FormField states side by side
 *
 * @returns {React.JSX.Element} All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  return (
    <Column
      testID="StoryColumn"
      gap="lg">
      <FormField
        testID="StoryFormField"
        label="Default">
        <SimpleInput />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="With Hint"
        hint="This is a helpful hint">
        <SimpleInput />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="With Error"
        error="This field has an error">
        <SimpleInput />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="Required"
        required
        hint="This field is required">
        <SimpleInput />
      </FormField>
      <FormField
        testID="StoryFormField"
        label="Disabled"
        disabled
        hint="This field is disabled">
        <SimpleInput />
      </FormField>
      <FormField
        testID="StoryFormField"
        hint="Without label">
        <SimpleInput />
      </FormField>
    </Column>
  )
}

export const AllStates = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
