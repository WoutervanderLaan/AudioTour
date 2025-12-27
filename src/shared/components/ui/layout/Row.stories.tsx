import {StyleSheet} from 'react-native-unistyles'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'
import {Row} from './Row'

import {Text} from '@/shared/components/ui/typography'

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
    ...theme.styles.border.sharp,
  },
}))

export const Default: Story = {
  args: {
    children: (
      <>
        <Box
          padding="sm"
          flex={1}
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Row (1)</Text.Label>
        </Box>
        <Box
          padding="sm"
          flex={1}
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Row (2)</Text.Label>
        </Box>
        <Box
          padding="sm"
          flex={1}
          center
          testID="StoryBox"
          style={styles.demoBox}>
          <Text.Label testID="StoryText">This is a Row (3)</Text.Label>
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    testID: 'StoryRow',
    style: styles.demoBox,
  },
}
