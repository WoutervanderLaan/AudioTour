import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'

import {FormField} from './FormField'
import {ImageInput} from './ImageInput'

import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable'
import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Form/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
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
const renderImageLabel = (
  label: string,
  currentCount: number,
  maxImages: number,
) => {
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
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        required={true}
        hint="At least one photo is required"
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Museum Object Photos',
          images.length,
          maxImages,
        )}>
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
        label="Upload Photos"
        error="At least one photo is required"
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        disabled={true}
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Profile Photo',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Profile Photo',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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
        renderLabel={renderImageLabel(
          'Upload Photos',
          images.length,
          maxImages,
        )}>
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

/**
 * InteractiveExample
 * Interactive example demonstrating controlled image input with validation
 *
 * @returns Interactive story component
 */
const InteractiveExample = (): React.JSX.Element => {
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState<string>()
  const maxImages = 3

  const handleChange = (newImages: string[]): void => {
    setImages(newImages)

    // Validation
    if (newImages.length === 0) {
      setError('At least one photo is required')
    } else if (newImages.length > maxImages) {
      setError(`Maximum ${maxImages} photos allowed`)
    } else {
      setError(undefined)
    }
  }

  const handleClear = (): void => {
    setImages([])
    setError('At least one photo is required')
  }

  return (
    <View style={{gap: 16}}>
      <FormField
        label="Upload Museum Object Photos"
        error={error}
        hint={!error ? 'Select 1-3 photos of the museum object' : undefined}
        required={true}
        renderLabel={renderImageLabel(
          'Upload Museum Object Photos',
          images.length,
          maxImages,
        )}>
        <ImageInput
          maxImages={maxImages}
          value={images}
          onChange={handleChange}
        />
      </FormField>

      <View style={{gap: 8}}>
        <Text.Label>Selected: {images.length} photos</Text.Label>
        <Text.Label color={error ? 'warning' : 'secondary'}>
          Status: {error || 'Valid'}
        </Text.Label>
      </View>

      {images.length > 0 && (
        <Button
          label="Clear All"
          onPress={handleClear}
          variant="secondary"
        />
      )}
    </View>
  )
}

export const Interactive: Story = {
  render: (): React.JSX.Element => <InteractiveExample />,
}

/**
 * AllStatesExample
 * Displays all ImageInput states side by side
 *
 * @returns All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  const [images1, setImages1] = useState<string[]>([])
  const [images2] = useState<string[]>([
    'https://picsum.photos/200/200?random=1',
  ])
  const [images3] = useState<string[]>([
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
  ])

  return (
    <View style={{gap: 24}}>
      <FormField
        label="Empty"
        renderLabel={renderImageLabel('Empty', images1.length, 5)}>
        <ImageInput
          maxImages={5}
          value={images1}
          onChange={setImages1}
        />
      </FormField>

      <FormField
        label="With Images"
        renderLabel={renderImageLabel('With Images', images2.length, 5)}>
        <ImageInput
          maxImages={5}
          value={images2}
        />
      </FormField>

      <FormField
        label="Max Reached"
        renderLabel={renderImageLabel('Max Reached', images3.length, 3)}>
        <ImageInput
          maxImages={3}
          value={images3}
        />
      </FormField>

      <FormField
        label="Required with Error"
        error="At least one photo is required"
        required={true}
        renderLabel={renderImageLabel('Required with Error', 0, 5)}>
        <ImageInput
          maxImages={5}
          value={[]}
        />
      </FormField>

      <FormField
        label="With Hint"
        hint="Upload up to 5 photos"
        renderLabel={renderImageLabel('With Hint', 0, 5)}>
        <ImageInput
          maxImages={5}
          value={[]}
        />
      </FormField>

      <FormField
        label="Disabled"
        disabled={true}
        renderLabel={renderImageLabel('Disabled', images2.length, 5)}>
        <ImageInput
          maxImages={5}
          value={images2}
          disabled={true}
        />
      </FormField>
    </View>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
