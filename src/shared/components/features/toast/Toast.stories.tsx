import type {Meta, StoryObj} from '@storybook/react-native'
import {View} from 'react-native'
import {Toast, ToastType} from './Toast'

const meta = {
  title: 'Features/Toast',
  component: Toast,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 40,
          justifyContent: 'center',
        }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {message: 'Hello, World!', type: ToastType.INFO},
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    message: 'Hello, World!',
    type: ToastType.INFO,
  },
}

export const Error: Story = {
  args: {
    message: 'Error: Something went wrong',
    type: ToastType.ERROR,
  },
}

export const Success: Story = {
  args: {
    message: 'Well done! Operation successful',
    type: ToastType.SUCCESS,
  },
}
