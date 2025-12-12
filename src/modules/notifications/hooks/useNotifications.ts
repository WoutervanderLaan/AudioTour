import {useCallback} from 'react'
import {Platform} from 'react-native'

import {
  useRegisterDeviceMutation,
  useToggleNotificationsMutation,
  useUnregisterDeviceMutation,
} from '../api/mutations'
import {NotificationModalName} from '../routes.types'
import {useNotificationStore} from '../store/useNotificationStore'

import {logger} from '@/core/lib/logger'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * UseNotificationsReturn
 * Return type for the useNotifications hook
 */
type UseNotificationsReturn = {
  /**
   * Whether push notifications are enabled
   */
  isEnabled: boolean
  /**
   * Whether the device is registered for push notifications
   */
  isRegistered: boolean
  /**
   * Whether notification permission has been granted
   */
  permissionGranted: boolean
  /**
   * Whether notification permission has been requested
   */
  hasRequestedPermission: boolean
  /**
   * Whether a mutation is currently pending
   */
  isLoading: boolean
  /**
   * Enable push notifications
   */
  enableNotifications: () => void
  /**
   * Disable push notifications
   */
  disableNotifications: () => void
  /**
   * Toggle push notifications
   */
  toggleNotifications: (enabled: boolean) => void
  /**
   * Open the permission request modal
   */
  requestPermission: () => void
  /**
   * Register device with a push token
   */
  registerDevice: (token: string) => void
  /**
   * Unregister device from push notifications
   */
  unregisterDevice: () => void
}

/**
 * useNotifications
 * Hook for managing push notification state and actions.
 * Provides a simple interface for enabling/disabling notifications,
 * requesting permissions, and registering devices.
 *
 * @returns {UseNotificationsReturn} Notification state and actions
 *
 * @example
 * ```tsx
 * const { isEnabled, toggleNotifications, requestPermission } = useNotifications()
 *
 * // Toggle notifications
 * <Switch value={isEnabled} onChange={toggleNotifications} />
 *
 * // Request permission
 * <Button onPress={requestPermission} label="Enable Notifications" />
 * ```
 */
export const useNotifications = (): UseNotificationsReturn => {
  const navigation = useNavigation()
  const {
    preferences,
    isRegistered,
    permissionGranted,
    hasRequestedPermission,
    setPermissionGranted,
    setHasRequestedPermission,
  } = useNotificationStore()

  const registerMutation = useRegisterDeviceMutation()
  const unregisterMutation = useUnregisterDeviceMutation()
  const toggleMutation = useToggleNotificationsMutation()

  const isLoading =
    registerMutation.isPending ||
    unregisterMutation.isPending ||
    toggleMutation.isPending

  /**
   * requestPermission
   * Opens the notification permission modal
   */
  const requestPermission = useCallback((): void => {
    navigation.navigate(NotificationModalName.permission)
  }, [navigation])

  /**
   * enableNotifications
   * Enables push notifications. Opens permission modal if permission
   * hasn't been granted yet.
   */
  const enableNotifications = useCallback((): void => {
    if (!hasRequestedPermission || !permissionGranted) {
      requestPermission()
      return
    }

    toggleMutation.mutate({enabled: true})
  }, [
    hasRequestedPermission,
    permissionGranted,
    requestPermission,
    toggleMutation,
  ])

  /**
   * disableNotifications
   * Disables push notifications
   */
  const disableNotifications = useCallback((): void => {
    toggleMutation.mutate({enabled: false})
  }, [toggleMutation])

  /**
   * toggleNotifications
   * Toggles push notifications on or off
   *
   * @param {boolean} enabled - Whether to enable notifications
   */
  const toggleNotifications = useCallback(
    (enabled: boolean): void => {
      if (enabled) {
        enableNotifications()
      } else {
        disableNotifications()
      }
    },
    [enableNotifications, disableNotifications],
  )

  /**
   * registerDevice
   * Registers the device with a push notification token
   *
   * @param {string} token - The device push token from FCM/APNs
   */
  const registerDevice = useCallback(
    (token: string): void => {
      const platform = Platform.OS === 'ios' ? 'ios' : 'android'

      registerMutation.mutate(
        {deviceToken: token, platform},
        {
          onSuccess: () => {
            setPermissionGranted(true)
            setHasRequestedPermission(true)
            logger.debug('[Notifications] Device registered with token')
          },
        },
      )
    },
    [registerMutation, setPermissionGranted, setHasRequestedPermission],
  )

  /**
   * unregisterDevice
   * Unregisters the device from push notifications
   */
  const unregisterDevice = useCallback((): void => {
    unregisterMutation.mutate()
  }, [unregisterMutation])

  return {
    isEnabled: preferences.pushEnabled,
    isRegistered,
    permissionGranted,
    hasRequestedPermission,
    isLoading,
    enableNotifications,
    disableNotifications,
    toggleNotifications,
    requestPermission,
    registerDevice,
    unregisterDevice,
  }
}
