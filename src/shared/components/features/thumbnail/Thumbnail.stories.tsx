import type {Meta} from '@storybook/react-native-web-vite'

import {Thumbnail} from './Thumbnail'
import {logger} from '@/core/lib/logger/logger'

const meta = {
  title: 'Features/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    deletable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Thumbnail>

export default meta

export const Small = {
  render: (): React.JSX.Element => (
    <Thumbnail
      testID="StorySmallThumbnail"
      size="sm"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const Medium = {
  render: (): React.JSX.Element => (
    <Thumbnail
      testID="StoryMediumThumbnail"
      size="md"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const Large = {
  render: (): React.JSX.Element => (
    <Thumbnail
      testID="StoryLargeThumbnail"
      size="lg"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const WithDelete = {
  render: (): React.JSX.Element => (
    <Thumbnail
      testID="StoryWithDeleteThumbnail"
      size="md"
      source={{uri: 'https://picsum.photos/200/200'}}
      deletable
      onDelete={(): void => {
        logger.debug('Thumbnail delete pressed!')
      }}
    />
  ),
}
