import type {Meta} from '@storybook/react-native-web-vite'

import {Text} from '../Text'
import type {Story} from './Label.stories.types'

const meta = {
  title: 'Typography/Label',
  component: Text.Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Text.Label>

export default meta

export const Default: Story = {
  args: {
    children: 'This is a Text.Label',
    testID: 'StoryText',
  },
}
