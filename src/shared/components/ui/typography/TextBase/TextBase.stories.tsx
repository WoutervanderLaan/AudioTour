import type {Meta} from '@storybook/react-native-web-vite'

import {TextBase} from './TextBase'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Typography/TextBase',
  component: TextBase,
  tags: ['autodocs'],
} satisfies Meta<typeof TextBase>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    children: 'This is a TextBase',
    testID: 'StoryText',
  },
}
