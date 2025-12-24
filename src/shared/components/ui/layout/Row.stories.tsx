import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'
import {Row} from './Row'

const meta = {
  title: 'Layout/Row',
  component: Row,
  tags: ['autodocs'],
} satisfies Meta<typeof Row>

export default meta

/**
 * Story
 * Type definition for Row component Storybook stories.
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
          testID="StoryBox"
          style={styles.demoBox}>
          This is a Row (1)
        </Box>
        <Box
          padding="sm"
          flex={1}
          testID="StoryBox"
          style={styles.demoBox}>
          This is a Row (2)
        </Box>
        <Box
          padding="sm"
          flex={1}
          testID="StoryBox"
          style={styles.demoBox}>
          This is a Row (3)
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    testID: 'StoryRow',
    style: styles.demoBox,
  },
}
