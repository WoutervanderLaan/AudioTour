import React, {useState} from 'react'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Column} from '../layout/Column'
import {RadioGroup, type RadioOption} from './RadioGroup'

import {Text} from '@/shared/components/ui/typography/Text'

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta

/**
 * Story
 * Storybook story type for RadioGroup component
 */
type Story = StoryObj<typeof meta>

const themeOptions: RadioOption[] = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
  {value: 'auto', label: 'Auto'},
]

const notificationOptions: RadioOption[] = [
  {
    value: 'all',
    label: 'All notifications',
    description: 'Receive all types of notifications',
  },
  {
    value: 'important',
    label: 'Important only',
    description: 'Only critical notifications',
  },
  {
    value: 'none',
    label: 'None',
    description: 'Disable all notifications',
  },
]

export const Default: Story = {
  args: {
    options: themeOptions,
    testID: 'StoryRadioGroup',
  },
}

export const WithDescriptions: Story = {
  args: {
    options: notificationOptions,
    testID: 'StoryRadioGroup',
  },
}

export const WithHint: Story = {
  args: {
    options: themeOptions,
    testID: 'StoryRadioGroup',
  },
}

export const WithError: Story = {
  args: {
    options: themeOptions,
    testID: 'StoryRadioGroup',
  },
}

export const Required: Story = {
  args: {
    options: themeOptions,
    testID: 'StoryRadioGroup',
  },
}

export const Disabled: Story = {
  args: {
    options: themeOptions,
    disabled: true,
    value: 'dark',
    testID: 'StoryRadioGroup',
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      {value: 'light', label: 'Light'},
      {value: 'dark', label: 'Dark', disabled: true},
      {value: 'auto', label: 'Auto'},
    ],
    testID: 'StoryRadioGroup',
  },
}

/**
 * InteractiveWrapper
 * Wrapper component for interactive stories
 *
 * @returns {React.JSX.Element} Interactive story component
 */
const InteractiveWrapper = (): React.JSX.Element => {
  const [value, setValue] = useState<string>()

  return (
    <Column
      gap="md"
      testID="StoryColumn">
      <RadioGroup
        testID="StoryRadioGroup"
        options={themeOptions}
        value={value}
        onChange={setValue}
      />
      {!!value && <Text.Label testID="StoryText">Selected: {value}</Text.Label>}
    </Column>
  )
}

export const Interactive = {
  render: () => <InteractiveWrapper />,
}
