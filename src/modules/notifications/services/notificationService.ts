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

/** Singleton service for managing push notifications via Notifee */
class NotificationService {
  private isInitialized = false
  private config: NotificationServiceConfig = {}

  /** Initializes the notification service with optional event handlers */
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
      logger.debug('[NotificationService] Initialized successfully')
    } catch (error) {
      logger.error('[NotificationService] Initialization failed:', error)
      throw error
    }
  }

  /** Creates Android notification channels for different notification types */
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

  /** Handles notification events when the app is in the foreground */
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

  /** Handles notification events when the app is in the background */
  private async handleBackgroundEvent(event: Event): Promise<void> {
    logger.debug(
      '[NotificationService] Background event:',
      event.type,
      event.detail,
    )
    await this.config.onBackgroundEvent?.(event)
  }

  /** Requests notification permission from the user */
  async requestPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.requestPermission()
      return this.mapAuthorizationStatus(settings.authorizationStatus)
    } catch (error) {
      logger.error('[NotificationService] Permission request failed:', error)
      return 'denied'
    }
  }

  /** Checks the current notification permission status without prompting */
  async checkPermission(): Promise<PermissionStatus> {
    try {
      const settings = await notifee.getNotificationSettings()
      return this.mapAuthorizationStatus(settings.authorizationStatus)
    } catch (error) {
      logger.error('[NotificationService] Check permission failed:', error)
      return 'denied'
    }
  }

  /** Maps Notifee authorization status to PermissionStatus */
  private mapAuthorizationStatus(
    status: AuthorizationStatus,
  ): PermissionStatus {
    if (status === AuthorizationStatus.AUTHORIZED) return 'granted'
    if (status === AuthorizationStatus.DENIED) return 'denied'
    return 'not_determined'
  }

  /** Opens the device notification settings for this app */
  async openSettings(): Promise<void> {
    await notifee.openNotificationSettings()
  }

  /** Displays a local notification to the user */
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
    logger.debug(
      '[NotificationService] Notification displayed:',
      notificationId,
    )
    return notificationId
  }

  /** Cancels a displayed notification by ID */
  async cancelNotification(notificationId: string): Promise<void> {
    await notifee.cancelNotification(notificationId)
    logger.debug(
      '[NotificationService] Notification cancelled:',
      notificationId,
    )
  }

  /** Cancels all displayed notifications */
  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications()
    logger.debug('[NotificationService] All notifications cancelled')
  }

  /** Sets the app badge count (iOS only) */
  async setBadgeCount(count: number): Promise<void> {
    await notifee.setBadgeCount(count)
  }

  /** Gets the current app badge count (iOS only) */
  async getBadgeCount(): Promise<number> {
    return notifee.getBadgeCount()
  }

  /** Gets the notification that launched the app from a killed state */
  async getInitialNotification(): Promise<InitialNotification | null> {
    return notifee.getInitialNotification()
  }
}

/**
 * Singleton instance of the NotificationService
 */
export const notificationService = new NotificationService()
