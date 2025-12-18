import {useCallback, useRef, useState} from 'react'
import {Alert} from 'react-native'

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
  const permissionResolverRef = useRef<((status: PermissionStatus) => void) | null>(null)

  /**
   * checkAndRequestPermission
   * Checks permission status and requests if needed, showing permission modal for undetermined state.
   *
   * @param sourceType - Type of media source (camera or library)
   * @returns Permission status after check/request
   */
  const checkAndRequestPermission = useCallback(
    async (sourceType: MediaSourceType): Promise<PermissionStatus> => {
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
              onPress: () => {
                cameraService.openSettings().catch(err =>
                  logger.error('[useAddArtwork] Failed to open settings:', err),
                )
              },
            },
          ],
        )
        return 'denied'
      }

      // If not determined, show permission modal and wait for result
      return new Promise(resolve => {
        // Store resolver to prevent race condition
        permissionResolverRef.current = resolve

        navigate(TourModalName.cameraPermission, {
          sourceType,
          onPermissionGranted: async () => {
            // Check if resolver is still valid (not already resolved)
            if (permissionResolverRef.current) {
              const newStatus = isCamera
                ? await cameraService.checkCameraPermission()
                : await cameraService.checkLibraryPermission()

              // Resolve and clear ref
              permissionResolverRef.current(newStatus)
              permissionResolverRef.current = null
            }
          },
          onModalDismissed: async () => {
            // Called when modal is dismissed without granting
            if (permissionResolverRef.current) {
              const status = isCamera
                ? await cameraService.checkCameraPermission()
                : await cameraService.checkLibraryPermission()

              // Resolve and clear ref
              permissionResolverRef.current(status)
              permissionResolverRef.current = null
            }
          },
        })
      })
    },
    [navigate],
  )

  /**
   * launchPicker
   * Launches the camera or library picker after permission is granted.
   *
   * @param sourceType - Type of media source to launch
   */
  const launchPicker = useCallback(
    async (sourceType: MediaSourceType): Promise<void> => {
      setIsLaunching(true)

      try {
        const permission = await checkAndRequestPermission(sourceType)

        if (permission !== 'granted') {
          logger.debug('[useAddArtwork] Permission not granted, aborting')
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
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred'
        Alert.alert(
          'Error',
          `Failed to ${sourceType === MediaSourceType.camera ? 'open camera' : 'select photo'}. ${errorMessage}`,
          [{text: 'OK'}],
        )
      } finally {
        setIsLaunching(false)
      }
    },
    [checkAndRequestPermission, navigate],
  )

  /**
   * handleAddArtwork
   * Entry point for adding artwork. Shows action sheet to choose source.
   */
  const handleAddArtwork = useCallback((): void => {
    Alert.alert(
      'Add Artwork',
      'Choose how you want to add artwork to your tour',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            launchPicker(MediaSourceType.camera).catch(err =>
              logger.error('[useAddArtwork] Camera launch failed:', err),
            )
          },
        },
        {
          text: 'Choose from Library',
          onPress: () => {
            launchPicker(MediaSourceType.library).catch(err =>
              logger.error('[useAddArtwork] Library launch failed:', err),
            )
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    )
  }, [launchPicker])

  return {
    isLaunching,
    handleAddArtwork,
  }
}
