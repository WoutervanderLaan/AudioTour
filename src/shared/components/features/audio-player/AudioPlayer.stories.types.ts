import type {StoryObj} from '@storybook/react-native-web-vite'

import type {AudioPlayer} from './AudioPlayer'

/**
 * Story
 * Storybook story type for AudioPlayer component
 */
export type Story = StoryObj<{
  title: string
  component: typeof AudioPlayer
  tags: string[]
}>
