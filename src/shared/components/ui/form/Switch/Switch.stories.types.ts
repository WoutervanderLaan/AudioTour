import type {StoryObj} from '@storybook/react-native-web-vite'

import type {Switch} from './Switch'

/**
 * Story
 * Storybook story type for Switch component
 */
export type Story = StoryObj<{
  title: string
  component: typeof Switch
  tags: string[]
}>
