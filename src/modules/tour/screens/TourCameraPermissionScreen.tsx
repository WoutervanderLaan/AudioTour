import React from 'react'

import type {RouteProp} from '@react-navigation/native'

import {PermissionActions} from '../components/PermissionActions'
import {PermissionContent} from '../components/PermissionContent'
import {usePermissionCleanup} from '../hooks/usePermissionCleanup'
import {usePermissionRequest} from '../hooks/usePermissionRequest'
import type {TourModalName, TourModalParams} from '../routes.types'
import {getPermissionContent} from '../utils/permissionContent'

import {Column} from '@/shared/components/ui/layout/Column'
import {Screen} from '@/shared/components/ui/screen/Screen'

/**
 * TourCameraPermissionScreenProps
 * Props for the TourCameraPermissionScreen
 */
type TourCameraPermissionScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourModalParams, TourModalName.cameraPermission>
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
  const {sourceType, onPermissionGranted, onModalDismissed} = route.params

  const content = getPermissionContent(sourceType)

  const {isRequesting, requestPermission, openSettings, skip} =
    usePermissionRequest(sourceType)

  const {markPermissionGranted} = usePermissionCleanup({
    onPermissionGranted,
    onModalDismissed,
  })

  /**
   * handleRequestPermission
   * Handles the user pressing the enable button
   */
  const handleRequestPermission = async (): Promise<void> => {
    const granted = await requestPermission()
    if (granted) {
      markPermissionGranted()
    }
  }

  return (
    <Screen.Scrollable testID="TourCameraPermissionScreen">
      <Column
        flex={1}
        paddingH="md"
        paddingBottom="xl"
        gap="lg"
        testID="TourCameraPermissionScreenContainerColumn">
        <PermissionContent
          content={content}
          testID="TourCameraPermissionScreenPermissionContent"
        />

        <PermissionActions
          primaryButtonLabel={content.primaryButtonLabel}
          isDisabled={isRequesting}
          onPrimaryAction={handleRequestPermission}
          onSkip={skip}
          onOpenSettings={openSettings}
          testID="TourCameraPermissionScreenPermissionActions"
        />
      </Column>
    </Screen.Scrollable>
  )
}
