import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {AudioPlayer} from './AudioPlayer'

const meta = {
  title: 'Features/AudioPlayer',
  component: AudioPlayer,
  tags: ['autodocs'],
} satisfies Meta<typeof AudioPlayer>

export default meta

/**
 * Story
 * Storybook story type for AudioPlayer component
 */
type Story = StoryObj<typeof meta>

const mockAudioUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const mockAudioUrl2 =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'

export const Default: Story = {
  args: {
    testID: 'StoryDefaultAudioPlayer',
    src: mockAudioUrl,
  },
}

export const DifferentAudioSource: Story = {
  args: {
    testID: 'StoryDifferentSourceAudioPlayer',
    src: mockAudioUrl2,
  },
}

export const InvalidUrl: Story = {
  args: {
    testID: 'StoryInvalidUrlAudioPlayer',
    src: 'https://invalid-url-that-does-not-exist.com/audio.mp3',
  },
}

export const LocalFileUrl: Story = {
  args: {
    testID: 'StoryLocalFileAudioPlayer',
    src: 'file:///path/to/local/audio.mp3',
  },
}
