import React from 'react'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from './Box'
import {Column} from './Column'
import {Spacer} from './Spacer'

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  decorators: [
    (Story): React.JSX.Element => (
      <Column
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <Box
          padding="sm"
          style={{
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'white',
          }}
          center>
          This is a Spacer
        </Box>
        <Story />
        <Box
          padding="sm"
          style={{
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'white',
          }}
          center>
          This is a Spacer
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
  },
}
