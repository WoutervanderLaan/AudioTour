import {Platform} from 'react-native'

import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
  type Event,
  type InitialNotification,
} from '@notifee/react-native'

import {logger} from '@/core/lib/logger/logger'

import {
  NotificationChannelId,
  notificationService,
  type PermissionStatus,
} from './notificationService'

jest.mock('@/core/lib/logger/logger')

/**
 * Test suite for NotificationService
 * Tests all notification service functionality including initialization,
 * permissions, channels, and notification management
 */
describe('NotificationService', () => {
  const mockNotifee = notifee as jest.Mocked<typeof notifee>

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset initialization state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(notificationService as any).isInitialized = false
  })

  describe('initialize', () => {
    it('should initialize successfully on Android', async () => {
      Platform.OS = 'android'
      mockNotifee.createChannels.mockResolvedValue(undefined)
      mockNotifee.onForegroundEvent.mockReturnValue(jest.fn() as never)
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize()

      expect(mockNotifee.createChannels).toHaveBeenCalledWith([
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
      expect(mockNotifee.onForegroundEvent).toHaveBeenCalled()
      expect(mockNotifee.onBackgroundEvent).toHaveBeenCalled()
      expect(logger.success).toHaveBeenCalledWith(
        '[NotificationService] Initialized successfully',
      )
    })

    it('should initialize successfully on iOS', async () => {
      Platform.OS = 'ios'
      mockNotifee.onForegroundEvent.mockReturnValue(jest.fn() as never)
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize()

      expect(mockNotifee.createChannels).not.toHaveBeenCalled()
      expect(mockNotifee.onForegroundEvent).toHaveBeenCalled()
      expect(mockNotifee.onBackgroundEvent).toHaveBeenCalled()
      expect(logger.success).toHaveBeenCalledWith(
        '[NotificationService] Initialized successfully',
      )
    })

    it('should not initialize twice', async () => {
      Platform.OS = 'ios'
      mockNotifee.onForegroundEvent.mockReturnValue(jest.fn() as never)
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize()
      await notificationService.initialize()

      expect(mockNotifee.onForegroundEvent).toHaveBeenCalledTimes(1)
      expect(mockNotifee.onBackgroundEvent).toHaveBeenCalledTimes(1)
    })

    it('should initialize with custom event handlers', async () => {
      Platform.OS = 'ios'
      const onForegroundEvent = jest.fn()
      const onBackgroundEvent = jest.fn()
      mockNotifee.onForegroundEvent.mockReturnValue(jest.fn() as never)
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize({
        onForegroundEvent,
        onBackgroundEvent,
      })

      expect(mockNotifee.onForegroundEvent).toHaveBeenCalled()
      expect(mockNotifee.onBackgroundEvent).toHaveBeenCalled()
    })

    it('should handle initialization errors', async () => {
      Platform.OS = 'android'
      const error = new Error('Initialization failed')
      mockNotifee.createChannels.mockRejectedValue(error)

      await expect(notificationService.initialize()).rejects.toThrow(
        'Initialization failed',
      )

      expect(logger.error).toHaveBeenCalledWith(
        '[NotificationService] Initialization failed:',
        error,
      )
    })
  })

  describe('requestPermission', () => {
    it('should request permission and return granted', async () => {
      mockNotifee.requestPermission.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      } as never)

      const status = await notificationService.requestPermission()

      expect(status).toBe('granted')
      expect(mockNotifee.requestPermission).toHaveBeenCalled()
      expect(logger.success).toHaveBeenCalledWith(
        '[NotificationService] Permission granted',
      )
    })

    it('should request permission and return denied', async () => {
      mockNotifee.requestPermission.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      } as never)

      const status = await notificationService.requestPermission()

      expect(status).toBe('denied')
      expect(logger.warn).toHaveBeenCalledWith(
        '[NotificationService] Permission denied',
      )
    })

    it('should request permission and return not_determined', async () => {
      mockNotifee.requestPermission.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      } as never)

      const status = await notificationService.requestPermission()

      expect(status).toBe('not_determined')
      expect(logger.warn).toHaveBeenCalledWith(
        '[NotificationService] Permission not_determined',
      )
    })

    it('should handle permission request errors', async () => {
      const error = new Error('Permission request failed')
      mockNotifee.requestPermission.mockRejectedValue(error)

      const status = await notificationService.requestPermission()

      expect(status).toBe('denied')
      expect(logger.error).toHaveBeenCalledWith(
        '[NotificationService] Permission request failed:',
        error,
      )
    })
  })

  describe('checkPermission', () => {
    it('should check permission and return granted', async () => {
      mockNotifee.getNotificationSettings.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
      } as never)

      const status = await notificationService.checkPermission()

      expect(status).toBe('granted')
      expect(mockNotifee.getNotificationSettings).toHaveBeenCalled()
    })

    it('should check permission and return denied', async () => {
      mockNotifee.getNotificationSettings.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.DENIED,
      } as never)

      const status = await notificationService.checkPermission()

      expect(status).toBe('denied')
    })

    it('should check permission and return not_determined', async () => {
      mockNotifee.getNotificationSettings.mockResolvedValue({
        authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
      } as never)

      const status = await notificationService.checkPermission()

      expect(status).toBe('not_determined')
    })

    it('should handle check permission errors', async () => {
      const error = new Error('Check permission failed')
      mockNotifee.getNotificationSettings.mockRejectedValue(error)

      const status = await notificationService.checkPermission()

      expect(status).toBe('denied')
      expect(logger.error).toHaveBeenCalledWith(
        '[NotificationService] Check permission failed:',
        error,
      )
    })
  })

  describe('openSettings', () => {
    it('should open notification settings', async () => {
      mockNotifee.openNotificationSettings.mockResolvedValue(undefined)

      await notificationService.openSettings()

      expect(mockNotifee.openNotificationSettings).toHaveBeenCalled()
    })
  })

  describe('displayNotification', () => {
    it('should display notification with default channel', async () => {
      mockNotifee.displayNotification.mockResolvedValue('notif-123')

      const notificationId = await notificationService.displayNotification({
        title: 'Test Title',
        body: 'Test Body',
      })

      expect(notificationId).toBe('notif-123')
      expect(mockNotifee.displayNotification).toHaveBeenCalledWith({
        title: 'Test Title',
        body: 'Test Body',
        data: undefined,
        android: {
          channelId: NotificationChannelId.default,
          pressAction: {id: 'default'},
        },
        ios: {sound: 'default'},
      })
      expect(logger.success).toHaveBeenCalledWith(
        '[NotificationService] Notification displayed: Test Title',
      )
    })

    it('should display notification with custom channel', async () => {
      mockNotifee.displayNotification.mockResolvedValue('notif-456')

      const notificationId = await notificationService.displayNotification({
        title: 'Tour Complete',
        body: 'You completed a tour!',
        channelId: NotificationChannelId.tours,
      })

      expect(notificationId).toBe('notif-456')
      expect(mockNotifee.displayNotification).toHaveBeenCalledWith({
        title: 'Tour Complete',
        body: 'You completed a tour!',
        data: undefined,
        android: {
          channelId: NotificationChannelId.tours,
          pressAction: {id: 'default'},
        },
        ios: {sound: 'default'},
      })
    })

    it('should display notification with custom data', async () => {
      mockNotifee.displayNotification.mockResolvedValue('notif-789')

      const notificationId = await notificationService.displayNotification({
        title: 'New Narrative',
        body: 'Check out this new story',
        data: {tourId: 'tour-123', objectId: 'obj-456'},
      })

      expect(notificationId).toBe('notif-789')
      expect(mockNotifee.displayNotification).toHaveBeenCalledWith({
        title: 'New Narrative',
        body: 'Check out this new story',
        data: {tourId: 'tour-123', objectId: 'obj-456'},
        android: {
          channelId: NotificationChannelId.default,
          pressAction: {id: 'default'},
        },
        ios: {sound: 'default'},
      })
    })

    it('should display notifications with all channel types', async () => {
      const channels = [
        NotificationChannelId.default,
        NotificationChannelId.tours,
        NotificationChannelId.narratives,
        NotificationChannelId.recommendations,
        NotificationChannelId.social,
      ]

      for (const channelId of channels) {
        mockNotifee.displayNotification.mockResolvedValue(`notif-${channelId}`)

        await notificationService.displayNotification({
          title: 'Test',
          body: 'Test',
          channelId,
        })

        expect(mockNotifee.displayNotification).toHaveBeenCalledWith(
          expect.objectContaining({
            android: expect.objectContaining({
              channelId,
            }),
          }),
        )
      }
    })
  })

  describe('cancelNotification', () => {
    it('should cancel notification by ID', async () => {
      mockNotifee.cancelNotification.mockResolvedValue(undefined)

      await notificationService.cancelNotification('notif-123')

      expect(mockNotifee.cancelNotification).toHaveBeenCalledWith('notif-123')
      expect(logger.debug).toHaveBeenCalledWith(
        '[NotificationService] Notification cancelled:',
        'notif-123',
      )
    })
  })

  describe('cancelAllNotifications', () => {
    it('should cancel all notifications', async () => {
      mockNotifee.cancelAllNotifications.mockResolvedValue(undefined)

      await notificationService.cancelAllNotifications()

      expect(mockNotifee.cancelAllNotifications).toHaveBeenCalled()
      expect(logger.info).toHaveBeenCalledWith(
        '[NotificationService] All notifications cancelled',
      )
    })
  })

  describe('setBadgeCount', () => {
    it('should set badge count', async () => {
      mockNotifee.setBadgeCount.mockResolvedValue(undefined)

      await notificationService.setBadgeCount(5)

      expect(mockNotifee.setBadgeCount).toHaveBeenCalledWith(5)
    })

    it('should set badge count to zero', async () => {
      mockNotifee.setBadgeCount.mockResolvedValue(undefined)

      await notificationService.setBadgeCount(0)

      expect(mockNotifee.setBadgeCount).toHaveBeenCalledWith(0)
    })
  })

  describe('getBadgeCount', () => {
    it('should get badge count', async () => {
      mockNotifee.getBadgeCount.mockResolvedValue(3)

      const count = await notificationService.getBadgeCount()

      expect(count).toBe(3)
      expect(mockNotifee.getBadgeCount).toHaveBeenCalled()
    })

    it('should get zero badge count', async () => {
      mockNotifee.getBadgeCount.mockResolvedValue(0)

      const count = await notificationService.getBadgeCount()

      expect(count).toBe(0)
    })
  })

  describe('getInitialNotification', () => {
    it('should get initial notification', async () => {
      const mockInitialNotification: InitialNotification = {
        notification: {
          id: 'notif-123',
          title: 'Test',
          body: 'Test body',
        },
        pressAction: {id: 'default'},
      }
      mockNotifee.getInitialNotification.mockResolvedValue(
        mockInitialNotification,
      )

      const initialNotification =
        await notificationService.getInitialNotification()

      expect(initialNotification).toEqual(mockInitialNotification)
      expect(mockNotifee.getInitialNotification).toHaveBeenCalled()
    })

    it('should return null when no initial notification', async () => {
      mockNotifee.getInitialNotification.mockResolvedValue(null)

      const initialNotification =
        await notificationService.getInitialNotification()

      expect(initialNotification).toBeNull()
    })
  })

  describe('event handling', () => {
    it('should handle foreground PRESS event', async () => {
      Platform.OS = 'ios'
      const onForegroundEvent = jest.fn()
      let eventHandler: ((event: Event) => void) | null = null

      mockNotifee.onForegroundEvent.mockImplementation((handler: unknown) => {
        eventHandler = handler as (event: Event) => void
        return jest.fn() as never
      })
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize({onForegroundEvent})

      const event: Event = {
        type: EventType.PRESS,
        detail: {
          notification: {
            id: 'notif-123',
            title: 'Test',
            body: 'Test body',
          },
        },
      }

      if (eventHandler) {
        // @ts-expect-error - Mock type inference issue with notifee callbacks
        eventHandler(event)
      }

      expect(onForegroundEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EventType.PRESS,
        }),
      )
      expect(logger.debug).toHaveBeenCalledWith(
        '[NotificationService] Foreground event:',
        EventType.PRESS,
        expect.any(Object),
      )
    })

    it('should handle foreground DISMISSED event', async () => {
      Platform.OS = 'ios'
      const onForegroundEvent = jest.fn()
      let eventHandler: ((event: Event) => void) | null = null

      mockNotifee.onForegroundEvent.mockImplementation((handler: unknown) => {
        eventHandler = handler as (event: Event) => void
        return jest.fn() as never
      })
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize({onForegroundEvent})

      const event: Event = {
        type: EventType.DISMISSED,
        detail: {
          notification: {
            id: 'notif-123',
            title: 'Test',
            body: 'Test body',
          },
        },
      }

      if (eventHandler) {
        // @ts-expect-error - Mock type inference issue with notifee callbacks
        eventHandler(event)
      }

      expect(onForegroundEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EventType.DISMISSED,
        }),
      )
    })

    it('should handle foreground DELIVERED event', async () => {
      Platform.OS = 'ios'
      const onForegroundEvent = jest.fn()
      let eventHandler: ((event: Event) => void) | null = null

      mockNotifee.onForegroundEvent.mockImplementation((handler: unknown) => {
        eventHandler = handler as (event: Event) => void
        return jest.fn() as never
      })
      mockNotifee.onBackgroundEvent.mockReturnValue(jest.fn() as never)

      await notificationService.initialize({onForegroundEvent})

      const event: Event = {
        type: EventType.DELIVERED,
        detail: {
          notification: {
            id: 'notif-123',
            title: 'Test',
            body: 'Test body',
          },
        },
      }

      if (eventHandler) {
        // @ts-expect-error - Mock type inference issue with notifee callbacks
        eventHandler(event)
      }

      expect(onForegroundEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EventType.DELIVERED,
        }),
      )
    })

    it('should handle background event', async () => {
      Platform.OS = 'ios'
      const onBackgroundEvent = jest.fn().mockResolvedValue(undefined)
      let eventHandler: ((event: Event) => Promise<void>) | null = null

      mockNotifee.onForegroundEvent.mockReturnValue(jest.fn() as never)
      mockNotifee.onBackgroundEvent.mockImplementation((handler: unknown) => {
        eventHandler = handler as (event: Event) => Promise<void>
        return jest.fn() as never
      })

      await notificationService.initialize({onBackgroundEvent})

      const event: Event = {
        type: EventType.PRESS,
        detail: {
          notification: {
            id: 'notif-456',
            title: 'Background Test',
            body: 'Background body',
          },
        },
      }

      if (eventHandler) {
        // @ts-expect-error - Mock type inference issue with notifee callbacks
        await eventHandler(event)
      }

      expect(logger.debug).toHaveBeenCalledWith(
        '[NotificationService] Background event:',
        EventType.PRESS,
        expect.any(Object),
      )
      expect(onBackgroundEvent).toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    it('should handle multiple permission checks', async () => {
      const statuses: AuthorizationStatus[] = [
        AuthorizationStatus.NOT_DETERMINED,
        AuthorizationStatus.AUTHORIZED,
        AuthorizationStatus.DENIED,
      ]
      const expectedStatuses: PermissionStatus[] = [
        'not_determined',
        'granted',
        'denied',
      ]

      for (let i = 0; i < statuses.length; i++) {
        mockNotifee.getNotificationSettings.mockResolvedValue({
          authorizationStatus: statuses[i],
        } as never)

        const status = await notificationService.checkPermission()
        expect(status).toBe(expectedStatuses[i])
      }
    })

    it('should handle rapid notification displays', async () => {
      const notifications = Array.from({length: 10}, (_, i) => ({
        title: `Notification ${i}`,
        body: `Body ${i}`,
      }))

      for (const [index, notification] of notifications.entries()) {
        mockNotifee.displayNotification.mockResolvedValue(`notif-${index}`)

        const id = await notificationService.displayNotification(notification)
        expect(id).toBe(`notif-${index}`)
      }

      expect(mockNotifee.displayNotification).toHaveBeenCalledTimes(10)
    })

    it('should handle badge count edge values', async () => {
      mockNotifee.setBadgeCount.mockResolvedValue(undefined)

      await notificationService.setBadgeCount(0)
      expect(mockNotifee.setBadgeCount).toHaveBeenCalledWith(0)

      await notificationService.setBadgeCount(999)
      expect(mockNotifee.setBadgeCount).toHaveBeenCalledWith(999)
    })
  })
})
