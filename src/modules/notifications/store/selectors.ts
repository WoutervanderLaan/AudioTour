import {shallow} from 'zustand/shallow'

import {useNotificationStore} from './useNotificationStore'

/**
 * useDeviceToken
 * Selector hook for getting the device push notification token.
 *
 * @returns The device token for push notifications, or null if not registered
 */
export const useDeviceToken = () =>
  useNotificationStore(state => state.deviceToken)

/**
 * useNotificationRegistrationStatus
 * Selector hook for getting notification registration status.
 *
 * @returns True if device is registered for push notifications
 */
export const useNotificationRegistrationStatus = (): boolean =>
  useNotificationStore(state => state.isRegistered)

/**
 * useNotificationPermission
 * Selector hook for getting notification permission state.
 *
 * @returns Object containing permission request status and granted status
 */
export const useNotificationPermission = () =>
  useNotificationStore(
    state => ({
      hasRequestedPermission: state.hasRequestedPermission,
      permissionGranted: state.permissionGranted,
    }),
    shallow,
  )

/**
 * useNotificationPreferences
 * Selector hook for getting user's notification preferences.
 *
 * @returns Object containing all notification preference settings
 */
export const useNotificationPreferences = () =>
  useNotificationStore(state => state.preferences)

/**
 * useLastNotification
 * Selector hook for getting the last received notification.
 *
 * @returns The last notification object, or null if none received
 */
export const useLastNotification = () =>
  useNotificationStore(state => state.lastNotification)

/**
 * useNotificationActions
 * Selector hook for getting notification store actions.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing notification store action methods
 */
export const useNotificationActions = () =>
  useNotificationStore(
    state => ({
      setDeviceToken: state.setDeviceToken,
      setIsRegistered: state.setIsRegistered,
      setHasRequestedPermission: state.setHasRequestedPermission,
      setPermissionGranted: state.setPermissionGranted,
      setPreferences: state.setPreferences,
      setLastNotification: state.setLastNotification,
      reset: state.reset,
      initialize: state.initialize,
    }),
    shallow,
  )
