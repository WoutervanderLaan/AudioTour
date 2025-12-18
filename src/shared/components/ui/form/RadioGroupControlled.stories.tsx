import {zodResolver} from '@hookform/resolvers/zod'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useForm} from 'react-hook-form'
import {View} from 'react-native'
import {z} from 'zod'

import {RadioGroupControlled} from './RadioGroupControlled'
import type {RadioOption} from './RadioGroup'

import {Button} from '@/shared/components/ui/pressable'
import {Text} from '@/shared/components/ui/typography'
import {logger} from '@/core/lib/logger'

const meta = {
  title: 'Form/RadioGroupControlled',
  component: RadioGroupControlled,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RadioGroupControlled>

export default meta

/**
 * Story
 * Storybook story type for RadioGroupControlled component
 */
type Story = StoryObj<typeof meta>

const themeOptions: RadioOption[] = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
  {value: 'auto', label: 'Auto'},
]

const formSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto'], {
    required_error: 'Please select a theme',
  }),
})

type FormData = z.infer<typeof formSchema>

/**
 * FormWrapper
 * Wrapper component for form stories
 *
 * @returns {React.JSX.Element} Form story component
 */
const FormWrapper = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  /**
   * onSubmit
   * Handles form submission
   *
   * @param {FormData} data - Form data
   */
  const onSubmit = (data: FormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <RadioGroupControlled
        control={control}
        name="theme"
        label="Theme Preference"
        options={themeOptions}
        required
        hint="Choose your preferred color scheme"
      />
      <Button
        label="Submit"
        onPress={handleSubmit(onSubmit)}
      />
      {!!formState.errors.theme && (
        <Text.Paragraph color="warning">
          Validation triggered: {formState.errors.theme.message}
        </Text.Paragraph>
      )}
    </View>
  )
}

export const WithForm = {
  render: () => <FormWrapper />,
}

const preferencesSchema = z.object({
  notifications: z.enum(['all', 'important', 'none'], {
    required_error: 'Please select a notification preference',
  }),
})

type PreferencesData = z.infer<typeof preferencesSchema>

/**
 * PreferencesFormWrapper
 * Wrapper for preferences form
 *
 * @returns {React.JSX.Element} Preferences form component
 */
const PreferencesFormWrapper = (): React.JSX.Element => {
  const {control, handleSubmit} = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notifications: 'important',
    },
  })

  /**
   * onSubmit
   * Handles form submission
   *
   * @param {PreferencesData} data - Form data
   */
  const onSubmit = (data: PreferencesData): void => {
    logger.debug('Preferences saved:', data)
  }

  return (
    <View style={{gap: 16}}>
      <RadioGroupControlled
        control={control}
        name="notifications"
        label="Notification Settings"
        options={[
          {
            value: 'all',
            label: 'All notifications',
            description: 'Receive all types of notifications',
          },
          {
            value: 'important',
            label: 'Important only',
            description: 'Only critical notifications',
          },
          {
            value: 'none',
            label: 'None',
            description: 'Disable all notifications',
          },
        ]}
      />
      <Button
        label="Save Preferences"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export const WithDefaultValue = {
  render: () => <PreferencesFormWrapper />,
}
