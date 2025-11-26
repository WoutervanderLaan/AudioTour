import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Column} from './Column'
import {Box} from './Box'

const meta = {
  title: 'Layout/Column',
  component: Column,
  tags: ['autodocs'],
} satisfies Meta<typeof Column>

export default meta

/**
 * Story
 * TODO: describe what this type represents.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 1, borderColor: 'black'}}>
          This is a Column (1)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 1, borderColor: 'black'}}>
          This is a Column (2)
        </Box>
        <Box
          padding="sm"
          flex={1}
          style={{borderWidth: 1, borderColor: 'black'}}>
          This is a Column (3)
        </Box>
      </>
    ),
    padding: 'sm',
    gap: 'sm',
    style: {borderWidth: 1, borderColor: 'black'},
  },
}
