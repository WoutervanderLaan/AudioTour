import type {NotificationPreferences, NotificationState} from '../types'

import {createModuleStore} from '@/store/createStore'

const defaultPreferences: NotificationPreferences = {
  pushEnabled: false,
  tourNotifications: true,
  narrativeNotifications: true,
  recommendationNotifications: true,
  socialNotifications: true,
}

const initialState = {
  deviceToken: null,
  isRegistered: false,
  hasRequestedPermission: false,
  permissionGranted: false,
  preferences: defaultPreferences,
  lastNotification: null,
}

/**
 * Zustand store for notification state management.
 *
 * Manages push notification state including device token, registration status,
 * permission state, and user preferences.
 * Persists to AsyncStorage to maintain state across app restarts.
 *
 * @returns Notification store hook with state and actions
 */
export const useNotificationStore = createModuleStore<NotificationState>(
  (set, get) => ({
    ...initialState,

    setDeviceToken: (token): void => {
      set({deviceToken: token})
    },

    setIsRegistered: (isRegistered): void => {
      set({isRegistered})
    },

    setHasRequestedPermission: (hasRequested): void => {
      set({hasRequestedPermission: hasRequested})
    },

    setPermissionGranted: (granted): void => {
      set({
        permissionGranted: granted,
        preferences: {
          ...get().preferences,
          pushEnabled: granted,
        },
      })
    },

    setPreferences: (preferences): void => {
      set({
        preferences: {
          ...get().preferences,
          ...preferences,
        },
      })
    },

    setLastNotification: (notification): void => {
      set({lastNotification: notification})
    },

    reset: (): void => {
      set(initialState)
    },

    initialize: (): void => {
      // State is automatically restored by persist middleware
      // This hook can be used for any additional initialization logic
    },
  }),
  {
    name: 'notification-module',
    persist: true,
    devtools: true,
  },
)
