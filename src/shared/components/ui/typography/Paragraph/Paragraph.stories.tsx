import type {Meta} from '@storybook/react-native-web-vite'

import {Text} from '../Text'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Typography/Paragraph',
  component: Text.Paragraph,
  tags: ['autodocs'],
} satisfies Meta<typeof Text.Paragraph>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    children: 'This is a Paragraph',
    testID: 'StoryText',
  },
}
