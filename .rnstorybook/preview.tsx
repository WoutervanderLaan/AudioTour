import type {Preview} from '@storybook/react-native'
import type {FC} from 'react'
import {StyleSheet} from 'react-native-unistyles'
import {themes} from '../src/themes/themes'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {color} from '../src/themes/tokens/color'

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes,
})

const MainDecorator = (Story: FC) => (
  <SafeAreaProvider style={{flex: 1}}>
    <Story />
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
          value: color.secondary.yellow,
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
