import type React from 'react'

import type {Meta} from '@storybook/react-native-web-vite'

import {FormField} from '../FormField/FormField'
import {ImageInput} from './ImageInput'

import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

const meta = {
  title: 'Form/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageInput>

export default meta

/**
 * renderImageLabel
 * Helper function to render label with image count
 *
 * @param label - Label text
 * @param currentCount - Current number of images
 * @param maxImages - Maximum number of images
 * @param labelId - Native ID for label
 * @param disabled - Whether the input is disabled
 * @param required - Whether the field is required
 * @returns Rendered label with count
 */
const renderImageLabel = (currentCount: number, maxImages: number) => {
  return ({
    label,
    labelId,
    disabled,
    required,
  }: {
    label: string
    labelId?: string
    disabled: boolean
    required: boolean
  }): React.JSX.Element => (
    <Row
      testID="StoryRow"
      gap="xs"
      center>
      <Text.Label
        testID="StoryText"
        nativeID={labelId}
        color={disabled ? 'secondary' : 'default'}
        accessibilityRole="text">
        {label}
        {!!required && (
          <Text.Label
            testID="StoryText"
            color="warning"
            accessibilityLabel="required">
            {' '}
            *
          </Text.Label>
        )}
      </Text.Label>
      <Text.Label
        testID="StoryText"
        color="secondary">
        {currentCount} / {maxImages}
      </Text.Label>
    </Row>
  )
}

export const Default = {
  render: () => {
    const maxImages = 5
    const images: string[] = []

    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithImages = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ]

    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const MaxImagesReached = {
  render: () => {
    const maxImages = 3
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ]
    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const Required = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        required
        hint="At least one photo is required"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithHint = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        testID="StoryFormField"
        label="Museum Object Photos"
        hint="Upload up to 5 photos of the museum object"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithError = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        testID="StoryFormField"
        required
        label="Upload Photos"
        error="At least one photo is required"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const Disabled = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        disabled
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
          disabled={true}
        />
      </FormField>
    )
  },
}

export const SingleImageMode = {
  render: () => {
    const maxImages = 1
    const images: string[] = []
    return (
      <FormField
        testID="StoryFormField"
        label="Profile Photo"
        hint="Upload a single profile photo"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const SingleImageWithValue = {
  render: () => {
    const maxImages = 1
    const images = ['https://picsum.photos/200/200?random=1']
    return (
      <FormField
        testID="StoryFormField"
        label="Profile Photo"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const SmallThumbnails = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
          thumbnailSize="sm"
        />
      </FormField>
    )
  },
}

export const LargeThumbnails = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        testID="StoryFormField"
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          testID="StoryImageInput"
          maxImages={maxImages}
          value={images}
          thumbnailSize="lg"
        />
      </FormField>
    )
  },
}

export const NoLabel = {
  render: () => (
    <ImageInput
      testID="StoryImageInput"
      maxImages={5}
      value={[]}
    />
  ),
}
