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
      testId="StorySmallPressable"
      size="sm"
      onPress={() => {}}
    />
  ),
}

export const Medium = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testId="StoryMediumPressable"
      onPress={() => {}}
    />
  ),
}

export const Large = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testId="StoryLargePressable"
      size="lg"
      onPress={() => {}}
    />
  ),
}

export const Disabled = {
  render: (): React.JSX.Element => (
    <AddPhoto
      testId="StoryDisabledPressable"
      size="lg"
      disabled
      onPress={() => {}}
    />
  ),
}
