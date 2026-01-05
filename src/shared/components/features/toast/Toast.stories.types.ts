import type {StoryObj} from '@storybook/react-native'

import type {Toast} from './Toast'

/**
 * Story
 * Storybook story type for Toast component
 */
export type Story = StoryObj<{
  title: string
  component: typeof Toast
  tags: string[]
}>
