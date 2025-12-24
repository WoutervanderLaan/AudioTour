import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Text} from './index'

const meta = {
  title: 'Typography/Title',
  component: Text.Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Text.Title>

export default meta

/**
 * Story
 * Type definition for Title component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Title',
    testID: 'StoryText',
  },
}
