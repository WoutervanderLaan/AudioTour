import type {Meta} from '@storybook/react-native-web-vite'

import {PressableBase} from './PressableBase'

import {logger} from '@/core/lib/logger/logger'
import {Text} from '@/shared/components/ui/typography/Text'
import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Pressable/PressableBase',
  component: PressableBase,
  tags: ['autodocs'],
} satisfies Meta<typeof PressableBase>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    children: <Text.Label testID="StoryText">Press me</Text.Label>,
    testID: 'StoryPressable',
  },
}

export const WithOnPress: Story<typeof meta> = {
  args: {
    children: <Text.Label testID="StoryText">Tap to log</Text.Label>,
    onPress: (): void => {
      logger.debug('Pressed!')
    },
    testID: 'StoryPressable',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    children: <Text.Label testID="StoryText">Disabled</Text.Label>,
    disabled: true,
    testID: 'StoryPressable',
  },
}
