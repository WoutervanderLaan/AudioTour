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
    testId: 'StoryDefaultCheckbox',
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    testId: 'StoryCheckedCheckbox',
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Required: Story = {
  args: {
    testId: 'StoryRequiredCheckbox',
    label: 'I agree to the privacy policy',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    testId: 'StoryWithErrorCheckbox',
    label: 'Accept terms and conditions',
    hasError: true,
  },
}

export const Disabled: Story = {
  args: {
    testId: 'StoryDisabledCheckbox',
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    testId: 'StoryDisabledCheckedCheckbox',
    label: 'This option is already selected',
    checked: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    testId: 'StoryNoLabelCheckbox',
    accessibilityLabel: 'Select item',
  },
}
