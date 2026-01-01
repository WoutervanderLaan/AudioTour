import React from 'react'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Column} from '../layout/Column'
import {Switch} from './Switch'

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta

/**
 * Story
 * Storybook story type for Switch component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    testID: 'StorySwitch',
  },
}

export const On: Story = {
  args: {
    label: 'Dark mode',
    value: true,
    testID: 'StorySwitch',
  },
}

export const Required: Story = {
  args: {
    label: 'Accept terms and conditions',
    required: true,
    testID: 'StorySwitch',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Auto-save',
    testID: 'StorySwitch',
  },
}

export const WithError: Story = {
  args: {
    label: 'Enable location services',
    testID: 'StorySwitch',
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
    testID: 'StorySwitch',
  },
}

export const DisabledOn: Story = {
  args: {
    label: 'This option is already enabled',
    value: true,
    disabled: true,
    testID: 'StorySwitch',
  },
}

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Toggle feature',
    testID: 'StorySwitch',
  },
}

/**
 * AllStatesExample
 * Displays all Switch states side by side
 *
 * @returns {React.JSX.Element} All states example component
 */
const AllStatesExample = (): React.JSX.Element => {
  return (
    <Column
      testID="StoryColumn"
      gap="lg">
      <Switch
        testID="StorySwitch"
        label="Default (off)"
      />
      <Switch
        testID="StorySwitch"
        label="On"
        value={true}
      />
      <Switch
        testID="StorySwitch"
        label="Required"
        required={true}
      />
      <Switch
        testID="StorySwitch"
        label="Disabled (off)"
        disabled={true}
      />
      <Switch
        testID="StorySwitch"
        label="Disabled (on)"
        value={true}
        disabled={true}
      />
    </Column>
  )
}

export const AllStates = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
