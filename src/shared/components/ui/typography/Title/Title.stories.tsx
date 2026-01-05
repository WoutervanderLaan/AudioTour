import type {Meta} from '@storybook/react-native-web-vite'

import {Text} from '../Text'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Typography/Title',
  component: Text.Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Text.Title>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    children: 'This is a Title',
    testID: 'StoryText',
  },
}
