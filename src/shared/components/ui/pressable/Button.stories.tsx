import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'

import {Button} from './Button'

import {Label} from '@/shared/components/ui/typography/Label'

const meta = {
  title: 'Pressable/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta

/**
 * Story
 * Storybook story type for Button component
 */
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: <Label>Primary Button</Label>,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: <Label>Secondary Button</Label>,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: <Label>Disabled Button</Label>,
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    variant: 'primary',
    children: <Label>Tap to log</Label>,
    onPress: (): void => {
      // eslint-disable-next-line no-console
      console.log('Button pressed!')
    },
  },
}
