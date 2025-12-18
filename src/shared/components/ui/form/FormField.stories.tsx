import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {TextInput as RNTextInput, View} from 'react-native'
import {useUnistyles} from 'react-native-unistyles'

import {FormField} from './FormField'

const meta = {
  title: 'Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
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
const SimpleInput = (): React.JSX.Element => {
  const {theme} = useUnistyles()
  return (
    <RNTextInput
      style={{
        backgroundColor: theme.color.textInput.container.background,
        borderRadius: theme.size.sm,
        paddingVertical: theme.size.smd,
        paddingHorizontal: theme.size.md,
        fontSize: theme.text.fontSize.small,
        fontFamily: theme.text.fontFamily.regular,
        color: theme.color.text.default,
      }}
      placeholder="Enter text..."
      placeholderTextColor={theme.color.text.tertiary}
    />
  )
}

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
  const {theme} = useUnistyles()

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
      <RNTextInput
        style={{
          backgroundColor: theme.color.textInput.container.background,
          borderWidth: 2,
          borderColor: error
            ? theme.color.text.warning
            : theme.color.transparent.full,
          borderRadius: theme.size.sm,
          paddingVertical: theme.size.smd,
          paddingHorizontal: theme.size.md,
          fontSize: theme.text.fontSize.small,
          fontFamily: theme.text.fontFamily.regular,
          color: theme.color.text.default,
        }}
        placeholder="you@example.com"
        placeholderTextColor={theme.color.text.tertiary}
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
const CustomLabelExample = (): React.JSX.Element => {
  const {theme} = useUnistyles()

  return (
    <FormField
      label="Custom Label"
      required={true}
      hint="This field has a custom label with extra styling"
      renderLabel={({label, required}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.size.xs,
          }}>
          <RNTextInput
            style={{
              fontSize: theme.text.fontSize.small,
              fontFamily: theme.text.fontFamily.bold,
              color: theme.color.pressable.primary.default.background,
            }}
            editable={false}
            value={label}
          />
          {required && (
            <RNTextInput
              style={{
                fontSize: theme.text.fontSize.small,
                fontFamily: theme.text.fontFamily.bold,
                color: theme.color.text.warning,
              }}
              editable={false}
              value="*"
            />
          )}
        </View>
      )}>
      <SimpleInput />
    </FormField>
  )
}

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
    <View style={{gap: 24}}>
      <FormField
        label="Default"
        children={<SimpleInput />}
      />
      <FormField
        label="With Hint"
        hint="This is a helpful hint"
        children={<SimpleInput />}
      />
      <FormField
        label="With Error"
        error="This field has an error"
        children={<SimpleInput />}
      />
      <FormField
        label="Required"
        required={true}
        hint="This field is required"
        children={<SimpleInput />}
      />
      <FormField
        label="Disabled"
        disabled={true}
        hint="This field is disabled"
        children={<SimpleInput />}
      />
      <FormField
        hint="Without label"
        children={<SimpleInput />}
      />
    </View>
  )
}

export const AllStates = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
