import type {NotificationPreferences} from '../types'

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
  platform: 'ios' | 'android'
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
