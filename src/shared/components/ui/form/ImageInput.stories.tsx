import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {FormField} from './FormField'
import {ImageInput} from './ImageInput'

import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Form/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageInput>

export default meta

/**
 * Story
 * Storybook story type for ImageInput component
 */
type Story = StoryObj<typeof meta>

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
      gap="xs"
      center>
      <Text.Label
        nativeID={labelId}
        color={disabled ? 'secondary' : 'default'}
        accessibilityRole="text">
        {label}
        {!!required && (
          <Text.Label
            color="warning"
            accessibilityLabel="required">
            {' '}
            *
          </Text.Label>
        )}
      </Text.Label>
      <Text.Label color="secondary">
        {currentCount} / {maxImages}
      </Text.Label>
    </Row>
  )
}

export const Default: Story = {
  render: () => {
    const maxImages = 5
    const images: string[] = []

    return (
      <FormField
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithImages: Story = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ]

    return (
      <FormField
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const MaxImagesReached: Story = {
  render: () => {
    const maxImages = 3
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ]
    return (
      <FormField
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const Required: Story = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        label="Upload Photos"
        required
        hint="At least one photo is required"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithHint: Story = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        label="Museum Object Photos"
        hint="Upload up to 5 photos of the museum object"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const WithError: Story = {
  render: () => {
    const maxImages = 5
    const images: string[] = []
    return (
      <FormField
        required
        label="Upload Photos"
        error="At least one photo is required"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        label="Upload Photos"
        disabled
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
          disabled={true}
        />
      </FormField>
    )
  },
}

export const SingleImageMode: Story = {
  render: () => {
    const maxImages = 1
    const images: string[] = []
    return (
      <FormField
        label="Profile Photo"
        hint="Upload a single profile photo"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const SingleImageWithValue: Story = {
  render: () => {
    const maxImages = 1
    const images = ['https://picsum.photos/200/200?random=1']
    return (
      <FormField
        label="Profile Photo"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
        />
      </FormField>
    )
  },
}

export const SmallThumbnails: Story = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
          thumbnailSize="sm"
        />
      </FormField>
    )
  },
}

export const LargeThumbnails: Story = {
  render: () => {
    const maxImages = 5
    const images = [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ]
    return (
      <FormField
        label="Upload Photos"
        renderLabel={renderImageLabel(images.length, maxImages)}>
        <ImageInput
          maxImages={maxImages}
          value={images}
          thumbnailSize="lg"
        />
      </FormField>
    )
  },
}

export const NoLabel: Story = {
  render: () => (
    <ImageInput
      maxImages={5}
      value={[]}
    />
  ),
}
