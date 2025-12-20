import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {LinkButton} from './LinkButton'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Pressable/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>

export default meta

/**
 * Story
 * Storybook story type for LinkButton component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Sign up',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Sign up',
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    label: 'Forgot password?',
    onPress: (): void => {
      logger.debug('LinkButton pressed!')
    },
  },
}
