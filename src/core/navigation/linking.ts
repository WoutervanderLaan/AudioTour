import type {LinkingOptions} from '@react-navigation/native'
import {createURL} from 'expo-linking'

import type {RootStackParams} from './types'

const prefix = createURL('/')

/**
 * Deep linking configuration for the application.
 * Defines URL prefixes and path mappings for navigation.
 * Typed with RootStackParams to ensure all routes are properly defined.
 */
export const linking: LinkingOptions<RootStackParams> = {
  prefixes: [prefix],
  enabled: true,
  config: {
    screens: {
      Capture: 'capture',
      Museum: 'museum',
      Recommendations: 'recommendations',
      Login: 'login',
      Register: 'register',
      ObjectDetail: 'object/:id',
      Narrative: 'narrative/:id',
      Settings: 'settings',
      NotFound: '*',
    },
  },
}
