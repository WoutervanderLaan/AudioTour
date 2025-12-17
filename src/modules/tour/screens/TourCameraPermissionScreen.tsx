import React, {useState} from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {RouteProp} from '@react-navigation/native'

import type {TourModalName, TourStackParams} from '../routes.types'
import {
  cameraService,
  type PermissionStatus,
  MediaSourceType,
} from '../services/cameraService'

import {logger} from '@/core/lib/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * TourCameraPermissionScreenProps
 * Props for the TourCameraPermissionScreen
 */
type TourCameraPermissionScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, TourModalName.cameraPermission>
}

/**
 * TourCameraPermissionScreen
 * Modal screen that requests camera or photo library permission from the user.
 * Provides a user-friendly explanation of why access is needed before triggering
 * the system permission dialog.
 *
 * @param props - Component props
 * @returns The camera permission request modal
 */
export const TourCameraPermissionScreen = ({
  route,
}: TourCameraPermissionScreenProps): React.JSX.Element => {
  const navigation = useNavigation()
  const {sourceType, onPermissionGranted} = route.params
  const [isRequesting, setIsRequesting] = useState(false)

  const isCamera = sourceType === MediaSourceType.camera
  const title = isCamera ? 'Camera Access Required' : 'Photo Library Access Required'
  const icon = isCamera ? 'photo-camera' : 'photo-library'

  /**
   * handleRequestPermission
   * Handles the user pressing the enable button.
   * Triggers the system permission dialog and calls the callback if granted.
   */
  const handleRequestPermission = async (): Promise<void> => {
    setIsRequesting(true)

    try {
      let status: PermissionStatus

      if (isCamera) {
        status = await cameraService.requestCameraPermission()
      } else {
        status = await cameraService.requestLibraryPermission()
      }

      if (status === 'granted') {
        logger.success('[TourCameraPermission] Permission granted')
        navigation.goBack()
        // Call the callback after modal is dismissed
        setTimeout(() => {
          onPermissionGranted()
        }, 100)
      } else {
        logger.debug('[TourCameraPermission] Permission denied by user')
        navigation.goBack()
      }
    } catch (error) {
      logger.error('[TourCameraPermission] Permission request failed:', error)
      navigation.goBack()
    } finally {
      setIsRequesting(false)
    }
  }

  /**
   * handleSkip
   * Handles the user pressing the skip/not now button.
   * Closes the modal without requesting permission.
   */
  const handleSkip = (): void => {
    navigation.goBack()
  }

  /**
   * handleOpenSettings
   * Opens the device settings for this app.
   * Useful if the user previously denied permission.
   */
  const handleOpenSettings = async (): Promise<void> => {
    await cameraService.openSettings()
  }

  return (
    <Screen.Static>
      <Column
        flex={1}
        padding="lg"
        paddingTop="xl"
        gap="lg">
        <Column
          flex={1}
          gap="md"
          centerX>
          <MaterialIcons
            name={icon}
            size={80}
            color={styles.icon.color}
          />

          <Spacer size="md" />

          <Text.Title align="center">{title}</Text.Title>

          <Text.Paragraph
            color="secondary"
            align="center">
            {isCamera
              ? 'To capture photos of museum objects, we need access to your camera. This allows you to create personalized audio tours.'
              : 'To select photos of museum objects, we need access to your photo library. This allows you to create personalized audio tours.'}
          </Text.Paragraph>

          <Spacer size="lg" />

          <Column gap="sm">
            <PermissionBenefit
              icon="camera-alt"
              title="Capture Objects"
              description="Take photos of artworks and exhibits to add to your tour"
            />
            <PermissionBenefit
              icon="auto-stories"
              title="AI-Generated Narratives"
              description="Get personalized stories about each object you capture"
            />
            <PermissionBenefit
              icon="headphones"
              title="Audio Tours"
              description="Listen to immersive audio content as you explore"
            />
          </Column>
        </Column>

        <Column gap="sm">
          <Button
            label={isCamera ? 'Enable Camera' : 'Enable Photo Library'}
            onPress={handleRequestPermission}
            disabled={isRequesting}
          />
          <Button
            label="Not Now"
            variant="secondary"
            onPress={handleSkip}
            disabled={isRequesting}
          />
          <Button
            label="Open Settings"
            variant="secondary"
            onPress={handleOpenSettings}
            disabled={isRequesting}
          />
        </Column>
      </Column>
    </Screen.Static>
  )
}

/**
 * PermissionBenefitProps
 * Props for the PermissionBenefit component
 */
type PermissionBenefitProps = {
  /**
   * Icon name from MaterialIcons
   */
  icon: keyof typeof MaterialIcons.glyphMap
  /**
   * Benefit title
   */
  title: string
  /**
   * Benefit description
   */
  description: string
}

/**
 * PermissionBenefit
 * Displays a single permission benefit with icon and description.
 *
 * @param props - Component props
 * @returns Rendered benefit item
 */
const PermissionBenefit = ({
  icon,
  title,
  description,
}: PermissionBenefitProps): React.JSX.Element => {
  return (
    <Column
      gap="xs"
      style={styles.benefitContainer}>
      <Column
        gap="sm"
        style={styles.benefitRow}>
        <MaterialIcons
          name={icon}
          size={24}
          color={styles.benefitIcon.color}
        />
        <Column
          flex={1}
          gap="xs">
          <Text.Label>{title}</Text.Label>
          <Text.Paragraph
            variant="small"
            color="secondary">
            {description}
          </Text.Paragraph>
        </Column>
      </Column>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.pressable.primary.default.background,
  },
  benefitContainer: {
    paddingVertical: theme.size.sm,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  benefitIcon: {
    color: theme.color.text.secondary,
  },
}))
