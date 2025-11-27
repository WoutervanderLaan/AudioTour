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
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    variant: 'primary',
    label: 'Tap to log',
    onPress: (): void => {
      // eslint-disable-next-line no-console
      console.log('Button pressed!')
    },
  },
}
