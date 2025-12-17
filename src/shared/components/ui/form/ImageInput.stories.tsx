import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'

import {ImageInput} from './ImageInput'

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

export const Default: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    value: [],
  },
}

export const WithImages: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    value: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ],
  },
}

export const MaxImagesReached: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 3,
    value: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
    ],
  },
}

export const Required: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    required: true,
    value: [],
    hint: 'At least one photo is required',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Museum Object Photos',
    maxImages: 5,
    value: [],
    hint: 'Upload up to 5 photos of the museum object',
  },
}

export const WithError: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    value: [],
    error: 'At least one photo is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    disabled: true,
    value: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ],
  },
}

export const SingleImageMode: Story = {
  args: {
    label: 'Profile Photo',
    maxImages: 1,
    value: [],
    hint: 'Upload a single profile photo',
  },
}

export const SingleImageWithValue: Story = {
  args: {
    label: 'Profile Photo',
    maxImages: 1,
    value: ['https://picsum.photos/200/200?random=1'],
  },
}

export const SmallThumbnails: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    thumbnailSize: 'sm',
    value: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ],
  },
}

export const LargeThumbnails: Story = {
  args: {
    label: 'Upload Photos',
    maxImages: 5,
    thumbnailSize: 'lg',
    value: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
    ],
  },
}

export const NoLabel: Story = {
  args: {
    maxImages: 5,
    value: [],
  },
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

  const handleChange = (newImages: string[]): void => {
    setImages(newImages)

    // Validation
    if (newImages.length === 0) {
      setError('At least one photo is required')
    } else if (newImages.length > 3) {
      setError('Maximum 3 photos allowed')
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
      <ImageInput
        label="Upload Museum Object Photos"
        maxImages={3}
        value={images}
        onChange={handleChange}
        error={error}
        hint={!error ? 'Select 1-3 photos of the museum object' : undefined}
        required={true}
      />

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
      <ImageInput
        label="Empty"
        maxImages={5}
        value={images1}
        onChange={setImages1}
      />

      <ImageInput
        label="With Images"
        maxImages={5}
        value={images2}
      />

      <ImageInput
        label="Max Reached"
        maxImages={3}
        value={images3}
      />

      <ImageInput
        label="Required with Error"
        maxImages={5}
        value={[]}
        error="At least one photo is required"
        required={true}
      />

      <ImageInput
        label="With Hint"
        maxImages={5}
        value={[]}
        hint="Upload up to 5 photos"
      />

      <ImageInput
        label="Disabled"
        maxImages={5}
        value={images2}
        disabled={true}
      />
    </View>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
