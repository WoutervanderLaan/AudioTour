import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'

import {RadioGroup, type RadioOption} from './RadioGroup'

import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{padding: 20}}>
        <Story />
      </View>
    ),
  ],
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
    // label: 'Theme Preference',
  },
}

export const WithDescriptions: Story = {
  args: {
    options: notificationOptions,
    // label: 'Notification Settings',
  },
}

export const WithHint: Story = {
  args: {
    options: themeOptions,
    // label: 'Theme',
    // hint: 'Choose your preferred color scheme',
  },
}

export const WithError: Story = {
  args: {
    options: themeOptions,
    // label: 'Theme',
    // error: 'Please select a theme',
  },
}

export const Required: Story = {
  args: {
    options: themeOptions,
    // label: 'Theme',
    // required: true,
  },
}

export const Disabled: Story = {
  args: {
    options: themeOptions,
    // label: 'Theme',
    disabled: true,
    value: 'dark',
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      {value: 'light', label: 'Light'},
      {value: 'dark', label: 'Dark', disabled: true},
      {value: 'auto', label: 'Auto'},
    ],
    // label: 'Theme',
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
    <View style={{gap: 16}}>
      <RadioGroup
        options={themeOptions}
        // label="Theme Preference"
        value={value}
        onChange={setValue}
        // hint="Your selection will be displayed below"
      />
      {!!value && <Text.Paragraph>Selected: {value}</Text.Paragraph>}
    </View>
  )
}

export const Interactive = {
  render: () => <InteractiveWrapper />,
}
