import type {PermissionStatus} from '../types'

/**
 * UseNotificationsReturn
 * Return type for the useNotifications hook
 */
export type UseNotificationsReturn = {
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
   * Current permission status from the system
   */
  permissionStatus: PermissionStatus
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
   * Open the permission request modal (pre-permission screen)
   */
  showPermissionModal: () => void
  /**
   * Request system notification permission directly via Notifee
   */
  requestSystemPermission: () => Promise<PermissionStatus>
  /**
   * Register device with a push token
   */
  registerDevice: (token: string) => void
  /**
   * Unregister device from push notifications
   */
  unregisterDevice: () => void
  /**
   * Open device notification settings
   */
  openSettings: () => Promise<void>
  /**
   * Display a local notification
   */
  displayNotification: (title: string, body: string) => Promise<string>
}
