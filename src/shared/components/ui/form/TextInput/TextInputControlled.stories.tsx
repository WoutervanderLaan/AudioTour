import type React from 'react'
import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'
import type {Meta} from '@storybook/react-native-web-vite'
import {z} from 'zod'

import {TextInputControlled} from './TextInputControlled'
import type {
  ComplexFormData,
  DefaultValuesFormData,
  SimpleFormData,
} from './TextInputControlled.stories.types'

import {logger} from '@/core/lib/logger/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Text} from '@/shared/components/ui/typography/Text'

const meta = {
  title: 'Form/TextInputControlled',
  component: TextInputControlled,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInputControlled>

export default meta

/**
 * Simple form schema for validation
 */
const simpleSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

/**
 * SimpleFormExample
 * Simple form with a single controlled input
 *
 * @returns {React.JSX.Element} Simple form component
 */
const SimpleFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<SimpleFormData>({
    resolver: zodResolver(simpleSchema),
    mode: 'onChange',
  })

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: SimpleFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="email"
        label="Email Address"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        required={true}
      />
      <Button
        testID="StoryButton"
        label="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />
    </Column>
  )
}

export const SimpleForm = {
  render: (): React.JSX.Element => <SimpleFormExample />,
}

/**
 * Complex form schema with multiple fields and validation rules
 */
const complexSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores',
      ),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    bio: z.string().max(200, 'Bio must be at most 200 characters').optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

/**
 * ComplexFormExample
 * Complex form demonstrating multiple controlled inputs with validation
 *
 * @returns {React.JSX.Element} Complex form component
 */
const ComplexFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<ComplexFormData>({
    resolver: zodResolver(complexSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
    },
  })

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: ComplexFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <Text.Label testID="StoryText">Sign Up Form</Text.Label>

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="username"
        label="Username"
        placeholder="johndoe"
        hint="3-20 characters, letters, numbers, and underscores only"
        autoCapitalize="none"
        autoComplete="username"
        required={true}
      />

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        required={true}
      />

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
        hint="At least 8 characters with uppercase, lowercase, and numbers"
        secureTextEntry={true}
        autoComplete="password-new"
        required={true}
      />

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Re-enter password"
        secureTextEntry={true}
        autoComplete="password-new"
        required={true}
      />

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself..."
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        hint="Optional, maximum 200 characters"
      />

      <Button
        testID="StoryButton"
        label={formState.isSubmitting ? 'Submitting...' : 'Create Account'}
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid || formState.isSubmitting}
      />

      <Text.Label
        testID="StoryText"
        color="secondary">
        Form Valid: {formState.isValid ? 'Yes' : 'No'}
      </Text.Label>
      <Text.Label
        testID="StoryText"
        color="secondary">
        Errors:{' '}
        {Object.keys(formState.errors).length > 0
          ? Object.keys(formState.errors).join(', ')
          : 'None'}
      </Text.Label>
    </Column>
  )
}

export const ComplexForm = {
  render: (): React.JSX.Element => <ComplexFormExample />,
}

/**
 * Form with default values
 */
const defaultValuesSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

/**
 * DefaultValuesFormExample
 * Form demonstrating default values
 *
 * @returns {React.JSX.Element} Form with default values
 */
const DefaultValuesFormExample = (): React.JSX.Element => {
  const {control, handleSubmit} = useForm<DefaultValuesFormData>({
    resolver: zodResolver(defaultValuesSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: DefaultValuesFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="name"
        label="Full Name"
        required={true}
      />

      <TextInputControlled
        testID="StoryTextInput"
        control={control}
        name="email"
        label="Email"
        keyboardType="email-address"
        required={true}
      />

      <Button
        testID="StoryButton"
        label="Update Profile"
        onPress={handleSubmit(onSubmit)}
      />
    </Column>
  )
}

export const WithDefaultValues = {
  render: (): React.JSX.Element => <DefaultValuesFormExample />,
}
