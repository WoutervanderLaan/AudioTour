import React, {useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import * as ImagePicker from 'expo-image-picker'

import {TourModalName, type TourStackParams} from '../routes.types'

import {logger} from '@/core/lib/logger'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import type {RouteProp} from '@/shared/types/navigation'

/**
 * TourCameraScreenProps
 * Props for the TourCameraScreen
 */
type TourCameraScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, 'TourCamera'>
}

/**
 * TourCameraScreen
 * Camera interface for capturing photos of museum objects.
 * Handles camera permissions and photo capture using expo-image-picker.
 *
 * @param props - Component props
 * @returns Tour camera screen component
 */
export const TourCameraScreen = ({
  route,
}: TourCameraScreenProps): React.JSX.Element => {
  const {navigate, goBack} = useNavigation()
  const {existingPhotos = []} = route.params

  const [permissionStatus, setPermissionStatus] =
    useState<ImagePicker.PermissionStatus>('undetermined')
  const [isLaunching, setIsLaunching] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  /**
   * requestPermission
   * Requests camera permissions from the user
   *
   * @returns Promise that resolves when permission request is complete
   */
  const requestPermission = async (): Promise<void> => {
    try {
      const {status} = await ImagePicker.requestCameraPermissionsAsync()
      setPermissionStatus(status)
    } catch (err) {
      logger.error('[TourCamera] Error requesting permission:', err)
      setError('Failed to request camera permission')
    }
  }

  /**
   * launchCamera
   * Launches the camera to capture a photo
   *
   * @returns Promise that resolves when camera is complete
   */
  const launchCamera = async (): Promise<void> => {
    if (permissionStatus !== 'granted') {
      await requestPermission()
      return
    }

    setIsLaunching(true)
    setError(undefined)

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (!result.canceled && result.assets?.[0]?.uri) {
        const photoUri = result.assets[0].uri
        logger.debug('[TourCamera] Photo captured:', photoUri)

        // Navigate to photo submit modal with captured photo
        navigate(TourModalName.photoSubmit, {
          photos: [...existingPhotos, photoUri],
        })
      } else {
        // User cancelled, go back to feed
        goBack()
      }
    } catch (err) {
      logger.error('[TourCamera] Error launching camera:', err)
      setError('Failed to launch camera')
    } finally {
      setIsLaunching(false)
    }
  }

  // Auto-launch camera on mount if permission granted
  useEffect(() => {
    const init = async (): Promise<void> => {
      const {status} = await ImagePicker.getCameraPermissionsAsync()
      setPermissionStatus(status)

      if (status === 'granted') {
        // Small delay to allow screen transition
        setTimeout(() => {
          launchCamera()
        }, 100)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * handleCancel
   * Cancels camera capture and returns to previous screen
   *
   * @returns void
   */
  const handleCancel = (): void => {
    goBack()
  }

  // Permission denied state
  if (permissionStatus === 'denied') {
    return (
      <Screen.Default>
        <Box
          flex={1}
          center
          paddingH="lg">
          <Column
            gap="md"
            center>
            <Text.H3 style={styles.errorTitle}>Camera Access Required</Text.H3>
            <Text.Body style={styles.errorText}>
              Please enable camera access in your device settings to capture
              photos
            </Text.Body>
            <Button
              label="Go Back"
              onPress={handleCancel}
            />
          </Column>
        </Box>
      </Screen.Default>
    )
  }

  // Permission not determined or loading
  if (
    permissionStatus === 'undetermined' ||
    permissionStatus === 'limited' ||
    isLaunching
  ) {
    return (
      <Screen.Default>
        <Box
          flex={1}
          center
          paddingH="lg">
          <Column
            gap="md"
            center>
            <ActivityIndicator size="large" />
            <Text.Body style={styles.loadingText}>
              {permissionStatus === 'undetermined'
                ? 'Requesting camera permission...'
                : 'Opening camera...'}
            </Text.Body>
          </Column>
        </Box>
      </Screen.Default>
    )
  }

  // Ready to launch camera (permission granted)
  return (
    <Screen.Default>
      <Box
        flex={1}
        center
        paddingH="lg">
        <Column
          gap="md"
          center>
          <Text.H3>Capture Object</Text.H3>
          {error && <Text.Body style={styles.errorText}>{error}</Text.Body>}
          <Button
            label="Open Camera"
            onPress={launchCamera}
            disabled={isLaunching}
          />
          <Button
            label="Cancel"
            onPress={handleCancel}
            variant="secondary"
          />
        </Column>
      </Box>
    </Screen.Default>
  )
}

const styles = StyleSheet.create(theme => ({
  errorTitle: {
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  errorText: {
    textAlign: 'center',
    color: theme.colors.text.error,
    maxWidth: 300,
  },
  loadingText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
}))
