import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
} satisfies Meta<typeof Box>

export default meta

/**
 * Story
 * Type definition for Box component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Box',
    flex: 1,
    padding: 'xxl',
    style: {borderWidth: 1, borderColor: 'black'},
  },
}
