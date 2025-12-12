import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {NavItem} from './NavItem'

import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20, gap: 16}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof NavItem>

export default meta

/**
 * Story
 * Storybook story type for NavItem component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Account Settings',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Profile',
    icon: 'person',
  },
}

export const WithChevron: Story = {
  args: {
    label: 'Notifications',
    icon: 'notifications',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Item',
    icon: 'block',
    disabled: true,
  },
}
