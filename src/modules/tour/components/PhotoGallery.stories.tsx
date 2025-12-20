import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {PhotoGallery} from './PhotoGallery'

import {logger} from '@/core/lib/logger/logger'
import {useState} from 'react'

const meta = {
  title: 'Module/Tour/PhotoGallery',
  component: PhotoGallery,
  tags: ['autodocs'],
} satisfies Meta<typeof PhotoGallery>

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

export const Default: Story = {
  args: {
    photos: [mockPhoto1, mockPhoto2, mockPhoto3, mockPhoto4, mockPhoto5],
    activePhotoIndex: 0,
    onPhotoSelect: (): void => {
      logger.debug('Feed item pressed')
    },
  },
}

const InteractivePhotoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <PhotoGallery
      photos={[mockPhoto1, mockPhoto2, mockPhoto3, mockPhoto4, mockPhoto5]}
      activePhotoIndex={activeIndex}
      onPhotoSelect={i => setActiveIndex(i)}
    />
  )
}

export const Interactive = {
  render: InteractivePhotoGallery,
}
