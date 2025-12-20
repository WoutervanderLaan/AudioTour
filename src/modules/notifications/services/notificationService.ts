import {Platform} from 'react-native'

import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  type Event,
  EventType,
  type InitialNotification,
  type Notification,
} from '@notifee/react-native'

import {logger} from '@/core/lib/logger/logger'

/**
 * NotificationChannelId
 * Android notification channel identifiers
 */
export enum NotificationChannelId {
  default = 'default',
  tours = 'tours',
  narratives = 'narratives',
  recommendations = 'recommendations',
  social = 'social',
}

/**
 * PermissionStatus
 * Possible permission states for notifications
 */
export type PermissionStatus = 'granted' | 'denied' | 'not_determined'

/**
 * NotificationServiceConfig
 * Configuration options for the notification service
 */
type NotificationServiceConfig = {
  /**
   * Optional callback invoked when a notification event occurs in the foreground
   */
  onForegroundEvent?: (event: Event) => void
  /**
   * Optional callback invoked when a notification event occurs in the background
   */
  onBackgroundEvent?: (event: Event) => Promise<void>
}

/** Singleton service for managing push notifications via Notifee */
class NotificationService {
  private isInitialized = false
  private config: NotificationServiceConfig = {}

  /**
   * Initializes the notification service with optional event handlers
   *
   * @param config - Optional configuration for foreground and background event handlers
   * @returns A promise that resolves when initialization is complete
   */
  async initialize(config?: NotificationServiceConfig): Promise<void> {
    if (this.isInitialized) {
      return
    }
    this.config = config ?? {}
    try {
      if (Platform.OS === 'android') {
        await this.createAndroidChannels()
      }
      notifee.onForegroundEvent(this.handleForegroundEvent.bind(this))
      notifee.onBackgroundEvent(this.handleBackgroundEvent.bind(this))
      this.isInitialized = true
      logger.success('[NotificationService] Initialized successfully')
    } catch (error) {
      logger.error('[NotificationService] Initialization failed:', error)
      throw error
    }
  }

  /**
   * Creates Android notification channels for different notification types
   *
   * @returns A promise that resolves when all channels are created
   */
  private async createAndroidChannels(): Promise<void> {
    const channels = [
      {
        id: NotificationChannelId.default,
        name: 'Default',
        importance: AndroidImportance.DEFAULT,
      },
      {
        id: NotificationChannelId.tours,
        name: 'Tour Updates',
        description: 'Notifications about tour completions and achievements',
        importance: AndroidImportance.HIGH,
      },
      {
        id: NotificationChannelId.narratives,
        name: 'New Narratives',
        description: 'Notifications about new stories for captured objects',
        importance: AndroidImportance.DEFAULT,
      },
      {
        id: NotificationChannelId.recommendations,
        name: 'Recommendations',
        description: 'Personalized recommendations based on your interests',
        importance: AndroidImportance.DEFAULT,
      },
      {
        id: NotificationChannelId.social,
        name: 'Social Updates',
        description: 'Updates about friends and community activity',
        importance: AndroidImportance.LOW,
      },
    ]

    await notifee.createChannels(channels)

    // Log channels in a table
    logger.table(
      channels.map(ch => ({
        id: ch.id,
        name: ch.name,
        importance:
          ch.importance === AndroidImportance.HIGH
            ? 'HIGH'
            : ch.importance === AndroidImportance.LOW
              ? 'LOW'
              : 'DEFAULT',
      })),
      'Android Notification Channels',
    )
  }

  /**
   * Handles notification events when the app is in the foreground
   *
   * @param event - The notification event to handle
   */
  private handleForegroundEvent(event: Event): void {
    const {type, detail} = event
    switch (type) {
      case EventType.DISMISSED:
      case EventType.PRESS:
      case EventType.DELIVERED:
        logger.debug('[NotificationService] Foreground event:', type, detail)
        break
      default:
        break
    }
    this.config.onForegroundEvent?.(event)
  }

