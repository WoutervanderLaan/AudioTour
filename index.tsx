/* eslint-disable local/enforce-feature-structure */
/* eslint-disable simple-import-sort/imports */
import '@expo/metro-runtime' // Necessary for Fast Refresh on Web
import '@/themes/unistyles' // Must be imported before any react-native-unistyles usage

import {registerRootComponent} from 'expo'

import {StoryBookSwitch, App} from '@/app/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(__DEV__ ? StoryBookSwitch : App)
