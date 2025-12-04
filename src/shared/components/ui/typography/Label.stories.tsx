import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Label} from './Label'

const meta = {
  title: 'Typography/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta

/**
 * Story
 * Type definition for Label component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a Label',
  },
}
