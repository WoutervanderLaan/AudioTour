import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'

import {LinkButton} from './LinkButton'
import {logger} from '@/core/lib/logger'

const meta = {
  title: 'Pressable/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
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
