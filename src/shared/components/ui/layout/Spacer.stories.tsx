import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Text} from '../typography'
import {Box} from './Box'
import {Column} from './Column'
import {Spacer} from './Spacer'

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.text.secondary,
  },
  demoBox: {
    ...theme.styles.border.sharp,
    backgroundColor: theme.color.screen.background.default,
  },
}))

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  decorators: [
    (Story): React.JSX.Element => (
      <Column
        testID="StoryColumn"
        style={styles.container}>
        <Box
          testID="StoryBox"
          padding="sm"
          style={styles.demoBox}
          center>
          <Text.Label testID="StoryText">This is a Spacer</Text.Label>
        </Box>
        <Story />
        <Box
          testID="StoryBox"
          padding="sm"
          style={styles.demoBox}
          center>
          <Text.Label testID="StoryText">This is a Spacer</Text.Label>
        </Box>
      </Column>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Spacer>

export default meta

/**
 * Story
 * Type definition for Spacer component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'xxl',
    testID: 'StorySpacer',
  },
}
