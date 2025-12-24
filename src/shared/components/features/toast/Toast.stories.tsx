import type {Meta, StoryObj} from '@storybook/react-native'
import {Toast, ToastType} from './Toast'

const meta = {
  title: 'Features/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    testId: 'StoryInfoToast',
    message: 'Hello, World!',
    type: ToastType.INFO,
  },
}

export const Error: Story = {
  args: {
    testId: 'StoryErrorToast',
    message: 'Error: Something went wrong',
    type: ToastType.ERROR,
  },
}

export const Success: Story = {
  args: {
    testId: 'StorySuccessToast',
    message: 'Well done! Operation successful',
    type: ToastType.SUCCESS,
  },
}
