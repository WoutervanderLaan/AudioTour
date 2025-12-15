import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {notificationKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger'
import {useNotificationStore} from '@/modules/notifications/store/useNotificationStore'
import type {
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  ToggleNotificationsRequest,
  ToggleNotificationsResponse,
  UnregisterDeviceResponse,
} from '@/modules/notifications/types'

/**
 * React Query mutation hook for registering a device for push notifications.
 *
 * Registers the device token with the backend and updates the notification store
 * with the registration status.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const registerMutation = useRegisterDeviceMutation()
 *
 * const handleRegister = (token: string) => {
 *   registerMutation.mutate({ deviceToken: token, platform: 'ios' })
 * }
 * ```
 */
export const useRegisterDeviceMutation = (
  options?: Omit<
    UseMutationOptions<RegisterDeviceResponse, Error, RegisterDeviceRequest>,
    'mutationFn'
  >,
): UseMutationResult<
  RegisterDeviceResponse,
  Error,
  RegisterDeviceRequest,
  unknown
> => {
  const queryClient = useQueryClient()
  const {setIsRegistered, setDeviceToken} = useNotificationStore()

  return useMutation({
    mutationFn: async (data: RegisterDeviceRequest) => {
      // Validate device token before sending to backend
      if (!data.deviceToken || data.deviceToken.trim().length === 0) {
        throw new Error('Invalid device token: token cannot be empty')
      }

      const response = await apiClient.post<RegisterDeviceResponse>(
        '/notifications/register-device',
        data,
      )
      return response.data
    },
    onSuccess: (_, variables) => {
      setDeviceToken(variables.deviceToken)
      setIsRegistered(true)
      queryClient.invalidateQueries({queryKey: notificationKeys.registration()})
      logger.success('[Notifications] Device registered successfully')
    },
    onError: error => {
      logger.error('[Notifications] Failed to register device:', error)
    },
    ...options,
  })
}

/**
 * React Query mutation hook for unregistering a device from push notifications.
 *
 * Removes the device token from the backend and updates the notification store.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const unregisterMutation = useUnregisterDeviceMutation()
 *
 * const handleUnregister = () => {
 *   unregisterMutation.mutate()
 * }
 * ```
 */
export const useUnregisterDeviceMutation = (
  options?: Omit<
    UseMutationOptions<UnregisterDeviceResponse, Error, void>,
    'mutationFn'
  >,
): UseMutationResult<UnregisterDeviceResponse, Error, void, unknown> => {
  const queryClient = useQueryClient()
  const {setIsRegistered, setDeviceToken, deviceToken} = useNotificationStore()

  return useMutation({
    mutationFn: async () => {
      // Validate device token before making API call
      if (!deviceToken) {
        throw new Error('No device token to unregister')
      }

      const response = await apiClient.post<UnregisterDeviceResponse>(
        '/notifications/unregister-device',
        {deviceToken},
      )
      return response.data
    },
    onSuccess: () => {
      setDeviceToken(null)
      setIsRegistered(false)
      queryClient.invalidateQueries({queryKey: notificationKeys.registration()})
      logger.success('[Notifications] Device unregistered successfully')
    },
    onError: error => {
      logger.error('[Notifications] Failed to unregister device:', error)
    },
    ...options,
  })
}

/**
 * React Query mutation hook for toggling push notifications on/off.
 *
 * Updates the push notification preference on the backend and syncs
 * the local notification store.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const toggleMutation = useToggleNotificationsMutation()
 *
 * const handleToggle = (enabled: boolean) => {
 *   toggleMutation.mutate({ enabled })
 * }
 * ```
 */
export const useToggleNotificationsMutation = (
  options?: Omit<
    UseMutationOptions<
      ToggleNotificationsResponse,
      Error,
      ToggleNotificationsRequest
    >,
    'mutationFn'
  >,
): UseMutationResult<
  ToggleNotificationsResponse,
  Error,
  ToggleNotificationsRequest,
  unknown
> => {
  const queryClient = useQueryClient()
  const {setPreferences} = useNotificationStore()

  return useMutation({
    mutationFn: async (data: ToggleNotificationsRequest) => {
      const response = await apiClient.post<ToggleNotificationsResponse>(
        '/notifications/toggle',
        data,
      )
      return response.data
    },
    onSuccess: data => {
      setPreferences(data.preferences)
      queryClient.invalidateQueries({queryKey: notificationKeys.preferences()})
      logger.success(
        `[Notifications] Notifications ${data.preferences.enabled ? 'enabled' : 'disabled'}`,
      )
    },
    onError: error => {
      logger.error('[Notifications] Failed to toggle notifications:', error)
    },
    ...options,
  })
}
