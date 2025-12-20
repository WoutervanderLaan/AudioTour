import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Button} from './Button'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Pressable/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

/**
 * Story
 * Storybook story type for Button component
 */
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    variant: 'primary',
    label: 'Tap to log',
    onPress: (): void => {
      logger.debug('Button pressed!')
    },
  },
}
