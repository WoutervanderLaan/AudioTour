import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'

import {
  useRegisterDeviceMutation,
  useToggleNotificationsMutation,
  useUnregisterDeviceMutation,
} from '../api/mutations'
import {NotificationModalName} from '../routes.types'
import {notificationService} from '../services/notificationService'
import {useNotificationStore} from '../store/useNotificationStore'
import type {PermissionStatus} from '../types'
import type {UseNotificationsReturn} from './useNotifications.types'

import {logger} from '@/core/lib/logger/logger'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * useNotifications
 * Hook for managing push notification state and actions.
 * Integrates with Notifee for native notification functionality.
 * Provides a simple interface for enabling/disabling notifications,
 * requesting permissions, and registering devices.
 *
 * @returns {UseNotificationsReturn} Notification state and actions
 *
 * @example
 * ```tsx
 * const { isEnabled, toggleNotifications, requestSystemPermission } = useNotifications()
 *
 * // Toggle notifications
 * <Switch value={isEnabled} onChange={toggleNotifications} />
 *
 * // Request system permission
 * const status = await requestSystemPermission()
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

  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('not_determined')

  const hasCheckedPermission = useRef(false)

  const registerMutation = useRegisterDeviceMutation()
  const unregisterMutation = useUnregisterDeviceMutation()
  const toggleMutation = useToggleNotificationsMutation()

  const isLoading =
    registerMutation.isPending ||
    unregisterMutation.isPending ||
    toggleMutation.isPending

  // Check permission status on mount (only once, with cleanup)
  useEffect(() => {
    if (hasCheckedPermission.current) {
      return
    }
    let isMounted = true
    hasCheckedPermission.current = true

    /** Checks permission status and syncs with store */
    const checkPermission = async (): Promise<void> => {
      const status = await notificationService.checkPermission()
      if (!isMounted) return
      setPermissionStatus(status)
      if (status === 'granted') {
        setPermissionGranted(true)
        setHasRequestedPermission(true)
      }
    }
    checkPermission()
    return (): void => {
      isMounted = false
    }
  }, [setPermissionGranted, setHasRequestedPermission])

  /** Opens the notification permission modal (pre-permission screen) */
  const showPermissionModal = useCallback((): void => {
    navigation.navigate(NotificationModalName.permission)
  }, [navigation])

  /** Requests system notification permission via Notifee */
  const requestSystemPermission =
    useCallback(async (): Promise<PermissionStatus> => {
      const status = await notificationService.requestPermission()
      setPermissionStatus(status)
      setHasRequestedPermission(true)
      setPermissionGranted(status === 'granted')
      return status
    }, [setHasRequestedPermission, setPermissionGranted])

  /** Enables push notifications (opens permission modal if needed) */
  const enableNotifications = useCallback((): void => {
    if (!hasRequestedPermission || !permissionGranted) {
      showPermissionModal()
      return
    }
    toggleMutation.mutate({enabled: true})
  }, [
    hasRequestedPermission,
    permissionGranted,
    showPermissionModal,
    toggleMutation,
  ])

  /** Disables push notifications */
  const disableNotifications = useCallback((): void => {
    toggleMutation.mutate({enabled: false})
  }, [toggleMutation])

  /** Toggles push notifications on or off */
  const toggleNotifications = useCallback(
    (enabled: boolean): void => {
      enabled ? enableNotifications() : disableNotifications()
    },
    [enableNotifications, disableNotifications],
  )

  /** Registers the device with a push notification token */
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

  /** Unregisters the device from push notifications */
  const unregisterDevice = useCallback((): void => {
    unregisterMutation.mutate()
  }, [unregisterMutation])

  /** Opens the device notification settings for this app */
  const openSettings = useCallback(async (): Promise<void> => {
    await notificationService.openSettings()
  }, [])

  /** Displays a local notification to the user */
  const displayNotification = useCallback(
    async (title: string, body: string): Promise<string> => {
      return notificationService.displayNotification({title, body})
    },
    [],
  )

  return {
    isEnabled: preferences.pushEnabled,
    isRegistered,
    permissionGranted,
    hasRequestedPermission,
    permissionStatus,
    isLoading,
    enableNotifications,
    disableNotifications,
    toggleNotifications,
    showPermissionModal,
    requestSystemPermission,
    registerDevice,
    unregisterDevice,
    openSettings,
    displayNotification,
  }
}