  /**
   * Handles notification events when the app is in the background
   *
   * @param event - The notification event to handle
   * @returns A promise that resolves when the event is handled
   */
  private async handleBackgroundEvent(event: Event): Promise<void> {
    logger.debug(
      '[NotificationService] Background event:',
      event.type,
      event.detail,
    )
    await this.config.onBackgroundEvent?.(event)
  }

  /**
   * Requests notification permission from the user
   *
   * @returns A promise that resolves to the permission status after the request
   */
  async requestPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.requestPermission()
      const status = this.mapAuthorizationStatus(settings.authorizationStatus)

      if (status === 'granted') {
        logger.success('[NotificationService] Permission granted')
      } else {
        logger.warn(`[NotificationService] Permission ${status}`)
      }

      return status
    } catch (error) {
      logger.error('[NotificationService] Permission request failed:', error)
      return 'denied'
    }
  }

  /**
   * Checks the current notification permission status without prompting
   *
   * @returns A promise that resolves to the current permission status
   */
  async checkPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.getNotificationSettings()
      return this.mapAuthorizationStatus(settings.authorizationStatus)
    } catch (error) {
      logger.error('[NotificationService] Check permission failed:', error)
      return 'denied'
    }
  }

  /**
   * Maps Notifee authorization status to PermissionStatus
   *
   * @param status - The Notifee authorization status to map
   * @returns The corresponding PermissionStatus value
   */
  private mapAuthorizationStatus(
    status: AuthorizationStatus,
  ): PermissionStatus {
    if (status === AuthorizationStatus.AUTHORIZED) return 'granted'
    if (status === AuthorizationStatus.DENIED) return 'denied'
    return 'not_determined'
  }

  /**
   * Opens the device notification settings for this app
   *
   * @returns A promise that resolves when the settings screen is opened
   */
  async openSettings(): Promise<void> {
    await notifee.openNotificationSettings()
  }

  /**
   * Displays a local notification to the user
   *
   * @param title - The notification title
   * @param body - The notification body text
   * @param data - Optional key-value data to attach to the notification
   * @param channelId - The Android notification channel ID (defaults to 'default')
   * @returns A promise that resolves to the notification ID
   */
  async displayNotification({
    title,
    body,
    data,
    channelId = NotificationChannelId.default,
  }: {
    title: string
    body: string
    data?: Record<string, string>
    channelId?: NotificationChannelId
  }): Promise<string> {
    const notification: Notification = {
      title,
      body,
      data,
      android: {channelId, pressAction: {id: 'default'}},
      ios: {sound: 'default'},
    }
    const notificationId = await notifee.displayNotification(notification)
    logger.success(`[NotificationService] Notification displayed: ${title}`)
    return notificationId
  }

  /**
   * Cancels a displayed notification by ID
   *
   * @param notificationId - The ID of the notification to cancel
   * @returns A promise that resolves when the notification is cancelled
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await notifee.cancelNotification(notificationId)
    logger.debug(
      '[NotificationService] Notification cancelled:',
      notificationId,
    )
  }

  /**
   * Cancels all displayed notifications
   *
   * @returns A promise that resolves when all notifications are cancelled
   */
  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications()
    logger.info('[NotificationService] All notifications cancelled')
  }

  /**
   * Sets the app badge count (iOS only)
   *
   * @param count - The badge count to set
   * @returns A promise that resolves when the badge count is set
   */
  async setBadgeCount(count: number): Promise<void> {
    await notifee.setBadgeCount(count)
  }

  /**
   * Gets the current app badge count (iOS only)
   *
   * @returns A promise that resolves to the current badge count
   */
  async getBadgeCount(): Promise<number> {
    return notifee.getBadgeCount()
  }

  /**
   * Gets the notification that launched the app from a killed state
   *
   * @returns A promise that resolves to the initial notification, or null if none
   */
  async getInitialNotification(): Promise<InitialNotification | null> {
    return notifee.getInitialNotification()
  }
}

/**
 * Singleton instance of the NotificationService
 */
export const notificationService = new NotificationService()
