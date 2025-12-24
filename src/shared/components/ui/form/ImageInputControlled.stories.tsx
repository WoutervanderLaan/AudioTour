import React from 'react'
import {useForm} from 'react-hook-form'

import {zodResolver} from '@hookform/resolvers/zod'
import type {Meta} from '@storybook/react-native-web-vite'
import {z} from 'zod'

import {Column} from '../layout/Column'
import {ImageInputControlled} from './ImageInputControlled'

import {logger} from '@/core/lib/logger/logger'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Form/ImageInputControlled',
  component: ImageInputControlled,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageInputControlled>

export default meta

/**
 * Simple form schema for validation
 */
const simpleSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

/**
 * SimpleFormData
 * TODO: describe what this type represents.
 */
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
      gap="lg">
      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="photos"
        label="Upload Photos"
        maxImages={5}
        hint="Select 1-5 photos"
        required={true}
      />
      <Button
        testID="StoryButton"
        label="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
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

export const SimpleForm = {
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

/**
 * SingleImageFormData
 * TODO: describe what this type represents.
 */
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

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: SingleImageFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="profilePhoto"
        label="Profile Photo"
        maxImages={1}
        hint="Upload a single profile photo"
        required={true}
        thumbnailSize="lg"
      />
      <Button
        testID="StoryButton"
        label="Save Profile"
        onPress={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
      />
    </Column>
  )
}

export const SingleImageForm = {
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

/**
 * ComplexFormData
 * TODO: describe what this type represents.
 */
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
      <Text.Title testID="StoryText">Create Gallery</Text.Title>

      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="coverPhoto"
        label="Cover Photo"
        maxImages={1}
        hint="Upload a cover photo for your gallery"
        required={true}
        thumbnailSize="lg"
      />

      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="photos"
        label="Gallery Photos"
        maxImages={3}
        hint="Upload 1-3 photos for your gallery"
        required={true}
      />

      <Text.Label testID="StoryText">
        Cover Photo: {coverPhoto.length} selected
      </Text.Label>
      <Text.Label testID="StoryText">
        Gallery Photos: {photos.length} selected
      </Text.Label>

      <Button
        testID="StoryButton"
        label={formState.isSubmitting ? 'Creating...' : 'Create Gallery'}
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
 * Form with default values schema
 */
const defaultValuesSchema = z.object({
  photos: z
    .array(z.string())
    .min(1, 'At least one photo is required')
    .max(5, 'Maximum 5 photos allowed'),
})

/**
 * DefaultValuesFormData
 * TODO: describe what this type represents.
 */
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
      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="photos"
        label="Update Photos"
        maxImages={5}
        hint="Modify your existing photos"
        required={true}
      />

      <Button
        testID="StoryButton"
        label="Update"
        onPress={handleSubmit(onSubmit)}
      />
    </Column>
  )
}

export const WithDefaultValues = {
  render: (): React.JSX.Element => <DefaultValuesFormExample />,
}

/**
 * Small thumbnails schema
 */
const smallThumbnailsSchema = z.object({
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
})

/**
 * SmallThumbnailsFormData
 * TODO: describe what this type represents.
 */
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

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: SmallThumbnailsFormData): void => {
    logger.debug('Form submitted:', data)
  }

  return (
    <Column
      testID="StoryColumn"
      gap="md">
      <ImageInputControlled
        testID="StoryImageInput"
        control={control}
        name="photos"
        label="Small Thumbnails"
        maxImages={10}
        thumbnailSize="sm"
        hint="Compact view with small thumbnails"
        required={true}
      />

      <Button
        testID="StoryButton"
        label="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </Column>
  )
}

export const SmallThumbnails = {
  render: (): React.JSX.Element => <SmallThumbnailsFormExample />,
}
