import type {StoryObj} from '@storybook/react-native-web-vite'

import type {PhotoGallery} from './PhotoGallery'

/**
 * Story
 * Storybook story type for FeedItem component
 */
export type Story = StoryObj<{
  title: string
  component: typeof PhotoGallery
  tags: string[]
}>
