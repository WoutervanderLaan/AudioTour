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
  },
}

export const On: Story = {
  args: {
    label: 'Dark mode',
    value: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Accept terms and conditions',
    required: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Auto-save',
  },
}

export const WithError: Story = {
  args: {
    label: 'Enable location services',
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    label: 'This option is already enabled',
    value: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Toggle feature',
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
    <Column gap="lg">
      <Switch label="Default (off)" />
      <Switch
        label="On"
        value={true}
      />
      <Switch
        label="Required"
        required={true}
      />
      <Switch
        label="Disabled (off)"
        disabled={true}
      />
      <Switch
        label="Disabled (on)"
        value={true}
        disabled={true}
      />
    </Column>
  )
}

export const AllStates: Story = {
  render: (): React.JSX.Element => <AllStatesExample />,
}
