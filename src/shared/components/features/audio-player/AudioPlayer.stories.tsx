import type {Meta, StoryObj} from '@storybook/react-native'
import {View} from 'react-native'
import {AudioPlayer} from './AudioPlayer'

const meta = {
  title: 'Features/AudioPlayer',
  component: AudioPlayer,
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
  args: {src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
} satisfies Meta<typeof AudioPlayer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
}
