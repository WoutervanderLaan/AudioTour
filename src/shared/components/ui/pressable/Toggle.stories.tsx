import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'

import {Toggle} from './Toggle'

import {Label} from '@/shared/components/ui/typography/Label'

const meta = {
  title: 'Pressable/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Toggle>

export default meta

/**
 * Story
 * Storybook story type for Toggle component
 */
type Story = StoryObj<typeof meta>

export const Inactive: Story = {
  args: {
    active: false,
    children: <Label>Inactive Toggle</Label>,
  },
}

export const Active: Story = {
  args: {
    active: true,
    children: <Label>Active Toggle</Label>,
  },
}

export const Disabled: Story = {
  args: {
    active: false,
    children: <Label>Disabled Toggle</Label>,
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    active: false,
    children: <Label>Tap to log</Label>,
    onPress: (): void => {
      // eslint-disable-next-line no-console
      console.log('Toggle pressed!')
    },
  },
}
