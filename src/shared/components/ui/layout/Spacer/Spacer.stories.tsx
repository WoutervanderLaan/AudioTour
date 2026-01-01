import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {Meta} from '@storybook/react-native-web-vite'

import {Box} from '../Box/Box'
import {Column} from '../Column/Column'
import {Spacer} from './Spacer'

import {Text} from '@/shared/components/ui/typography/Text'
import type {Story} from '@/shared/types/Story'

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.text.secondary,
  },
  demoBox: {
    ...theme.styles.border.sharp,
    backgroundColor: theme.color.screen.background.default,
  },
}))

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  decorators: [
    (Story): React.JSX.Element => (
      <Column
        testID="StoryColumn"
        style={styles.container}>
        <Box
          testID="StoryBox"
          padding="sm"
          style={styles.demoBox}
          center>
          <Text.Label testID="StoryText">This is a Spacer</Text.Label>
        </Box>
        <Story />
        <Box
          testID="StoryBox"
          padding="sm"
          style={styles.demoBox}
          center>
          <Text.Label testID="StoryText">This is a Spacer</Text.Label>
        </Box>
      </Column>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Spacer>

export default meta

export const Default: Story<typeof meta> = {
  args: {
    size: 'xxl',
    testID: 'StorySpacer',
  },
}
