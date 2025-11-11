import {StyleSheet} from 'react-native-unistyles'

import {themes} from './themes'

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes,
})
