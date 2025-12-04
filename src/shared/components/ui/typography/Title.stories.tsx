import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Title} from './Title'

const meta = {
  title: 'Typography/Title',
  component: Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Title>

export default meta

/**
 * Story
 * Type definition for Title component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Title',
  },
}
