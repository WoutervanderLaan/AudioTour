import {act, renderHook} from '@testing-library/react-native'

import type {NotificationPayload, NotificationPreferences} from '../types'
import {
  useDeviceToken,
  useLastNotification,
  useNotificationActions,
  useNotificationPermission,
  useNotificationPreferences,
  useNotificationRegistrationStatus,
} from './selectors'
import {useNotificationStore} from './useNotificationStore'

describe('notification selectors', () => {
  const mockNotification: NotificationPayload = {
    id: 'notif-123',
    title: 'Test',
    body: 'Test body',
    createdAt: '2024-01-01T00:00:00Z',
  }

  beforeEach(() => {
    // Reset store
    useNotificationStore.getState().reset()
  })

  describe('useDeviceToken', () => {
    it('should return null initially', () => {
      const {result} = renderHook(() => useDeviceToken())

      expect(result.current).toBeNull()
    })

    it('should return device token when set', () => {
      act(() => {
        useNotificationStore.getState().setDeviceToken('token-123')
      })

      const {result} = renderHook(() => useDeviceToken())

      expect(result.current).toBe('token-123')
    })

    it('should update when token changes', () => {
      const {result} = renderHook(() => useDeviceToken())

      act(() => {
        useNotificationStore.getState().setDeviceToken('token-1')
      })
      expect(result.current).toBe('token-1')

      act(() => {
        useNotificationStore.getState().setDeviceToken('token-2')
      })
      expect(result.current).toBe('token-2')
    })
  })

  describe('useNotificationRegistrationStatus', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useNotificationRegistrationStatus())

      expect(result.current).toBe(false)
    })

    it('should return true when registered', () => {
      act(() => {
        useNotificationStore.getState().setIsRegistered(true)
      })

      const {result} = renderHook(() => useNotificationRegistrationStatus())

      expect(result.current).toBe(true)
    })

    it('should update when status changes', () => {
      const {result} = renderHook(() => useNotificationRegistrationStatus())

      act(() => {
        useNotificationStore.getState().setIsRegistered(true)
      })
      expect(result.current).toBe(true)

      act(() => {
        useNotificationStore.getState().setIsRegistered(false)
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useNotificationPermission', () => {
    it('should return initial permission state', () => {
      const {result} = renderHook(() => useNotificationPermission())

      expect(result.current).toEqual({
        hasRequestedPermission: false,
        permissionGranted: false,
      })
    })

    it('should update when permission is requested', () => {
      act(() => {
        useNotificationStore.getState().setHasRequestedPermission(true)
      })

      const {result} = renderHook(() => useNotificationPermission())

      expect(result.current.hasRequestedPermission).toBe(true)
      expect(result.current.permissionGranted).toBe(false)
    })

    it('should update when permission is granted', () => {
      act(() => {
        useNotificationStore.getState().setHasRequestedPermission(true)
        useNotificationStore.getState().setPermissionGranted(true)
      })

      const {result} = renderHook(() => useNotificationPermission())

      expect(result.current).toEqual({
        hasRequestedPermission: true,
        permissionGranted: true,
      })
    })
  })

  describe('useNotificationPreferences', () => {
    it('should return default preferences', () => {
      const {result} = renderHook(() => useNotificationPreferences())

      expect(result.current).toEqual({
        pushEnabled: false,
        tourNotifications: true,
        narrativeNotifications: true,
        recommendationNotifications: true,
        socialNotifications: true,
      })
    })

    it('should update when preferences change', () => {
      act(() => {
        useNotificationStore.getState().setPreferences({pushEnabled: true})
      })

      const {result} = renderHook(() => useNotificationPreferences())

      expect(result.current.pushEnabled).toBe(true)
    })

    it('should merge partial updates', () => {
      const {result} = renderHook(() => useNotificationPreferences())

      act(() => {
        useNotificationStore.getState().setPreferences({
          pushEnabled: true,
          tourNotifications: false,
        })
      })

      expect(result.current.pushEnabled).toBe(true)
      expect(result.current.tourNotifications).toBe(false)
      expect(result.current.narrativeNotifications).toBe(true) // unchanged
    })
  })

  describe('useLastNotification', () => {
    it('should return null initially', () => {
      const {result} = renderHook(() => useLastNotification())

      expect(result.current).toBeNull()
    })

    it('should return last notification when set', () => {
      act(() => {
        useNotificationStore.getState().setLastNotification(mockNotification)
      })

      const {result} = renderHook(() => useLastNotification())

      expect(result.current).toEqual(mockNotification)
    })

    it('should update when notification changes', () => {
      const {result} = renderHook(() => useLastNotification())

      act(() => {
        useNotificationStore.getState().setLastNotification(mockNotification)
      })
      expect(result.current).toEqual(mockNotification)

      const newNotification: NotificationPayload = {
        ...mockNotification,
        id: 'notif-456',
        title: 'New Notification',
      }
      act(() => {
        useNotificationStore.getState().setLastNotification(newNotification)
      })
      expect(result.current).toEqual(newNotification)
    })
  })

  describe('useNotificationActions', () => {
    it('should return all action methods', () => {
      const {result} = renderHook(() => useNotificationActions())

      expect(result.current).toHaveProperty('setDeviceToken')
      expect(result.current).toHaveProperty('setIsRegistered')
      expect(result.current).toHaveProperty('setHasRequestedPermission')
      expect(result.current).toHaveProperty('setPermissionGranted')
      expect(result.current).toHaveProperty('setPreferences')
      expect(result.current).toHaveProperty('setLastNotification')
      expect(result.current).toHaveProperty('reset')
      expect(result.current).toHaveProperty('initialize')
    })

    it('should set device token via action', () => {
      const {result} = renderHook(() => useNotificationActions())

      act(() => {
        result.current.setDeviceToken('new-token')
      })

      expect(useNotificationStore.getState().deviceToken).toBe('new-token')
    })

    it('should set registration status via action', () => {
      const {result} = renderHook(() => useNotificationActions())

      act(() => {
        result.current.setIsRegistered(true)
      })

      expect(useNotificationStore.getState().isRegistered).toBe(true)
    })

    it('should set permission states via action', () => {
      const {result} = renderHook(() => useNotificationActions())

      act(() => {
        result.current.setHasRequestedPermission(true)
        result.current.setPermissionGranted(true)
      })

      const state = useNotificationStore.getState()
      expect(state.hasRequestedPermission).toBe(true)
      expect(state.permissionGranted).toBe(true)
    })

    it('should set preferences via action', () => {
      const {result} = renderHook(() => useNotificationActions())
      const prefs: Partial<NotificationPreferences> = {
        pushEnabled: true,
        tourNotifications: false,
      }

      act(() => {
        result.current.setPreferences(prefs)
      })

      const state = useNotificationStore.getState()
      expect(state.preferences.pushEnabled).toBe(true)
      expect(state.preferences.tourNotifications).toBe(false)
    })

    it('should set last notification via action', () => {
      const {result} = renderHook(() => useNotificationActions())

      act(() => {
        result.current.setLastNotification(mockNotification)
      })

      expect(useNotificationStore.getState().lastNotification).toEqual(
        mockNotification,
      )
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useNotificationActions())

      act(() => {
        result.current.setDeviceToken('token')
        result.current.setIsRegistered(true)
        result.current.setLastNotification(mockNotification)
      })

      act(() => {
        result.current.reset()
      })

      const state = useNotificationStore.getState()
      expect(state.deviceToken).toBeNull()
      expect(state.isRegistered).toBe(false)
      expect(state.lastNotification).toBeNull()
    })

    it('should call initialize without error', () => {
      const {result} = renderHook(() => useNotificationActions())

      expect(() => {
        act(() => {
          result.current.initialize()
        })
      }).not.toThrow()
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useNotificationActions())

      const firstReference = result.current

      rerender(null)

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: tokenResult} = renderHook(() => useDeviceToken())
      const {result: statusResult} = renderHook(() =>
        useNotificationRegistrationStatus(),
      )
      const {result: permissionResult} = renderHook(() =>
        useNotificationPermission(),
      )
      const {result: prefsResult} = renderHook(() =>
        useNotificationPreferences(),
      )
      const {result: notifResult} = renderHook(() => useLastNotification())
      const {result: actionsResult} = renderHook(() => useNotificationActions())

      // Complete registration flow
      act(() => {
        actionsResult.current.setHasRequestedPermission(true)
        actionsResult.current.setPermissionGranted(true)
        actionsResult.current.setDeviceToken('device-token-abc')
        actionsResult.current.setIsRegistered(true)
        actionsResult.current.setPreferences({pushEnabled: true})
        actionsResult.current.setLastNotification(mockNotification)
      })

      expect(tokenResult.current).toBe('device-token-abc')
      expect(statusResult.current).toBe(true)
      expect(permissionResult.current.hasRequestedPermission).toBe(true)
      expect(permissionResult.current.permissionGranted).toBe(true)
      expect(prefsResult.current.pushEnabled).toBe(true)
      expect(notifResult.current).toEqual(mockNotification)

      // Reset
      act(() => {
        actionsResult.current.reset()
      })

      expect(tokenResult.current).toBeNull()
      expect(statusResult.current).toBe(false)
      expect(permissionResult.current.hasRequestedPermission).toBe(false)
      expect(permissionResult.current.permissionGranted).toBe(false)
      expect(notifResult.current).toBeNull()
    })
  })
})
