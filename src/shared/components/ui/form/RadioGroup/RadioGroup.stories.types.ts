import type {StoryObj} from '@storybook/react-native-web-vite'

import type {RadioGroup} from './RadioGroup'

/**
 * Story
 * Storybook story type for RadioGroup component
 */
export type Story = StoryObj<{
  title: string
  component: typeof RadioGroup
  tags: string[]
}>
