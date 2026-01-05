import type {Meta} from '@storybook/react-native'

import {Toast, ToastType} from './Toast'
import type {Story} from './Toast.stories.types'

const meta = {
  title: 'Features/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta

export const Info: Story = {
  args: {
    testID: 'StoryInfoToast',
    message: 'Hello, World!',
    type: ToastType.INFO,
  },
}

export const Error: Story = {
  args: {
    testID: 'StoryErrorToast',
    message: 'Error: Something went wrong',
    type: ToastType.WARNING,
  },
}

export const Success: Story = {
  args: {
    testID: 'StorySuccessToast',
    message: 'Well done! Operation successful',
    type: ToastType.SUCCESS,
  },
}
