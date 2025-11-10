/* eslint-disable local/enforce-feature-structure */
import '@expo/metro-runtime' // Necessary for Fast Refresh on Web
import '@/themes/unistyles' // Must be imported before any react-native-unistyles usage

import {registerRootComponent} from 'expo'

import {App} from './src/app/App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
