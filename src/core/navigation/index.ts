/**
 * Navigation module exports
 * Provides centralized access to navigation types, utilities, and configuration
 */

// Type exports
export type {
  HomeTabsParamList,
  HomeTabsScreenProps,
  RootStackParamList,
  RootStackScreenProps,
} from './types'

// Navigator exports
export {RootNavigator} from './RootNavigator'
export {TabNavigator} from './TabNavigator'

// Module registry exports
export {moduleRegistry} from './ModuleRegistry'

// Linking configuration
export {linking} from './linking'

// Navigation type utilities
export type {ExtractParamList} from './navigationTypes'
export {buildParamList} from './navigationTypes'
