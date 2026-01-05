import {StyleSheet} from 'react-native-unistyles'

import type {Meta} from '@storybook/react-native-web-vite'

import {Box} from './Box'

import {Text} from '@/shared/components/ui/typography/Text'
import type {Story} from '@/shared/types/Story'

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
} satisfies Meta<typeof Box>

export default meta

const styles = StyleSheet.create(theme => ({
  demoBox: {
    backgroundColor: theme.color.screen.background.default,
    ...theme.styles.border.sharp,
  },
}))

export const Default: Story<typeof meta> = {
  args: {
    children: (
      <Text.Label
        align="center"
        testID="StoryText">
        This is a Box
      </Text.Label>
    ),
    padding: 'xxl',
    style: styles.demoBox,
    testID: 'StoryBox',
  },
}
