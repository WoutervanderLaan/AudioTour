import {zodResolver} from '@hookform/resolvers/zod'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useForm} from 'react-hook-form'
import {View} from 'react-native'
import {z} from 'zod'

import {CheckboxControlled} from './CheckboxControlled'

import {Button} from '@/shared/components/ui/pressable'
import {Text} from '@/shared/components/ui/typography'
import {logger} from '@/core/lib/logger'

const meta = {
  title: 'Form/CheckboxControlled',
  component: CheckboxControlled,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CheckboxControlled>

export default meta

/**
 * Story
 * Storybook story type for CheckboxControlled component
 */
type Story = StoryObj<typeof meta>

/**
 * Simple form schema with required checkbox
 */
const simpleSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

type SimpleFormData = z.infer<typeof simpleSchema>

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

  const onSubmit = (data: SimpleFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <CheckboxControlled
        control={control}
        name="acceptTerms"
        label="I accept the terms and conditions"
        hint="Please read our terms carefully"
        required={true}
      />
      <Button
        label="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />
    </View>
  )
}

export const SimpleForm = {
  render: (): React.JSX.Element => <SimpleFormExample />,
}

/**
 * Complex form schema with multiple checkboxes
 */
const complexSchema = z
  .object({
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    acceptPrivacy: z.boolean().refine(val => val === true, {
      message: 'You must accept the privacy policy',
    }),
    subscribeNewsletter: z.boolean().optional(),
    enableNotifications: z.boolean().optional(),
    enableSms: z.boolean().optional(),
    over18: z.boolean().refine(val => val === true, {
      message: 'You must be over 18 to use this service',
    }),
  })
  .refine(
    data => {
      // If SMS is enabled, notifications must be enabled
      if (data.enableSms && !data.enableNotifications) {
        return false
      }
      return true
    },
    {
      message: 'You must enable notifications to receive SMS updates',
      path: ['enableSms'],
    },
  )

type ComplexFormData = z.infer<typeof complexSchema>

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

  const onSubmit = (data: ComplexFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <Text.Label>Sign Up Form</Text.Label>

      <View style={{gap: 12}}>
        <CheckboxControlled
          control={control}
          name="acceptTerms"
          label="I accept the terms and conditions"
          required={true}
        />

        <CheckboxControlled
          control={control}
          name="acceptPrivacy"
          label="I accept the privacy policy"
          required={true}
        />

        <CheckboxControlled
          control={control}
          name="over18"
          label="I am over 18 years old"
          required={true}
        />
      </View>

      <View style={{marginTop: 8}}>
        <Text.Label>Preferences (Optional)</Text.Label>
      </View>

      <View style={{gap: 12}}>
        <CheckboxControlled
          control={control}
          name="subscribeNewsletter"
          label="Subscribe to our newsletter"
          hint="Receive weekly updates about new features"
        />

        <CheckboxControlled
          control={control}
          name="enableNotifications"
          label="Enable notifications"
          hint="Allow us to send you important updates"
        />

        <CheckboxControlled
          control={control}
          name="enableSms"
          label="Enable SMS notifications"
          hint="Requires notifications to be enabled"
          disabled={!enableNotifications}
        />
      </View>

      <Button
        label={formState.isSubmitting ? 'Submitting...' : 'Create Account'}
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid || formState.isSubmitting}
      />

      <View style={{marginTop: 8}}>
        <Text.Label color="secondary">
          Form Valid: {formState.isValid ? 'Yes' : 'No'}
        </Text.Label>
        <Text.Label color="secondary">
          Errors:{' '}
          {Object.keys(formState.errors).length > 0
            ? Object.keys(formState.errors).join(', ')
            : 'None'}
        </Text.Label>
      </View>
    </View>
  )
}

export const ComplexForm = {
  render: (): React.JSX.Element => <ComplexFormExample />,
}

/**
 * Form with default values
 */
const defaultValuesSchema = z.object({
  subscribeNewsletter: z.boolean(),
  enableNotifications: z.boolean(),
})

type DefaultValuesFormData = z.infer<typeof defaultValuesSchema>

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

  const onSubmit = (data: DefaultValuesFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <CheckboxControlled
        control={control}
        name="subscribeNewsletter"
        label="Subscribe to newsletter"
        hint="Receive weekly updates"
      />

      <CheckboxControlled
        control={control}
        name="enableNotifications"
        label="Enable notifications"
        hint="Get notified about important updates"
      />

      <Button
        label="Update Preferences"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export const WithDefaultValues = {
  render: (): React.JSX.Element => <DefaultValuesFormExample />,
}

/**
 * Conditional validation schema
 */
const conditionalSchema = z
  .object({
    hasPromoCode: z.boolean(),
    promoCodeAccepted: z.boolean().optional(),
  })
  .refine(
    data => {
      // If user has promo code, they must accept the promo code terms
      if (data.hasPromoCode && !data.promoCodeAccepted) {
        return false
      }
      return true
    },
    {
      message: 'You must accept the promo code terms',
      path: ['promoCodeAccepted'],
    },
  )

type ConditionalFormData = z.infer<typeof conditionalSchema>

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

  const onSubmit = (data: ConditionalFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <Text.Label>Checkout</Text.Label>

      <CheckboxControlled
        control={control}
        name="hasPromoCode"
        label="I have a promo code"
      />

      {hasPromoCode && (
        <CheckboxControlled
          control={control}
          name="promoCodeAccepted"
          label="I accept the promo code terms and conditions"
          required={true}
        />
      )}

      <Button
        label="Complete Order"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />

      <View style={{marginTop: 8}}>
        <Text.Label color="secondary">
          Form Valid: {formState.isValid ? 'Yes' : 'No'}
        </Text.Label>
      </View>
    </View>
  )
}

export const ConditionalValidation = {
  render: (): React.JSX.Element => <ConditionalValidationExample />,
}
