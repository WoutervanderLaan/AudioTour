import type {Meta} from '@storybook/react-native-web-vite'

import {IconButton} from './IconButton'

import {logger} from '@/core/lib/logger/logger'
import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Pressable/IconButton',
  component: IconButton,
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    name: 'person',
    size: 'md',
    testID: 'StoryIconButton',
  },
}

export const Small: Story<typeof meta> = {
  args: {
    name: 'settings',
    size: 'sm',
    testID: 'StoryIconButton',
  },
}

export const Large: Story<typeof meta> = {
  args: {
    name: 'menu',
    size: 'lg',
    testID: 'StoryIconButton',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    name: 'person',
    size: 'md',
    disabled: true,
    testID: 'StoryIconButton',
  },
}

export const WithOnPress: Story<typeof meta> = {
  args: {
    name: 'favorite',
    size: 'md',
    onPress: (): void => {
      logger.debug('IconButton pressed!')
    },
    testID: 'StoryIconButton',
  },
}
