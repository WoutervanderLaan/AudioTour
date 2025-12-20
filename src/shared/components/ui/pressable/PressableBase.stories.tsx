import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {PressableBase} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Pressable/PressableBase',
  component: PressableBase,
  tags: ['autodocs'],
} satisfies Meta<typeof PressableBase>

export default meta

/**
 * Story
 * Storybook story type for PressableBase component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Text.Label>Press me</Text.Label>,
  },
}

export const WithOnPress: Story = {
  args: {
    children: <Text.Label>Tap to log</Text.Label>,
    onPress: (): void => {
      logger.debug('Pressed!')
    },
  },
}

export const Disabled: Story = {
  args: {
    children: <Text.Label>Disabled</Text.Label>,
    disabled: true,
  },
}
