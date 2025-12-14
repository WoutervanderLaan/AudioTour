import {
  NotificationModalName,
  type NotificationModalParams,
  NotificationRouteName,
  type NotificationStackParams,
} from './routes.types'
import {NotificationPermissionScreen} from './screens/NotificationPermissionScreen'
import {NotificationSettingsScreen} from './screens/NotificationSettingsScreen'

import {type StackNavigationRoutes} from '@/core/navigation/types'

/**
 * Stack screens for the notifications module.
 * Contains the notification settings screen.
 */
export const notificationStacks: StackNavigationRoutes<
  NotificationStackParams,
  NotificationRouteName
> = {
  [NotificationRouteName.settings]: {
    component: NotificationSettingsScreen,
    name: NotificationRouteName.settings,
    options: {
      headerShown: true,
      headerTitle: 'Notifications',
    },
  },
}

/**
 * Modal screens for the notifications module.
 * Contains the permission request modal.
 */
export const notificationModals: StackNavigationRoutes<
  NotificationModalParams,
  NotificationModalName
> = {
  [NotificationModalName.permission]: {
    component: NotificationPermissionScreen,
    name: NotificationModalName.permission,
    options: {
      headerShown: true,
      headerTitle: 'Enable Notifications',
      presentation: 'modal',
    },
  },
}
