import type {LinkingOptions, ParamListBase} from '@react-navigation/native'
import {createURL} from 'expo-linking'

const prefix = createURL('/')

/**
 * Deep linking configuration for the application.
 * Defines URL prefixes and path mappings for navigation.
 */
export const linking: LinkingOptions<ParamListBase> = {
  prefixes: [prefix],
  enabled: true,
  config: {
    screens: {
      HomeTabs: {
        path: '',
        screens: {
          Capture: 'capture',
          Museum: 'museum',
          Recommendations: 'recommendations',
        },
      },
      Login: 'login',
      Register: 'register',
      ObjectDetail: 'object/:id',
      Narrative: 'narrative/:id',
      Settings: 'settings',
      NotFound: '*',
    },
  },
}
