import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {TextBase} from './TextBase'

const meta = {
  title: 'Typography/TextBase',
  component: TextBase,
  tags: ['autodocs'],
} satisfies Meta<typeof TextBase>

export default meta

/**
 * Story
 * Type definition for TextBase component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a TextBase',
    testID: 'StoryText',
  },
}
