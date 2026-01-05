import type {StoryObj} from '@storybook/react-native-web-vite'

import type {Text} from '../Text'

/**
 * Story
 * Type definition for Text.Label component Storybook stories.
 */
export type Story = StoryObj<{
  title: string
  component: typeof Text.Label
  tags: string[]
}>
