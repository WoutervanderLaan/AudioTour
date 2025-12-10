import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Text} from './index'

const meta = {
  title: 'Typography/Label',
  component: Text.Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Text.Label>

export default meta

/**
 * Story
 * Type definition for Text.Label component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Text.Label',
  },
}
