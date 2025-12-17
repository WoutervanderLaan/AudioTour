import {zodResolver} from '@hookform/resolvers/zod'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useForm} from 'react-hook-form'
import {View} from 'react-native'
import {z} from 'zod'

import {ImageInputControlled} from './ImageInputControlled'

import {Button} from '@/shared/components/ui/pressable'
import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Form/ImageInputControlled',
  component: ImageInputControlled,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ImageInputControlled>

export default meta

/**
 * Story
 * Storybook story type for ImageInputControlled component
 */
type Story = StoryObj<typeof meta>

/**
 * Simple form schema for validation
 */
const simpleSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

type SimpleFormData = z.infer<typeof simpleSchema>

/**
 * SimpleFormExample
 * Simple form with a single controlled image input
 *
 * @returns Simple form component
 */
const SimpleFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<SimpleFormData>({
    resolver: zodResolver(simpleSchema),
    mode: 'onChange',
    defaultValues: {
      photos: [],
    },
  })

  const onSubmit = (data: SimpleFormData): void => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
    // eslint-disable-next-line no-alert
    alert(`Submitted ${data.photos.length} photos`)
  }

  return (
    <View style={{gap: 16}}>
      <ImageInputControlled
        control={control}
        name="photos"
        label="Upload Photos"
        maxImages={5}
        hint="Select 1-5 photos"
        required={true}
      />
      <Button
        label="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
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

export const SimpleForm: Story = {
  render: (): React.JSX.Element => <SimpleFormExample />,
}

/**
 * Single image schema
 */
const singleImageSchema = z.object({
  profilePhoto: z
    .array(z.string())
    .min(1, 'Profile photo is required')
    .max(1, 'Only one photo allowed'),
})

type SingleImageFormData = z.infer<typeof singleImageSchema>

/**
 * SingleImageFormExample
 * Form with single image input (max 1)
 *
 * @returns Single image form component
 */
const SingleImageFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState} = useForm<SingleImageFormData>({
    resolver: zodResolver(singleImageSchema),
    mode: 'onChange',
    defaultValues: {
      profilePhoto: [],
    },
  })

  const onSubmit = (data: SingleImageFormData): void => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
    // eslint-disable-next-line no-alert
    alert('Profile photo uploaded!')
  }

  return (
    <View style={{gap: 16}}>
      <ImageInputControlled
        control={control}
        name="profilePhoto"
        label="Profile Photo"
        maxImages={1}
        hint="Upload a single profile photo"
        required={true}
        thumbnailSize="lg"
      />
      <Button
        label="Save Profile"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />
    </View>
  )
}

export const SingleImageForm: Story = {
  render: (): React.JSX.Element => <SingleImageFormExample />,
}

/**
 * Complex form schema with multiple fields
 */
const complexSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(3, 'Maximum 3 photos allowed'),
  coverPhoto: z
    .array(z.string())
    .min(1, 'Cover photo is required')
    .max(1, 'Only one cover photo allowed'),
})

type ComplexFormData = z.infer<typeof complexSchema>

/**
 * ComplexFormExample
 * Complex form with multiple image inputs and text fields
 *
 * @returns Complex form component
 */
const ComplexFormExample = (): React.JSX.Element => {
  const {control, handleSubmit, formState, watch} = useForm<ComplexFormData>({
    resolver: zodResolver(complexSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      photos: [],
      coverPhoto: [],
    },
  })

  const photos = watch('photos')
  const coverPhoto = watch('coverPhoto')

  const onSubmit = (data: ComplexFormData): void => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
    // eslint-disable-next-line no-alert
    alert(`Submitted: ${data.title}\n${data.photos.length} photos`)
  }

  return (
    <View style={{gap: 16}}>
      <Text.Title>Create Gallery</Text.Title>

      <ImageInputControlled
        control={control}
        name="coverPhoto"
        label="Cover Photo"
        maxImages={1}
        hint="Upload a cover photo for your gallery"
        required={true}
        thumbnailSize="lg"
      />

      <ImageInputControlled
        control={control}
        name="photos"
        label="Gallery Photos"
        maxImages={3}
        hint="Upload 1-3 photos for your gallery"
        required={true}
      />

      <View style={{marginTop: 8}}>
        <Text.Label>Cover Photo: {coverPhoto.length} selected</Text.Label>
        <Text.Label>Gallery Photos: {photos.length} selected</Text.Label>
      </View>

      <Button
        label={formState.isSubmitting ? 'Creating...' : 'Create Gallery'}
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

export const ComplexForm: Story = {
  render: (): React.JSX.Element => <ComplexFormExample />,
}

/**
 * Form with default values schema
 */
const defaultValuesSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

type DefaultValuesFormData = z.infer<typeof defaultValuesSchema>

/**
 * DefaultValuesFormExample
 * Form demonstrating default image values
 *
 * @returns Form with default values
 */
const DefaultValuesFormExample = (): React.JSX.Element => {
  const {control, handleSubmit} = useForm<DefaultValuesFormData>({
    resolver: zodResolver(defaultValuesSchema),
    defaultValues: {
      photos: [
        'https://picsum.photos/200/200?random=1',
        'https://picsum.photos/200/200?random=2',
      ],
    },
  })

  const onSubmit = (data: DefaultValuesFormData): void => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
    // eslint-disable-next-line no-alert
    alert(`Updated with ${data.photos.length} photos`)
  }

  return (
    <View style={{gap: 16}}>
      <ImageInputControlled
        control={control}
        name="photos"
        label="Update Photos"
        maxImages={5}
        hint="Modify your existing photos"
        required={true}
      />

      <Button
        label="Update"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export const WithDefaultValues: Story = {
  render: (): React.JSX.Element => <DefaultValuesFormExample />,
}

/**
 * Small thumbnails schema
 */
const smallThumbnailsSchema = z.object({
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
})

type SmallThumbnailsFormData = z.infer<typeof smallThumbnailsSchema>

/**
 * SmallThumbnailsFormExample
 * Form with small thumbnail size
 *
 * @returns Form with small thumbnails
 */
const SmallThumbnailsFormExample = (): React.JSX.Element => {
  const {control, handleSubmit} = useForm<SmallThumbnailsFormData>({
    resolver: zodResolver(smallThumbnailsSchema),
    defaultValues: {
      photos: [],
    },
  })

  const onSubmit = (data: SmallThumbnailsFormData): void => {
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
  }

  return (
    <View style={{gap: 16}}>
      <ImageInputControlled
        control={control}
        name="photos"
        label="Small Thumbnails"
        maxImages={10}
        thumbnailSize="sm"
        hint="Compact view with small thumbnails"
        required={true}
      />

      <Button
        label="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

export const SmallThumbnails: Story = {
  render: (): React.JSX.Element => <SmallThumbnailsFormExample />,
}
