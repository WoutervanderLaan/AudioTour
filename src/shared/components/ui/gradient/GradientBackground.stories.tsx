import React from 'react'

import type {Meta} from '@storybook/react-native-web-vite'

import {Box} from '../layout/Box/Box'
import {Text} from '../typography/Text'
import {GradientBackground} from './GradientBackground'

import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Gradient/GradientBackground',
  component: GradientBackground,
  tags: ['autodocs'],
} satisfies Meta<typeof GradientBackground>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    colors: ['#ff0000', '#5eff00'],
    children: (
      <Box
        padding="xl"
        testID="StoryBox">
        <Text.Title
          testID="StoryText"
          align="center"
          color="inverse">
          Gradient Background
        </Text.Title>
      </Box>
    ),
    testID: 'StoryGradientBackground',
  },
}
