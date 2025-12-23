import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Checkbox} from './Checkbox'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

/**
 * Story
 * Storybook story type for Checkbox component
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    hasError: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'This option is already selected',
    checked: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    accessibilityLabel: 'Select item',
  },
}
