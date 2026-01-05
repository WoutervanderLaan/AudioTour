import type {Meta} from '@storybook/react-native-web-vite'

import {Checkbox} from './Checkbox'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    testID: 'StoryDefaultCheckbox',
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story<typeof meta> = {
  args: {
    testID: 'StoryCheckedCheckbox',
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Required: Story<typeof meta> = {
  args: {
    testID: 'StoryRequiredCheckbox',
    label: 'I agree to the privacy policy',
    required: true,
  },
}

export const WithError: Story<typeof meta> = {
  args: {
    testID: 'StoryWithErrorCheckbox',
    label: 'Accept terms and conditions',
  },
}

export const Disabled: Story<typeof meta> = {
  args: {
    testID: 'StoryDisabledCheckbox',
    label: 'This option is not available',
    disabled: true,
  },
}

export const DisabledChecked: Story<typeof meta> = {
  args: {
    testID: 'StoryDisabledCheckedCheckbox',
    label: 'This option is already selected',
    checked: true,
    disabled: true,
  },
}

export const NoLabel: Story<typeof meta> = {
  args: {
    testID: 'StoryNoLabelCheckbox',
    accessibilityLabel: 'Select item',
  },
}
