import React from 'react'
import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'
import {Meta} from '@storybook/react-native-web-vite'

import {CheckboxControlled} from './CheckboxControlled'
import {
  type ComplexFormData,
  complexSchema,
  type ConditionalFormData,
  conditionalSchema,
  type DefaultValuesFormData,
  defaultValuesSchema,
  type SimpleFormData,
  simpleSchema,
} from './CheckboxControlled.stories.types'

import {logger} from '@/core/lib/logger/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Text} from '@/shared/components/ui/typography/Text'

const meta = {
  title: 'Form/CheckboxControlled',
  component: CheckboxControlled,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxControlled>

export default meta

/**
 * SimpleFormExample
 * Simple form with a single required controlled checkbox
 *
 * @returns {React.JSX.Element} Simple form component
 */
const SimpleFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<SimpleFormData>({
    resolver: zodResolver(simpleSchema),
    mode: 'onChange',
    defaultValues: {
      acceptTerms: false,
    },
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
      gap="md"
      testID="StoryColumn">
      <CheckboxControlled
        testID="StoryCheckbox"
        control={control}
        name="acceptTerms"
        checkboxLabel="I accept the terms and conditions"
        label="T&C"
        hint="Please read our terms carefully"
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
 * ComplexFormExample
 * Complex form demonstrating multiple controlled checkboxes with validation
 *
 * @returns {React.JSX.Element} Complex form component
 */
const ComplexFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState, watch} = useForm<ComplexFormData>({
    resolver: zodResolver(complexSchema),
    mode: 'onChange',
    defaultValues: {
      acceptTerms: false,
      acceptPrivacy: false,
      subscribeNewsletter: false,
      enableNotifications: false,
      enableSms: false,
      over18: false,
    },
  })

  const enableNotifications = watch('enableNotifications')

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

      <Column
        testID="StoryColumn"
        gap="sm">
        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="acceptTerms"
          checkboxLabel="I accept the terms and conditions"
          required
        />

        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="acceptPrivacy"
          checkboxLabel="I accept the privacy policy"
          required
        />

        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="over18"
          checkboxLabel="I am over 18 years old"
          required
        />
      </Column>

      <Spacer testID="StorySpacer" />

      <Text.Label testID="StoryText">Preferences (Optional)</Text.Label>

      <Column
        testID="StoryColumn"
        gap="sm">
        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="subscribeNewsletter"
          checkboxLabel="Subscribe to our newsletter"
          hint="Receive weekly updates about new features"
        />

        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="enableNotifications"
          checkboxLabel="Enable notifications"
          hint="Allow us to send you important updates"
        />

        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="enableSms"
          checkboxLabel="Enable SMS notifications"
          hint="Requires notifications to be enabled"
          disabled={!enableNotifications}
        />
      </Column>

      <Button
        testID="StoryButton"
        label={formState.isSubmitting ? 'Submitting...' : 'Create Account'}
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid || formState.isSubmitting}
      />

      <Spacer testID="StorySpacer" />
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
 * DefaultValuesFormExample
 * Form demonstrating checkboxes with default values
 *
 * @returns {React.JSX.Element} Form with default values
 */
const DefaultValuesFormExample = (): React.JSX.Element => {
  const {control, handleSubmit} = useForm<DefaultValuesFormData>({
    resolver: zodResolver(defaultValuesSchema),
    defaultValues: {
      subscribeNewsletter: true,
      enableNotifications: false,
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
      <CheckboxControlled
        testID="StoryCheckbox"
        control={control}
        name="subscribeNewsletter"
        checkboxLabel="Subscribe to newsletter"
        hint="Receive weekly updates"
      />

      <CheckboxControlled
        testID="StoryCheckbox"
        control={control}
        name="enableNotifications"
        checkboxLabel="Enable notifications"
        hint="Get notified about important updates"
      />

      <Button
        testID="StoryButton"
        label="Update Preferences"
        onPress={handleSubmit(onSubmit)}
      />
    </Column>
  )
}

export const WithDefaultValues = {
  render: (): React.JSX.Element => <DefaultValuesFormExample />,
}

/**
 * ConditionalValidationExample
 * Form demonstrating conditional validation
 *
 * @returns {React.JSX.Element} Conditional validation form
 */
const ConditionalValidationExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState, watch} =
    useForm<ConditionalFormData>({
      resolver: zodResolver(conditionalSchema),
      mode: 'onChange',
      defaultValues: {
        hasPromoCode: false,
        promoCodeAccepted: false,
      },
    })

  const hasPromoCode = watch('hasPromoCode')

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: ConditionalFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <Text.Label testID="StoryText">Checkout</Text.Label>

      <CheckboxControlled
        testID="StoryCheckbox"
        control={control}
        name="hasPromoCode"
        checkboxLabel="I have a promo code"
      />

      {!!hasPromoCode && (
        <CheckboxControlled
          testID="StoryCheckbox"
          control={control}
          name="promoCodeAccepted"
          checkboxLabel="I accept the promo code terms and conditions"
          required={true}
        />
      )}

      <Button
        testID="StoryButton"
        label="Complete Order"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />

      <Spacer testID="StorySpacer" />

      <Text.Label
        testID="StoryText"
        color="secondary">
        Form Valid: {formState.isValid ? 'Yes' : 'No'}
      </Text.Label>
    </Column>
  )
}

export const ConditionalValidation = {
  render: (): React.JSX.Element => <ConditionalValidationExample />,
}
