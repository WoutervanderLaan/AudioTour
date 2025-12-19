import type {Preview} from '@storybook/react-native'
import type {FC} from 'react'
import {StyleSheet} from 'react-native-unistyles'
import {themes} from '../src/themes/themes'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {color} from '../src/themes/tokens/color'
import {Box} from '../src/shared/components/ui/layout/Box'

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes,
})

const MainDecorator = (Story: FC) => (
  <SafeAreaProvider style={{flex: 1}}>
    <Box padding="md">
      <Story />
    </Box>
  </SafeAreaProvider>
)

const preview: Preview = {
  decorators: [MainDecorator],
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'custom-grey0',
          value: color.custom.grey0,
        },
        {
          name: 'primary-blue',
          value: color.primary.blue,
        },
        {
          name: 'primary-red',
          value: color.primary.red,
        },
        {
          name: 'primary-black',
          value: color.primary.black,
        },
        {
          name: 'secondary-yellow',
          value: color.primary.yellow,
        },
        {
          name: 'secondary-purple',
          value: color.secondary.purple,
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
