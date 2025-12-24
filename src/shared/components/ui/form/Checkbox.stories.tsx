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
    testID: 'StoryDefaultCheckbox',
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    testID: 'StoryCheckedCheckbox',
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Required: Story = {
  args: {
    testID: 'StoryRequiredCheckbox',
    label: 'I agree to the privacy policy',
    required: true,
  },
}

export const WithError: Story = {
  args: {
    testID: 'StoryWithErrorCheckbox',
    label: 'Accept terms and conditions',
    hasError: true,
  },
}

export const Disabled: Story = {
  args: {
    testID: 'StoryDisabledCheckbox',
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    testID: 'StoryDisabledCheckedCheckbox',
    label: 'This option is already selected',
    checked: true,
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    testID: 'StoryNoLabelCheckbox',
    accessibilityLabel: 'Select item',
  },
}
