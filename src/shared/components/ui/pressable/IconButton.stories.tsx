import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {IconButton} from './IconButton'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Pressable/IconButton',
  component: IconButton,
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta

/**
 * Story
 * Storybook story type for IconButton component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'person',
    size: 'md',
    testID: 'StoryIconButton',
  },
}

export const Small: Story = {
  args: {
    name: 'settings',
    size: 'sm',
    testID: 'StoryIconButton',
  },
}

export const Large: Story = {
  args: {
    name: 'menu',
    size: 'lg',
    testID: 'StoryIconButton',
  },
}

export const Disabled: Story = {
  args: {
    name: 'person',
    size: 'md',
    disabled: true,
    testID: 'StoryIconButton',
  },
}

export const WithOnPress: Story = {
  args: {
    name: 'favorite',
    size: 'md',
    onPress: (): void => {
      logger.debug('IconButton pressed!')
    },
    testID: 'StoryIconButton',
  },
}
