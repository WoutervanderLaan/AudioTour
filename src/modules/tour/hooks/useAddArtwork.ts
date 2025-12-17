import {useCallback, useState} from 'react'
import {Alert, Platform} from 'react-native'

import {
  cameraService,
  MediaSourceType,
  type PermissionStatus,
} from '../services/cameraService'
import {TourModalName} from '../routes.types'

import {logger} from '@/core/lib/logger'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * useAddArtwork
 * Hook that manages the flow for adding artwork via camera or photo library.
 * Handles permission checks, requests, and launching the appropriate picker.
 *
 * @returns Hook methods and state
 */
export const useAddArtwork = (): {
  isLaunching: boolean
  handleAddArtwork: () => void
} => {
  const {navigate} = useNavigation()
  const [isLaunching, setIsLaunching] = useState(false)

  /**
   * checkAndRequestPermission
   * Checks permission status and requests if needed, showing permission modal for undetermined state.
   *
   * @param sourceType - Type of media source (camera or library)
   * @returns Permission status after check/request
   */
  const checkAndRequestPermission = async (
    sourceType: MediaSourceType,
  ): Promise<PermissionStatus> => {
    const isCamera = sourceType === MediaSourceType.camera

    // Check current permission status
    const currentStatus = isCamera
      ? await cameraService.checkCameraPermission()
      : await cameraService.checkLibraryPermission()

    // If already granted, return immediately
    if (currentStatus === 'granted') {
      return 'granted'
    }

    // If denied, show alert and return
    if (currentStatus === 'denied') {
      Alert.alert(
        `${isCamera ? 'Camera' : 'Photo Library'} Access Denied`,
        `Please enable ${isCamera ? 'camera' : 'photo library'} access in your device settings to add artwork.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => cameraService.openSettings(),
          },
        ],
      )
      return 'denied'
    }

    // If not determined, show permission modal and wait for user action
    return new Promise(resolve => {
      navigate(TourModalName.cameraPermission, {
        sourceType,
        onPermissionGranted: async () => {
          // After modal dismisses and permission is granted, check status again
          const newStatus = isCamera
            ? await cameraService.checkCameraPermission()
            : await cameraService.checkLibraryPermission()
          resolve(newStatus)
        },
      })

      // If user dismisses modal without granting, resolve after delay
      setTimeout(async () => {
        const status = isCamera
          ? await cameraService.checkCameraPermission()
          : await cameraService.checkLibraryPermission()
        resolve(status)
      }, 1000)
    })
  }

  /**
   * launchPicker
   * Launches the camera or library picker after permission is granted.
   *
   * @param sourceType - Type of media source to launch
   */
  const launchPicker = async (sourceType: MediaSourceType): Promise<void> => {
    setIsLaunching(true)

    try {
      const permission = await checkAndRequestPermission(sourceType)

      if (permission !== 'granted') {
        logger.debug('[useAddArtwork] Permission not granted, aborting')
        setIsLaunching(false)
        return
      }

      // Launch appropriate picker
      const result =
        sourceType === MediaSourceType.camera
          ? await cameraService.launchCamera()
          : await cameraService.launchLibrary()

      if (!result.canceled && result.uri) {
        // Navigate to photo submit modal
        navigate(TourModalName.photoSubmit, {
          photos: [result.uri],
        })
      }
    } catch (error) {
      logger.error('[useAddArtwork] Error launching picker:', error)
      Alert.alert(
        'Error',
        `Failed to ${sourceType === MediaSourceType.camera ? 'open camera' : 'select photo'}. Please try again.`,
        [{text: 'OK'}],
      )
    } finally {
      setIsLaunching(false)
    }
  }

  /**
   * showSourceSelection
   * Shows an action sheet to let user choose between camera and library.
   */
  const showSourceSelection = useCallback((): void => {
    if (Platform.OS === 'ios') {
      // iOS: Use ActionSheetIOS for native feel
      Alert.alert(
        'Add Artwork',
        'Choose how you want to add artwork to your tour',
        [
          {
            text: 'Take Photo',
            onPress: () => launchPicker(MediaSourceType.camera),
          },
          {
            text: 'Choose from Library',
            onPress: () => launchPicker(MediaSourceType.library),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      )
    } else {
      // Android: Use Alert with buttons
      Alert.alert(
        'Add Artwork',
        'Choose how you want to add artwork to your tour',
        [
          {
            text: 'Take Photo',
            onPress: () => launchPicker(MediaSourceType.camera),
          },
          {
            text: 'Choose from Library',
            onPress: () => launchPicker(MediaSourceType.library),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * handleAddArtwork
   * Entry point for adding artwork. Shows source selection.
   */
  const handleAddArtwork = useCallback((): void => {
    showSourceSelection()
  }, [showSourceSelection])

  return {
    isLaunching,
    handleAddArtwork,
  }
}
