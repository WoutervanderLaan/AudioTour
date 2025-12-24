import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'
import {Column} from './Column'

const meta = {
  title: 'Layout/Column',
  component: Column,
  tags: ['autodocs'],
} satisfies Meta<typeof Column>

export default meta

/**
 * Story
 * Type definition for Column component Storybook stories.
 */
type Story = StoryObj<typeof meta>

const styles = StyleSheet.create(theme => ({
  demoBox: {
    borderWidth: theme.size.xxs,
    borderColor: theme.color.text.default,
  },
}))

export const Default: Story = {
  args: {
    children: (
      <>
        <Box
          padding="sm"
          flex={1}
          style={styles.demoBox}>
          This is a Column (1)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={styles.demoBox}>
          This is a Column (2)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={styles.demoBox}>
          This is a Column (3)
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    style: styles.demoBox,
  },
}
