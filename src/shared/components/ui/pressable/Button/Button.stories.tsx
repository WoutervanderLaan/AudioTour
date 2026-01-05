import type {Meta} from '@storybook/react-native-web-vite'

import {Button} from './Button'

import {logger} from '@/core/lib/logger/logger'
import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Pressable/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

export const Primary: Story<typeof meta> = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
    testID: 'StoryButton',
  },
}

export const Secondary: Story<typeof meta> = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
    testID: 'StoryButton',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
    testID: 'StoryButton',
  },
}

export const WithOnPress: Story<typeof meta> = {
  args: {
    variant: 'primary',
    label: 'Tap to log',
    onPress: (): void => {
      logger.debug('Button pressed!')
    },
    testID: 'StoryButton',
  },
}
