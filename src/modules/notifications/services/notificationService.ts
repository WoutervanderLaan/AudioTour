import {Platform} from 'react-native'

import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  type Event,
  EventType,
  type InitialNotification,
  type Notification,
} from '@notifee/react-native'

import {logger} from '@/core/lib/logger'

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
   * onForegroundEvent
   */
  onForegroundEvent?: (event: Event) => void
  /**
   * onBackgroundEvent
   */
  onBackgroundEvent?: (event: Event) => Promise<void>
}

/**
 * NotificationService
 * Singleton service for managing push notifications via Notifee.
 * Handles initialization, permission requests, channel creation, and event handling.
 */
class NotificationService {
  private isInitialized = false
  private config: NotificationServiceConfig = {}

  /**
   * initialize
   * Initializes the notification service with optional event handlers.
   * Creates Android notification channels and sets up event listeners.
   *
   * @param {NotificationServiceConfig} config - Configuration options
   * @returns {Promise<void>}
   */
  async initialize(config?: NotificationServiceConfig): Promise<void> {
    if (this.isInitialized) {
      logger.debug('[NotificationService] Already initialized')
      return
    }

    this.config = config ?? {}

    try {
      // Create Android notification channels
      if (Platform.OS === 'android') {
        await this.createAndroidChannels()
      }

      // Set up foreground event handler
      notifee.onForegroundEvent(this.handleForegroundEvent.bind(this))

      // Set up background event handler
      notifee.onBackgroundEvent(this.handleBackgroundEvent.bind(this))

      this.isInitialized = true
      logger.debug('[NotificationService] Initialized successfully')
    } catch (error) {
      logger.error('[NotificationService] Initialization failed:', error)
      throw error
    }
  }

  /**
   * createAndroidChannels
   * Creates Android notification channels for different notification types.
   *
   * @returns {Promise<void>}
   */
  private async createAndroidChannels(): Promise<void> {
    await notifee.createChannels([
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
    ])

    logger.debug('[NotificationService] Android channels created')
  }

  /**
   * handleForegroundEvent
   * Handles notification events when the app is in the foreground.
   *
   * @param {Event} event - The notification event
   */
  private handleForegroundEvent(event: Event): void {
    const {type, detail} = event

    switch (type) {
      case EventType.DISMISSED:
        logger.debug('[NotificationService] Notification dismissed:', detail)
        break
      case EventType.PRESS:
        logger.debug('[NotificationService] Notification pressed:', detail)
        break
      case EventType.DELIVERED:
        logger.debug('[NotificationService] Notification delivered:', detail)
        break
      default:
        break
    }

    this.config.onForegroundEvent?.(event)
  }

  /**
   * handleBackgroundEvent
   * Handles notification events when the app is in the background.
   *
   * @param {Event} event - The notification event
   * @returns {Promise<void>}
   */
  private async handleBackgroundEvent(event: Event): Promise<void> {
    const {type, detail} = event

    logger.debug('[NotificationService] Background event:', type, detail)

    await this.config.onBackgroundEvent?.(event)
  }

  /**
   * requestPermission
   * Requests notification permission from the user.
   * On iOS, shows the system permission dialog.
   * On Android 13+, requests POST_NOTIFICATIONS permission.
   *
   * @returns {Promise<PermissionStatus>} The resulting permission status
   */
  async requestPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.requestPermission()

      if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        logger.debug('[NotificationService] Permission granted')
        return 'granted'
      }

      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        logger.debug('[NotificationService] Permission denied')
        return 'denied'
      }

      logger.debug('[NotificationService] Permission not determined')
      return 'not_determined'
    } catch (error) {
      logger.error('[NotificationService] Permission request failed:', error)
      return 'denied'
    }
  }

  /**
   * checkPermission
   * Checks the current notification permission status without prompting.
   *
   * @returns {Promise<PermissionStatus>} The current permission status
   */
  async checkPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.getNotificationSettings()

      if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        return 'granted'
      }

      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        return 'denied'
      }

      return 'not_determined'
    } catch (error) {
      logger.error('[NotificationService] Check permission failed:', error)
      return 'denied'
    }
  }

  /**
   * openSettings
   * Opens the device notification settings for this app.
   *
   * @returns {Promise<void>}
   */
  async openSettings(): Promise<void> {
    await notifee.openNotificationSettings()
  }

  /**
   * displayNotification
   * Displays a local notification to the user.
   *
   * @param {Object} params - Notification parameters
   * @param {string} params.title - Notification title
   * @param {string} params.body - Notification body text
   * @param {Record<string, string>} params.data - Custom data payload
   * @param {NotificationChannelId} params.channelId - Android channel ID
   * @returns {Promise<string>} The notification ID
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
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    }

    const notificationId = await notifee.displayNotification(notification)
    logger.debug(
      '[NotificationService] Notification displayed:',
      notificationId,
    )
    return notificationId
  }

  /**
   * cancelNotification
   * Cancels a displayed notification by ID.
   *
   * @param {string} notificationId - The notification ID to cancel
   * @returns {Promise<void>}
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await notifee.cancelNotification(notificationId)
    logger.debug(
      '[NotificationService] Notification cancelled:',
      notificationId,
    )
  }

  /**
   * cancelAllNotifications
   * Cancels all displayed notifications.
   *
   * @returns {Promise<void>}
   */
  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications()
    logger.debug('[NotificationService] All notifications cancelled')
  }

  /**
   * setBadgeCount
   * Sets the app badge count (iOS only).
   *
   * @param {number} count - The badge count to display
   * @returns {Promise<void>}
   */
  async setBadgeCount(count: number): Promise<void> {
    await notifee.setBadgeCount(count)
    logger.debug('[NotificationService] Badge count set:', count)
  }

  /**
   * getBadgeCount
   * Gets the current app badge count (iOS only).
   *
   * @returns {Promise<number>} The current badge count
   */
  async getBadgeCount(): Promise<number> {
    return notifee.getBadgeCount()
  }

  /**
   * getInitialNotification
   * Gets the notification that launched the app from a killed state.
   *
   * @returns {Promise<InitialNotification | null>} The initial notification or null
   */
  async getInitialNotification(): Promise<InitialNotification | null> {
    return notifee.getInitialNotification()
  }
}

/**
 * Singleton instance of the NotificationService
 */
export const notificationService = new NotificationService()
