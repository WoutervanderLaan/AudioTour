import {HistoryDetailScreen} from './screens/HistoryDetailScreen'
import {HistoryScreen} from './screens/HistoryScreen'

import {
  type StackNavigationRoutes,
  type TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  HistoryRouteName,
  type HistoryStackParams,
  HistoryTabName,
  type HistoryTabParams,
} from '@/modules/history/routes.types'

/**
 * History stack screen configurations
 * Defines the stack navigator screens for the history module.
 */
export const historyStacks: StackNavigationRoutes<
  HistoryStackParams,
  HistoryRouteName
> = {
  [HistoryRouteName.list]: {
    component: HistoryScreen,
    name: HistoryRouteName.list,
    options: {
      headerShown: true,
      headerTitle: 'History',
    },
  },
  [HistoryRouteName.detail]: {
    component: HistoryDetailScreen,
    name: HistoryRouteName.detail,
    options: {
      headerShown: true,
      headerTitle: 'Tour Details',
    },
  },
}

/**
 * History tab screen configurations
 * Defines the bottom tab navigator screen for the history module.
 */
export const historyTabs: TabNavigationRoutes<
  HistoryTabParams,
  HistoryTabName
> = {
  [HistoryTabName.history]: {
    component: HistoryScreen,
    name: HistoryTabName.history,
    icon: 'history',
    options: {
      headerShown: true,
      headerTitle: 'History',
    },
  },
}
