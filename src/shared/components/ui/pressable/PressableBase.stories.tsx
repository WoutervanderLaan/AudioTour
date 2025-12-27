import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {PressableBase} from './PressableBase'

import {logger} from '@/core/lib/logger/logger'
import {Text} from '@/shared/components/ui/typography/Text'

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
    children: <Text.Label testID="StoryText">Press me</Text.Label>,
    testID: 'StoryPressable',
  },
}

export const WithOnPress: Story = {
  args: {
    children: <Text.Label testID="StoryText">Tap to log</Text.Label>,
    onPress: (): void => {
      logger.debug('Pressed!')
    },
    testID: 'StoryPressable',
  },
}

export const Disabled: Story = {
  args: {
    children: <Text.Label testID="StoryText">Disabled</Text.Label>,
    disabled: true,
    testID: 'StoryPressable',
  },
}
