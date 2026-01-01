import type {Meta} from '@storybook/react-native-web-vite'

import {NavItem} from './NavItem'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
} satisfies Meta<typeof NavItem>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    label: 'Account Settings',
    testID: 'StoryNavItem',
  },
}

export const WithIcon: Story<typeof meta> = {
  args: {
    label: 'Profile',
    icon: 'person',
    testID: 'StoryNavItem',
  },
}

export const WithChevron: Story<typeof meta> = {
  args: {
    label: 'Notifications',
    icon: 'notifications',
    testID: 'StoryNavItem',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    label: 'Disabled Item',
    icon: 'block',
    disabled: true,
    testID: 'StoryNavItem',
  },
}
