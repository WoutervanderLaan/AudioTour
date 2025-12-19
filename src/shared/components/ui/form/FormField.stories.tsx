import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'

import {FormField} from './FormField'
import {Column} from '../layout/Column'
import {TextInput} from './TextInput'
import {GradientBackground} from '../gradient/GradientBackground'
import {Text} from '../typography'
import {Row} from '../layout/Row'

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
  <TextInput placeholder="Enter text..." />
)

export const Default: Story = {
  args: {
    label: 'Email Address',
    children: <SimpleInput />,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    hint: 'Choose a unique username',
    children: <SimpleInput />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    children: <SimpleInput />,
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    hint: 'Enter your first and last name',
    children: <SimpleInput />,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    disabled: true,
    hint: 'This field cannot be edited',
    children: <SimpleInput />,
  },
}

export const WithoutLabel: Story = {
  args: {
    hint: 'Search for items...',
    children: <SimpleInput />,
  },
}

export const CustomGap: Story = {
  args: {
    label: 'Description',
    hint: 'Provide a detailed description',
    gap: 'md',
    children: <SimpleInput />,
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
      label="Email Address"
      error={error}
      hint={!error ? 'We will never share your email' : undefined}
      required={true}>
      <TextInput
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
    label="Custom Label"
    required
    hint="This field has a custom label with extra styling"
    renderLabel={({label, required}) => (
      <GradientBackground>
        <Row padding="md">
          <Text.Title color="inverse">{label}</Text.Title>
          {required && <Text.Title color="warning">*</Text.Title>}
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
    <Column gap="lg">
      <FormField label="Default">
        <SimpleInput />
      </FormField>
      <FormField
        label="With Hint"
        hint="This is a helpful hint">
        <SimpleInput />
      </FormField>
      <FormField
        label="With Error"
        error="This field has an error">
        <SimpleInput />
      </FormField>
      <FormField
        label="Required"
        required
        hint="This field is required">
        <SimpleInput />
      </FormField>
      <FormField
        label="Disabled"
        disabled
        hint="This field is disabled">
        <SimpleInput />
      </FormField>
      <FormField hint="Without label">
        <SimpleInput />
      </FormField>
    </Column>
  )
}

export const AllStates = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
