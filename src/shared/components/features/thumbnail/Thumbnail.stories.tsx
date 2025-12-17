import type {Meta} from '@storybook/react-native-web-vite'

import {Thumbnail} from './Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'

const meta = {
  title: 'UI/Thumbnail',
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
  decorators: [
    Story => (
      <Box
        center
        flex={1}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Thumbnail>

export default meta

export const Small = {
  render: (): React.JSX.Element => (
    <Thumbnail
      size="sm"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const Medium = {
  render: (): React.JSX.Element => (
    <Thumbnail
      size="md"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const Large = {
  render: (): React.JSX.Element => (
    <Thumbnail
      size="lg"
      source={{uri: 'https://picsum.photos/200/200'}}
    />
  ),
}

export const WithDelete = {
  render: (): React.JSX.Element => (
    <Thumbnail
      size="md"
      source={{uri: 'https://picsum.photos/200/200'}}
      deletable
      onDelete={(): void => {
        // eslint-disable-next-line no-console
        console.log('Thumbnail delete pressed!')
      }}
    />
  ),
}
