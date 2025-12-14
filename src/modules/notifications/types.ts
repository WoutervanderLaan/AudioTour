/**
 * Platform
 * Supported platforms for push notifications
 */
export type Platform = 'ios' | 'android'

/**
 * NotificationActionType
 * Types of actions that can trigger a notification
 */
export type NotificationActionType =
  | 'tour_complete'
  | 'new_narrative'
  | 'recommendation'
  | 'social'
  | 'system'

/**
 * NotificationPayload
 * Payload received from a push notification
 */
export type NotificationPayload = {
  /**
   * Unique identifier for the notification
   */
  id: string
  /**
   * Notification title
   */
  title: string
  /**
   * Notification body text
   */
  body: string
  /**
   * Optional custom data for deep linking
   */
  data?: Record<string, string>
  /**
   * Type of action that triggered the notification
   */
  actionType?: NotificationActionType
  /**
   * Timestamp when the notification was created
   */
  createdAt: string
}

/**
 * NotificationPreferences
 * User preferences for push notifications
 */
export type NotificationPreferences = {
  /**
   * Whether push notifications are enabled globally
   */
  pushEnabled: boolean
  /**
   * Whether tour completion notifications are enabled
   */
  tourNotifications: boolean
  /**
   * Whether new narrative notifications are enabled
   */
  narrativeNotifications: boolean
  /**
   * Whether recommendation notifications are enabled
   */
  recommendationNotifications: boolean
  /**
   * Whether social notifications are enabled
   */
  socialNotifications: boolean
}

/**
 * NotificationState
 * Zustand store state for notification management
 */
export type NotificationState = {
  /**
   * Device token for push notifications
   */
  deviceToken: string | null
  /**
   * Whether the device is registered for push notifications
   */
  isRegistered: boolean
  /**
   * Whether notification permission has been requested
   */
  hasRequestedPermission: boolean
  /**
   * Whether notification permission was granted
   */
  permissionGranted: boolean
  /**
   * User notification preferences
   */
  preferences: NotificationPreferences
  /**
   * Most recent notification received
   */
  lastNotification: NotificationPayload | null
  /**
   * Set device token
   */
  setDeviceToken: (token: string | null) => void
  /**
   * Set registration status
   */
  setIsRegistered: (isRegistered: boolean) => void
  /**
   * Set permission requested flag
   */
  setHasRequestedPermission: (hasRequested: boolean) => void
  /**
   * Set permission granted status
   */
  setPermissionGranted: (granted: boolean) => void
  /**
   * Update notification preferences
   */
  setPreferences: (preferences: Partial<NotificationPreferences>) => void
  /**
   * Set the last received notification
   */
  setLastNotification: (notification: NotificationPayload | null) => void
  /**
   * Reset store to initial state
   */
  reset: () => void
  /**
   * Initialize store from persisted state
   */
  initialize: () => void
}

/**
 * RegisterDeviceRequest
 * Request payload for registering a device for push notifications
 */
export type RegisterDeviceRequest = {
  /**
   * Device push token from FCM/APNs
   */
  deviceToken: string
  /**
   * Platform (ios or android)
   */
  platform: Platform
}

/**
 * RegisterDeviceResponse
 * Response from device registration endpoint
 */
export type RegisterDeviceResponse = {
  /**
   * Success status
   */
  success: boolean
  /**
   * Message describing the result
   */
  message: string
}

/**
 * ToggleNotificationsRequest
 * Request payload for toggling push notifications on/off
 */
export type ToggleNotificationsRequest = {
  /**
   * Whether to enable or disable notifications
   */
  enabled: boolean
}

/**
 * ToggleNotificationsResponse
 * Response from toggle notifications endpoint
 */
export type ToggleNotificationsResponse = {
  /**
   * Success status
   */
  success: boolean
  /**
   * Updated preferences
   */
  preferences: NotificationPreferences
}

/**
 * UnregisterDeviceResponse
 * Response from device unregistration endpoint
 */
export type UnregisterDeviceResponse = {
  /**
   * Success status
   */
  success: boolean
  /**
   * Message describing the result
   */
  message: string
}
