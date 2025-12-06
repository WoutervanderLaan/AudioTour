import type {LinkingOptions, PathConfigMap} from '@react-navigation/native'
import {createURL} from 'expo-linking'

import {moduleRegistry} from './ModuleRegistry'
import type {HomeTabsParamList, RootStackParamList} from './types'

import {logger} from '@/core/lib/logger'
import type {ModuleRoute} from '@/shared/types/module'

const prefix = createURL('/')

/**
 * Validates a route's linking configuration and returns the path.
 * Ensures that routes have valid linking paths for deep linking.
 *
 * @param route - The route to validate
 * @returns The validated linking path
 */
const validateAndGetPath = (route: ModuleRoute): string => {
  const path = route.linking?.path || route.name.toLowerCase()

  // Warn about missing explicit linking paths
  if (!route.linking?.path) {
    logger.warn(
      `Route '${route.name}' has no explicit linking path. Using default: '${path}'. ` +
        `Consider adding a linking.path to the route definition for clarity.`,
    )
  }

  // Validate path format
  if (path.includes('//') || path.startsWith('/')) {
    logger.error(
      `Route '${route.name}' has invalid linking path '${path}'. ` +
        `Paths should not start with '/' or contain '//'. Using default: '${route.name.toLowerCase()}'`,
    )
    return route.name.toLowerCase()
  }

  return path
}

/**
 * Builds the linking configuration dynamically from module routes.
 * This function gathers all routes from registered modules and generates
 * the deep linking paths based on their linking configuration.
 *
 * IMPORTANT: This function is called at module initialization time, before the app starts.
 * All modules must be registered before this module loads. Dynamic module registration
 * after app initialization is not supported - the linking config is static once built.
 *
 * @returns Deep linking configuration for React Navigation
 */
const buildLinkingConfig = (): LinkingOptions<RootStackParamList> => {
  try {
    const tabRoutes = moduleRegistry.getTabRoutes()
    const rootStackRoutes = moduleRegistry.getRootStackRoutes()

    logger.info(
      `Building linking config: ${tabRoutes.length} tab routes, ${rootStackRoutes.length} root stack routes`,
    )

    // Build tab screens config from module tab routes
    const tabScreens: PathConfigMap<HomeTabsParamList> = Object.fromEntries(
      tabRoutes.map(route => {
        const path = validateAndGetPath(route)
        logger.debug(`Registering tab deep link: ${route.name} -> ${path}`)
        return [route.name, path]
      }),
    ) as PathConfigMap<HomeTabsParamList>

    // Build root stack screens config from module stack/modal routes
    const rootScreens: PathConfigMap<Omit<RootStackParamList, 'HomeTabs'>> =
      Object.fromEntries(
        rootStackRoutes.map(route => {
          const path = validateAndGetPath(route)
          logger.debug(`Registering stack deep link: ${route.name} -> ${path}`)
          return [route.name, path]
        }),
      ) as PathConfigMap<Omit<RootStackParamList, 'HomeTabs'>>

    logger.info('Linking configuration built successfully')

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
  } catch (error) {
    logger.error('Failed to build linking configuration:', error)
    // Return minimal config to prevent app crash
    return {
      prefixes: [prefix],
      enabled: true,
      config: {
        screens: {
          HomeTabs: {
            path: '',
            screens: {},
          },
        },
      },
    }
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
