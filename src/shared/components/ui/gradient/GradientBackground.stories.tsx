import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {GradientBackground} from './GradientBackground'

import React from 'react'
import {Text} from '../typography'

const meta = {
  title: 'Gradient/GradientBackground',
  component: GradientBackground,
  decorators: [
    Story => (
      <GradientBackground style={{flex: 1, padding: 100}}>
        <Story />
      </GradientBackground>
    ),
  ],
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
    children: <Text.Label>Gradient Background</Text.Label>,
  },
}
