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
    rightContent: <MaterialIcons name="chevron-right" size={24} />,
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Messages',
    icon: 'mail',
    rightContent: (
      <View
        style={{
          backgroundColor: '#ff0000',
          borderRadius: 10,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}>
        <Text.Label color="link">3</Text.Label>
      </View>
    ),
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Item',
    icon: 'block',
    disabled: true,
  },
}

export const WithOnPress: Story = {
  args: {
    label: 'Tap to log',
    icon: 'touch-app',
    onPress: (): void => {
      // eslint-disable-next-line no-console
      console.log('NavItem pressed!')
    },
    rightContent: <MaterialIcons name="chevron-right" size={24} />,
  },
}
