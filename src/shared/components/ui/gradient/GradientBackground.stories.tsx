import React from 'react'

import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Box} from '../layout/Box'
import {Text} from '../typography'
import {GradientBackground} from './GradientBackground'

const meta = {
  title: 'Gradient/GradientBackground',
  component: GradientBackground,
  tags: ['autodocs'],
} satisfies Meta<typeof GradientBackground>

export default meta

/**
 * Story
 * Type definition for Spacer component Storybook stories.
 */
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colors: ['#ff0000', '#5eff00'],
    children: (
      <Box padding="xl">
        <Text.Title
          align="center"
          color="inverse">
          Gradient Background
        </Text.Title>
      </Box>
    ),
  },
}
