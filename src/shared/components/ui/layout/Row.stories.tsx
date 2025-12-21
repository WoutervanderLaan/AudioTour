import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Row} from './Row'
import {Box} from './Box'

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

export const Default: Story = {
  args: {
    children: (
      <>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 2, borderColor: 'black'}}>
          This is a Row (1)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 2, borderColor: 'black'}}>
          This is a Row (2)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 2, borderColor: 'black'}}>
          This is a Row (3)
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    style: {borderWidth: 2, borderColor: 'black'},
  },
}
