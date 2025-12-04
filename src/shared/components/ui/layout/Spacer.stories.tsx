import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Spacer} from './Spacer'
import {Column} from './Column'
import {Box} from './Box'
import React from 'react'

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  decorators: [
    Story => (
      <Column
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <Box
          padding="sm"
          style={{
            borderWidth: 1,
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
            borderWidth: 1,
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
