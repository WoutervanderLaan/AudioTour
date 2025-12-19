import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {FeedItem} from './FeedItem'

import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import {logger} from '@/core/lib/logger'

const meta = {
  title: 'Tour/FeedItem',
  component: FeedItem,
  tags: ['autodocs'],
} satisfies Meta<typeof FeedItem>

export default meta

/**
 * Story
 * Storybook story type for FeedItem component
 */
type Story = StoryObj<typeof meta>

const mockPhoto1 = 'https://picsum.photos/seed/art1/400/400'
const mockPhoto2 = 'https://picsum.photos/seed/art2/400/400'
const mockPhoto3 = 'https://picsum.photos/seed/art3/400/400'
const mockPhoto4 = 'https://picsum.photos/seed/art4/400/400'
const mockPhoto5 = 'https://picsum.photos/seed/art5/400/400'

const mockAudioUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const baseFeedItem: FeedItemType = {
  id: '1',
  photos: [mockPhoto1],
  status: 'ready',
  createdAt: Date.now(),
}

export const Uploading: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'uploading',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const Processing: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'processing',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const GeneratingNarrative: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'generating_narrative',
      metadata: {
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
      },
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const GeneratingAudio: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'generating_audio',
      metadata: {
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
      },
      narrativeText:
        "The Starry Night is an iconic painting created by Vincent van Gogh in 1889. It depicts a swirling night sky over a quiet village, showcasing the artist's unique post-impressionist style.",
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const Ready: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'ready',
      metadata: {
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        year: '1889',
      },
      narrativeText:
        "The Starry Night is an iconic painting created by Vincent van Gogh in 1889. It depicts a swirling night sky over a quiet village, showcasing the artist's unique post-impressionist style.",
      audioUrl: mockAudioUrl,
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const Error: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'error',
      error: 'Failed to process image',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const MultiplePhotos: Story = {
  args: {
    item: {
      ...baseFeedItem,
      photos: [mockPhoto1, mockPhoto2, mockPhoto3],
      status: 'ready',
      metadata: {
        title: 'Sculpture Collection',
        artist: 'Various Artists',
      },
      narrativeText:
        'This collection features three remarkable sculptures from different periods and styles.',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const MoreThanFourPhotos: Story = {
  args: {
    item: {
      ...baseFeedItem,
      photos: [mockPhoto1, mockPhoto2, mockPhoto3, mockPhoto4, mockPhoto5],
      status: 'ready',
      metadata: {
        title: 'Museum Gallery Tour',
        artist: 'Multiple Artists',
      },
      narrativeText:
        'This gallery features an extensive collection of artworks from various periods.',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const WithoutMetadata: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'ready',
      narrativeText:
        "This artwork displays fascinating characteristics that showcase the artist's skill and vision.",
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

export const ReadyWithoutAudio: Story = {
  args: {
    item: {
      ...baseFeedItem,
      status: 'ready',
      metadata: {
        title: 'The Persistence of Memory',
        artist: 'Salvador Dalí',
      },
      narrativeText:
        'The Persistence of Memory is a surrealist painting by Salvador Dalí, featuring melting pocket watches in a dreamlike landscape.',
    },
    onPress: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}
