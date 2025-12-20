import {useState} from 'react'

import {
  cameraService,
  MediaSourceType,
  type PermissionStatus,
} from '../services/cameraService'

import {logger} from '@/core/lib/logger/logger'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * UsePermissionRequestResult
 * Return type for usePermissionRequest hook
 */
export type UsePermissionRequestResult = {
  /**
   * Whether a permission request is in progress
   */
  isRequesting: boolean
  /**
   * Requests permission for the specified source type
   */
  requestPermission: () => Promise<boolean>
  /**
   * Opens device settings
   */
  openSettings: () => Promise<void>
  /**
   * Dismisses the permission screen
   */
  skip: () => void
}

/**
 * usePermissionRequest
 * Hook for handling permission requests and related actions
 *
 * @param sourceType - The media source type (camera or library)
 * @returns Permission request handlers and state
 */
export const usePermissionRequest = (
  sourceType: MediaSourceType,
): UsePermissionRequestResult => {
  const navigation = useNavigation()
  const [isRequesting, setIsRequesting] = useState(false)

  /**
   * requestPermission
   * Requests permission for the specified source type.
   * Returns true if permission was granted, false otherwise.
   */
  const requestPermission = async (): Promise<boolean> => {
    setIsRequesting(true)

    try {
      let status: PermissionStatus

      if (sourceType === MediaSourceType.camera) {
        status = await cameraService.requestCameraPermission()
      } else {
        status = await cameraService.requestLibraryPermission()
      }

      if (status === 'granted') {
        logger.success('[usePermissionRequest] Permission granted')
        navigation.goBack()
        return true
      }

      logger.debug('[usePermissionRequest] Permission denied by user')
      navigation.goBack()
      return false
    } catch (error) {
      logger.error('[usePermissionRequest] Permission request failed:', error)
      navigation.goBack()
      return false
    } finally {
      setIsRequesting(false)
    }
  }

  /**
   * openSettings
   * Opens the device settings for this app
   */
  const openSettings = async (): Promise<void> => {
    try {
      await cameraService.openSettings()
    } catch (error) {
      logger.error('[usePermissionRequest] Failed to open settings:', error)
    }
  }

  /**
   * skip
   * Dismisses the permission screen without requesting permission
   */
  const skip = (): void => {
    navigation.goBack()
  }

  return {
    isRequesting,
    requestPermission,
    openSettings,
    skip,
  }
}
