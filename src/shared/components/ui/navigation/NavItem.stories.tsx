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
