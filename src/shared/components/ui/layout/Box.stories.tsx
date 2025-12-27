import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'

import {Text} from '@/shared/components/ui/typography'

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
} satisfies Meta<typeof Box>

export default meta

const styles = StyleSheet.create(theme => ({
  demoBox: {
    ...theme.styles.border.sharp,
  },
}))

/**
 * Story
 * Type definition for Box component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <Text.Label
        align="center"
        testID="StoryText">
        This is a Box
      </Text.Label>
    ),
    padding: 'xxl',
    style: styles.demoBox,
    testID: 'StoryBox',
  },
}
