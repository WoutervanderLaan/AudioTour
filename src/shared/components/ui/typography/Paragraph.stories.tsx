import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Paragraph} from './Paragraph'

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>

export default meta

/**
 * Story
 * TODO: describe what this type represents.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Paragraph',
  },
}
