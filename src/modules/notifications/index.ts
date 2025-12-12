import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {notificationModals, notificationStacks} from './screenConfig'
import {notificationService} from './services/notificationService'
import {useNotificationStore} from './store/useNotificationStore'

import {logger} from '@/core/lib/logger'

/**
 * Notifications module configuration.
 * Handles push notification management including permission requests,
 * device registration, and notification preferences.
 *
 * Includes:
 * - Stack screens: NotificationSettings
 * - Modal screens: NotificationPermission
 */
export const notificationsModule: ModuleConfig = {
  name: ModuleSlug.notifications,
  version: '1.0.0',
  enabled: true,

  stacks: notificationStacks,
  modals: notificationModals,
  tabs: {},

  dependencies: [ModuleSlug.auth],

  onRegister: () => {
    logger.debug('Notifications Module registered')
  },

  onUnregister: () => {
    logger.debug('Notifications Module unregistered')
    useNotificationStore.getState().reset()
  },

  onAppStart: async () => {
    logger.debug('[Notifications Module] Initializing...')
    useNotificationStore.getState().initialize()

    // Initialize notification service with event handlers
    try {
      await notificationService.initialize({
        onForegroundEvent: event => {
          logger.debug('[Notifications] Foreground event:', event.type)
          // Handle foreground notification events (e.g., show in-app toast)
        },
        onBackgroundEvent: event => {
          logger.debug('[Notifications] Background event:', event.type)
          // Handle background notification events (e.g., update badge count)
          return Promise.resolve()
        },
      })

      // Check for initial notification (app launched from notification)
      const initialNotification =
        await notificationService.getInitialNotification()
      if (initialNotification) {
        logger.debug(
          '[Notifications] App launched from notification:',
          initialNotification,
        )
        // Handle deep linking from notification
      }
    } catch (error) {
      logger.error('[Notifications] Failed to initialize service:', error)
    }
  },
}
