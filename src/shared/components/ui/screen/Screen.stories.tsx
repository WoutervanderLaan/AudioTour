import {View} from 'react-native'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Paragraph, Title} from '@/shared/components/ui/typography'

import {Screen} from './Screen'

const meta = {
  title: 'UI/Screen',
  component: Screen,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <View style={{height: 400}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Screen>

export default meta

/**
 * Story
 * Type definition for Screen component stories
 */
type Story = StoryObj<typeof meta>

/**
 * Default
 * Default screen with standard padding and gutters
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <Title>Screen Title</Title>
        <Paragraph>
          This is a default screen with standard gutters and padding.
        </Paragraph>
      </>
    ),
  },
}

/**
 * Scrollable
 * Screen with scrollable content
 */
export const Scrollable: Story = {
  args: {
    scroll: true,
    children: (
      <>
        <Title>Scrollable Screen</Title>
        <Paragraph>
          This screen has scrollable content. You can add as much content as you
          need and it will scroll vertically.
        </Paragraph>
        {Array.from({length: 10}).map((_, i) => (
          <Paragraph key={i}>Paragraph {i + 1}</Paragraph>
        ))}
      </>
    ),
  },
}

/**
 * NoGutters
 * Screen without any gutters or padding
 */
export const NoGutters: Story = {
  args: {
    gutterTop: false,
    gutterBottom: false,
    gutterHorizontal: false,
    children: (
      <>
        <Title>No Gutters</Title>
        <Paragraph>This screen has no gutters or padding.</Paragraph>
      </>
    ),
  },
}

/**
 * CustomBackground
 * Screen with settings background color
 */
export const CustomBackground: Story = {
  args: {
    backgroundColor: 'settings',
    children: (
      <>
        <Title>Settings Background</Title>
        <Paragraph>This screen uses the settings background color.</Paragraph>
      </>
    ),
  },
}

/**
 * WithTopInset
 * Screen with top safe area inset included
 */
export const WithTopInset: Story = {
  args: {
    withTopInset: true,
    children: (
      <>
        <Title>With Top Inset</Title>
        <Paragraph>
          This screen includes the top safe area inset, useful for full-screen
          content.
        </Paragraph>
      </>
    ),
  },
}

/**
 * NoBottomInset
 * Screen without bottom safe area inset
 */
export const NoBottomInset: Story = {
  args: {
    withBottomInset: false,
    children: (
      <>
        <Title>No Bottom Inset</Title>
        <Paragraph>
          This screen does not include the bottom safe area inset.
        </Paragraph>
      </>
    ),
  },
}

/**
 * KeyboardAvoiding
 * Screen with keyboard avoiding view enabled
 */
export const KeyboardAvoiding: Story = {
  args: {
    keyboardAvoidingView: true,
    scroll: true,
    children: (
      <>
        <Title>Keyboard Avoiding</Title>
        <Paragraph>
          This screen has keyboard avoidance enabled, useful for forms.
        </Paragraph>
      </>
    ),
  },
}
