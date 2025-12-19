import type {Meta} from '@storybook/react-native-web-vite'

import {Box} from '@/shared/components/ui/layout/Box'
import {AddPhoto} from './AddPhoto'

const meta = {
  title: 'UI/AddPhoto',
  component: AddPhoto,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof AddPhoto>

export default meta

export const Small = {
  render: (): React.JSX.Element => (
    <AddPhoto
      size="sm"
      onPress={() => {}}
    />
  ),
}

export const Medium = {
  render: (): React.JSX.Element => <AddPhoto onPress={() => {}} />,
}

export const Large = {
  render: (): React.JSX.Element => (
    <AddPhoto
      size="lg"
      onPress={() => {}}
    />
  ),
}

export const Disabled = {
  render: (): React.JSX.Element => (
    <AddPhoto
      size="lg"
      disabled
      onPress={() => {}}
    />
  ),
}
