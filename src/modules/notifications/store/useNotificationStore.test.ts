import type {NotificationPayload} from '../types'

import {useNotificationStore} from './useNotificationStore'

describe('useNotificationStore', () => {
  const mockNotification: NotificationPayload = {
    id: 'notif-123',
    title: 'Test Notification',
    body: 'This is a test notification',
    data: {route: 'tour'},
    actionType: 'tour_complete',
    createdAt: '2024-01-01T00:00:00Z',
  }

  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useNotificationStore.getState()
    reset()
  })

  describe('initial state', () => {
    it('should have null deviceToken', () => {
      const {deviceToken} = useNotificationStore.getState()
      expect(deviceToken).toBeNull()
    })

    it('should have isRegistered false', () => {
      const {isRegistered} = useNotificationStore.getState()
      expect(isRegistered).toBe(false)
    })

    it('should have hasRequestedPermission false', () => {
      const {hasRequestedPermission} = useNotificationStore.getState()
      expect(hasRequestedPermission).toBe(false)
    })

    it('should have permissionGranted false', () => {
      const {permissionGranted} = useNotificationStore.getState()
      expect(permissionGranted).toBe(false)
    })

    it('should have default preferences', () => {
      const {preferences} = useNotificationStore.getState()
      expect(preferences).toEqual({
        pushEnabled: false,
      })
    })

    it('should have null lastNotification', () => {
      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification).toBeNull()
    })
  })

  describe('setDeviceToken', () => {
    it('should set device token', () => {
      const {setDeviceToken} = useNotificationStore.getState()
      const token = 'device-token-123'

      setDeviceToken(token)

      const {deviceToken} = useNotificationStore.getState()
      expect(deviceToken).toBe(token)
    })

    it('should update device token', () => {
      const {setDeviceToken} = useNotificationStore.getState()

      setDeviceToken('token-1')
      expect(useNotificationStore.getState().deviceToken).toBe('token-1')

      setDeviceToken('token-2')
      expect(useNotificationStore.getState().deviceToken).toBe('token-2')
    })

    it('should set device token to null', () => {
      const {setDeviceToken} = useNotificationStore.getState()

      setDeviceToken('token-123')
      expect(useNotificationStore.getState().deviceToken).toBe('token-123')

      setDeviceToken(null)
      expect(useNotificationStore.getState().deviceToken).toBeNull()
    })
  })

  describe('setIsRegistered', () => {
    it('should set isRegistered to true', () => {
      const {setIsRegistered} = useNotificationStore.getState()

      setIsRegistered(true)

      const {isRegistered} = useNotificationStore.getState()
      expect(isRegistered).toBe(true)
    })

    it('should set isRegistered to false', () => {
      const {setIsRegistered} = useNotificationStore.getState()

      setIsRegistered(true)
      setIsRegistered(false)

      const {isRegistered} = useNotificationStore.getState()
      expect(isRegistered).toBe(false)
    })
  })

  describe('setHasRequestedPermission', () => {
    it('should set hasRequestedPermission to true', () => {
      const {setHasRequestedPermission} = useNotificationStore.getState()

      setHasRequestedPermission(true)

      const {hasRequestedPermission} = useNotificationStore.getState()
      expect(hasRequestedPermission).toBe(true)
    })

    it('should set hasRequestedPermission to false', () => {
      const {setHasRequestedPermission} = useNotificationStore.getState()

      setHasRequestedPermission(true)
      setHasRequestedPermission(false)

      const {hasRequestedPermission} = useNotificationStore.getState()
      expect(hasRequestedPermission).toBe(false)
    })
  })

  describe('setPermissionGranted', () => {
    it('should set permissionGranted to true', () => {
      const {setPermissionGranted} = useNotificationStore.getState()

      setPermissionGranted(true)

      const {permissionGranted} = useNotificationStore.getState()
      expect(permissionGranted).toBe(true)
    })

    it('should set permissionGranted to false', () => {
      const {setPermissionGranted} = useNotificationStore.getState()

      setPermissionGranted(true)
      setPermissionGranted(false)

      const {permissionGranted} = useNotificationStore.getState()
      expect(permissionGranted).toBe(false)
    })
  })

  describe('setPreferences', () => {
    it('should update preferences', () => {
      const {setPreferences} = useNotificationStore.getState()

      setPreferences({pushEnabled: true})

      const {preferences} = useNotificationStore.getState()
      expect(preferences.pushEnabled).toBe(true)
    })

    it('should merge with existing preferences', () => {
      const {setPreferences} = useNotificationStore.getState()

      setPreferences({pushEnabled: true})
      setPreferences({pushEnabled: false})

      const {preferences} = useNotificationStore.getState()
      expect(preferences.pushEnabled).toBe(false)
    })
  })

  describe('setLastNotification', () => {
    it('should set last notification', () => {
      const {setLastNotification} = useNotificationStore.getState()

      setLastNotification(mockNotification)

      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification).toEqual(mockNotification)
    })

    it('should update last notification', () => {
      const {setLastNotification} = useNotificationStore.getState()
      const secondNotification: NotificationPayload = {
        ...mockNotification,
        id: 'notif-456',
        title: 'Second Notification',
      }

      setLastNotification(mockNotification)
      setLastNotification(secondNotification)

      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification).toEqual(secondNotification)
    })

    it('should set last notification to null', () => {
      const {setLastNotification} = useNotificationStore.getState()

      setLastNotification(mockNotification)
      expect(useNotificationStore.getState().lastNotification).toEqual(
        mockNotification,
      )

      setLastNotification(null)
      expect(useNotificationStore.getState().lastNotification).toBeNull()
    })

    it('should handle notification with minimal data', () => {
      const {setLastNotification} = useNotificationStore.getState()
      const minimalNotification: NotificationPayload = {
        id: 'notif-min',
        title: 'Minimal',
        body: 'Test',
        createdAt: '2024-01-01T00:00:00Z',
      }

      setLastNotification(minimalNotification)

      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification).toEqual(minimalNotification)
    })

    it('should handle notification with custom data', () => {
      const {setLastNotification} = useNotificationStore.getState()
      const notificationWithData: NotificationPayload = {
        ...mockNotification,
        data: {
          route: 'tour',
          objectId: 'obj-123',
          customField: 'value',
        },
      }

      setLastNotification(notificationWithData)

      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification?.data).toEqual({
        route: 'tour',
        objectId: 'obj-123',
        customField: 'value',
      })
    })

    it('should handle all action types', () => {
      const {setLastNotification} = useNotificationStore.getState()
      const actionTypes = [
        'tour_complete',
        'new_narrative',
        'recommendation',
        'social',
        'system',
      ]

      actionTypes.forEach(actionType => {
        const notification: NotificationPayload = {
          ...mockNotification,
          actionType: actionType as NotificationPayload['actionType'],
        }
        setLastNotification(notification)

        const {lastNotification} = useNotificationStore.getState()
        expect(lastNotification?.actionType).toBe(actionType)
      })
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const {
        setDeviceToken,
        setIsRegistered,
        setHasRequestedPermission,
        setPermissionGranted,
        setPreferences,
        setLastNotification,
        reset,
      } = useNotificationStore.getState()

      setDeviceToken('token-123')
      setIsRegistered(true)
      setHasRequestedPermission(true)
      setPermissionGranted(true)
      setPreferences({pushEnabled: true})
      setLastNotification(mockNotification)

      reset()

      const state = useNotificationStore.getState()
      expect(state.deviceToken).toBeNull()
      expect(state.isRegistered).toBe(false)
      expect(state.hasRequestedPermission).toBe(false)
      expect(state.permissionGranted).toBe(false)
      expect(state.preferences).toEqual({
        pushEnabled: false,
      })
      expect(state.lastNotification).toBeNull()
    })

    it('should allow setting values after reset', () => {
      const {setDeviceToken, reset} = useNotificationStore.getState()

      setDeviceToken('token-1')
      reset()
      setDeviceToken('token-2')

      const {deviceToken} = useNotificationStore.getState()
      expect(deviceToken).toBe('token-2')
    })
  })

  describe('initialize', () => {
    it('should not throw error', () => {
      const {initialize} = useNotificationStore.getState()

      expect(() => initialize()).not.toThrow()
    })

    it('should not affect state', () => {
      const {setDeviceToken, initialize} = useNotificationStore.getState()

      setDeviceToken('token-123')
      const stateBefore = useNotificationStore.getState()

      initialize()

      const stateAfter = useNotificationStore.getState()
      expect(stateAfter).toEqual(stateBefore)
    })
  })

  describe('edge cases', () => {
    it('should handle permission flow', () => {
      const {
        setHasRequestedPermission,
        setPermissionGranted,
        setDeviceToken,
        setIsRegistered,
      } = useNotificationStore.getState()

      // Simulate permission request flow
      setHasRequestedPermission(true)
      setPermissionGranted(true)
      setDeviceToken('device-token-abc')
      setIsRegistered(true)

      const state = useNotificationStore.getState()
      expect(state.hasRequestedPermission).toBe(true)
      expect(state.permissionGranted).toBe(true)
      expect(state.deviceToken).toBe('device-token-abc')
      expect(state.isRegistered).toBe(true)
    })

    it('should handle permission denied flow', () => {
      const {setHasRequestedPermission, setPermissionGranted} =
        useNotificationStore.getState()

      setHasRequestedPermission(true)
      setPermissionGranted(false)

      const state = useNotificationStore.getState()
      expect(state.hasRequestedPermission).toBe(true)
      expect(state.permissionGranted).toBe(false)
      expect(state.deviceToken).toBeNull()
      expect(state.isRegistered).toBe(false)
    })

    it('should handle disabling notifications', () => {
      const {setPreferences} = useNotificationStore.getState()

      setPreferences({
        pushEnabled: false,
      })

      const {preferences} = useNotificationStore.getState()
      expect(preferences.pushEnabled).toBe(false)
    })

    it('should handle multiple notification updates', () => {
      const {setLastNotification} = useNotificationStore.getState()

      for (let i = 0; i < 5; i++) {
        const notification: NotificationPayload = {
          id: `notif-${i}`,
          title: `Notification ${i}`,
          body: `Body ${i}`,
          createdAt: `2024-01-0${i + 1}T00:00:00Z`,
        }
        setLastNotification(notification)
      }

      const {lastNotification} = useNotificationStore.getState()
      expect(lastNotification?.id).toBe('notif-4')
    })
  })
})
