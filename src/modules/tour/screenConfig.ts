import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  TourModalName,
  TourModalParams,
  TourRouteName,
  TourStackParams,
  TourTabName,
  TourTabParams,
} from '@/modules/tour/routes.types'

/**
 * Tour stack screen configurations
 * Placeholder - screens will be added as they are implemented
 */
export const tourStacks: StackNavigationRoutes<
  TourStackParams,
  TourRouteName
> = {} as StackNavigationRoutes<TourStackParams, TourRouteName>

/**
 * Tour tab screen configurations
 * Placeholder - tabs will be added as they are implemented
 */
export const tourTabs: TabNavigationRoutes<TourTabParams, TourTabName> =
  {} as TabNavigationRoutes<TourTabParams, TourTabName>

/**
 * Tour modal screen configurations
 * Placeholder - modals will be added as they are implemented
 */
export const tourModals: StackNavigationRoutes<
  TourModalParams,
  TourModalName
> = {} as StackNavigationRoutes<TourModalParams, TourModalName>
