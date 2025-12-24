import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {NavItem} from './NavItem'

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
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
    testID: 'StoryNavItem',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Profile',
    icon: 'person',
    testID: 'StoryNavItem',
  },
}

export const WithChevron: Story = {
  args: {
    label: 'Notifications',
    icon: 'notifications',
    testID: 'StoryNavItem',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Item',
    icon: 'block',
    disabled: true,
    testID: 'StoryNavItem',
  },
}
