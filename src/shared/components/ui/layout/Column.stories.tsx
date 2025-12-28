import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'
import {Column} from './Column'

import {Text} from '@/shared/components/ui/typography/Text'

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
    backgroundColor: theme.color.screen.background.default,
    ...theme.styles.border.sharp,
  },
}))

export const Default: Story = {
  args: {
    children: (
      <>
        <Box
          padding="md"
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Column (1)</Text.Label>
        </Box>
        <Box
          padding="md"
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Column (2)</Text.Label>
        </Box>
        <Box
          padding="md"
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Column (3)</Text.Label>
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    testID: 'StoryColumn',
    style: styles.demoBox,
  },
}
