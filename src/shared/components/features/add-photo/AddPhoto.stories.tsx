import type {Meta} from '@storybook/react-native-web-vite'

import {AddPhoto} from './AddPhoto'

const meta = {
  title: 'Features/AddPhoto',
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
      testID="StorySmallAddPhoto"
      size="sm"
      onPress={() => {}}
    />
  ),
}

export const Medium = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testID="StoryMediumAddPhoto"
      onPress={() => {}}
    />
  ),
}

export const Large = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testID="StoryLargeAddPhoto"
      size="lg"
      onPress={() => {}}
    />
  ),
}

export const Disabled = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testID="StoryDisabledAddPhoto"
      size="lg"
      disabled
      onPress={() => {}}
    />
  ),
}
