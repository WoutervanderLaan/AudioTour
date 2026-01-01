import type {Meta} from '@storybook/react-native-web-vite'

import {LinkButton} from './LinkButton'

import {logger} from '@/core/lib/logger/logger'
import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Pressable/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    label: 'Sign up',
    testID: 'StoryLinkButton',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    label: 'Sign up',
    disabled: true,
    testID: 'StoryLinkButton',
  },
}

export const WithOnPress: Story<typeof meta> = {
  args: {
    label: 'Forgot password?',
    onPress: (): void => {
      logger.debug('LinkButton pressed!')
    },
    testID: 'StoryLinkButton',
  },
}
