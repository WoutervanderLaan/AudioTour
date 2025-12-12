import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {notificationModals, notificationStacks} from './screenConfig'
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

  onAppStart: () => {
    logger.debug('[Notifications Module] Initializing...')
    useNotificationStore.getState().initialize()
  },
}
