import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'

import {PressableBase} from './PressableBase'

import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Pressable/PressableBase',
  component: PressableBase,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PressableBase>

export default meta

/**
 * Story
 * Storybook story type for PressableBase component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Text.Label>Press me</Text.Label>,
  },
}

export const WithOnPress: Story = {
  args: {
    children: <Text.Label>Tap to log</Text.Label>,
    onPress: (): void => {
      // eslint-disable-next-line no-console
      console.log('Pressed!')
    },
  },
}

export const Disabled: Story = {
  args: {
    children: <Text.Label>Disabled</Text.Label>,
    disabled: true,
  },
}
