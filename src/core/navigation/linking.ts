import type {LinkingOptions, PathConfigMap} from '@react-navigation/native'
import {createURL} from 'expo-linking'

import {moduleRegistry} from './ModuleRegistry'
import type {HomeTabsParamList, RootStackParamList} from './types'

import {logger} from '@/core/lib/logger'

const prefix = createURL('/')

/**
 * Builds the linking configuration dynamically from module routes.
 * This function gathers all routes from registered modules and generates
 * the deep linking paths based on their linking configuration.
 *
 * @returns Deep linking configuration for React Navigation
 */
const buildLinkingConfig = (): LinkingOptions<RootStackParamList> => {
  const tabRoutes = moduleRegistry.getTabRoutes()
  const rootStackRoutes = moduleRegistry.getRootStackRoutes()

  // Build tab screens config from module tab routes
  const tabScreens: PathConfigMap<HomeTabsParamList> = Object.fromEntries(
    tabRoutes.map(route => {
      const path = route.linking?.path || route.name.toLowerCase()
      logger.debug(`Registering tab deep link: ${route.name} -> ${path}`)
      return [route.name, path]
    }),
  ) as PathConfigMap<HomeTabsParamList>

  // Build root stack screens config from module stack/modal routes
  const rootScreens: PathConfigMap<Omit<RootStackParamList, 'HomeTabs'>> =
    Object.fromEntries(
      rootStackRoutes.map(route => {
        const path = route.linking?.path || route.name.toLowerCase()
        logger.debug(`Registering stack deep link: ${route.name} -> ${path}`)
        return [route.name, path]
      }),
    ) as PathConfigMap<Omit<RootStackParamList, 'HomeTabs'>>

  return {
    prefixes: [prefix],
    enabled: true,
    config: {
      screens: {
        HomeTabs: {
          path: '',
          screens: tabScreens,
        },
        ...rootScreens,
      },
    },
  }
}

/**
 * Deep linking configuration for the application.
 * Dynamically generated from module routes to ensure consistency
 * between route definitions and deep linking paths.
 *
 * Each module defines its own linking paths in the route configuration,
 * and this system automatically builds the complete linking structure.
 */
export const linking = buildLinkingConfig()
