import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Linking} from 'react-native'

import type {RouteProp} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import {
  TourModalName,
  type TourRouteName,
  type TourStackParams,
} from '../routes.types'

import {logger} from '@/core/lib/logger'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import {wait} from '@/shared/utils/wait'

/**
 * TourCameraScreenProps
 * Props for the TourCameraScreen
 */
type TourCameraScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, TourRouteName.camera>
}

const DeniedContent = React.memo(() => {
  //TODO: this should be a permission modal

  return (
    <>
      <Text.Title align="center">Camera Access Required</Text.Title>
      <Text.Paragraph
        color="warning"
        align="center"
        variant="small">
        Please enable camera access in your device settings to capture photos
      </Text.Paragraph>
      <Button
        label="Go to Settings"
        onPress={() => Linking.openSettings()}
      />
    </>
  )
})

const LoadingContent = React.memo(
  ({permissionStatus}: {permissionStatus: ImagePicker.PermissionStatus}) => (
    <>
      <ActivityIndicator size="large" />
      <Text.Paragraph
        align="center"
        variant="small">
        {permissionStatus === ImagePicker.PermissionStatus.UNDETERMINED
          ? 'Requesting camera permission...'
          : 'Opening camera...'}
      </Text.Paragraph>
    </>
  ),
)

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
    useState<ImagePicker.PermissionStatus>(
      ImagePicker.PermissionStatus.UNDETERMINED,
    )
  const [isLaunching, setIsLaunching] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  /**
   * launchCamera
   * Launches the camera to capture a photo
   *
   * @returns Promise that resolves when camera is complete
   */
  const launchCamera = async (): Promise<void> => {
    setIsLaunching(true)
    setError(undefined)

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // TODO: for sim only
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (!result.canceled && result.assets?.[0]?.uri) {
        const photoUri = result.assets[0].uri
        logger.debug('[TourCamera] Photo captured:', photoUri)

        navigate(TourModalName.photoSubmit, {
          photos: [...existingPhotos, photoUri],
        })
      } else {
        goBack()
      }
    } catch (err) {
      logger.error('[TourCamera] Error launching camera:', err)
      setError('Failed to launch camera')
    } finally {
      setIsLaunching(false)
    }
  }

  useEffect(() => {
    /**
     * init
     * Auto-launch camera on mount if permission granted
     */
    const init = async (): Promise<void> => {
      try {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()
        setPermissionStatus(status)

        if (status === ImagePicker.PermissionStatus.GRANTED) {
          await wait(100)
          launchCamera()
        }
      } catch (err) {
        logger.error('[TourCamera] Error requesting permissions', err)
        setError('Failed to get permissions')
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen.Static>
      <Box
        flex={1}
        center
        paddingH="lg">
        <Column
          gap="md"
          center>
          {permissionStatus === ImagePicker.PermissionStatus.DENIED &&
            !isLaunching && <DeniedContent />}

          {Boolean(
            permissionStatus === ImagePicker.PermissionStatus.UNDETERMINED ||
              isLaunching,
          ) && <LoadingContent permissionStatus={permissionStatus} />}

          {permissionStatus === ImagePicker.PermissionStatus.GRANTED &&
            !isLaunching && (
              <>
                <Text.Title>Capture Object</Text.Title>
                {!!error && (
                  <Text.Paragraph color="warning">{error}</Text.Paragraph>
                )}
                <Button
                  label="Open Camera"
                  onPress={launchCamera}
                  disabled={isLaunching}
                />
                <Button
                  label="Cancel"
                  onPress={goBack}
                  variant="secondary"
                />
              </>
            )}
        </Column>
      </Box>
    </Screen.Static>
  )
}
