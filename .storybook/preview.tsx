import type {Preview} from '@storybook/react-native-web-vite'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'
import {themes} from '../src/themes/themes'
import type {FC} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {color} from '../src/themes/tokens/color'
import {View} from 'react-native'

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes,
})

const MainDecorator = (Story: FC) => {
  const {theme} = useUnistyles()

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          padding: theme.size.lg,
          minHeight: theme.size.xxl,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Story />
      </View>
    </SafeAreaProvider>
  )
}

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
        date: /Date$/i,
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    initialGlobals: {
      viewport: {value: 'iphonex', isRotated: false},
    },
  },
}

export default preview
