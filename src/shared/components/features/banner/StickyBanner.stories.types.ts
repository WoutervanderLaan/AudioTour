import type {StoryObj} from '@storybook/react-native-web-vite'

import type {StickyBanner} from './StickyBanner'

/**
 * Story
 * Storybook story type for StickyBanner component
 */
export type Story = StoryObj<{
  title: string
  component: typeof StickyBanner
  tags: string[]
}>
