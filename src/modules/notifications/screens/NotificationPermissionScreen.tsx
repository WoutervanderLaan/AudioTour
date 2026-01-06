import React, {useState} from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {useToggleNotificationsMutation} from '../api/mutations'
import {notificationService} from '../services/notificationService'
import {useNotificationStore} from '../store/useNotificationStore'

import {logger} from '@/core/lib/logger/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * NotificationPermissionScreen
 * Modal screen that requests push notification permission from the user.
 * Provides a user-friendly explanation of why notifications are useful
 * before triggering the system permission dialog via Notifee.
 *
 * @returns {React.JSX.Element} The notification permission request modal
 */
export const NotificationPermissionScreen = (): React.JSX.Element => {
  const navigation = useNavigation()

  const {setHasRequestedPermission, setPermissionGranted} =
    useNotificationStore()

  const toggleMutation = useToggleNotificationsMutation()

  const [isRequesting, setIsRequesting] = useState(false)

  /**
   * handleEnableNotifications
   * Handles the user pressing the enable notifications button.
   * Triggers the system permission dialog via Notifee, then syncs with backend.
   */
  const handleEnableNotifications = async (): Promise<void> => {
    setIsRequesting(true)

    try {
      // Request actual system permission via Notifee
      const status = await notificationService.requestPermission()

      setHasRequestedPermission(true)
      setPermissionGranted(status === 'granted')

      if (status === 'granted') {
        // Sync with backend
        toggleMutation.mutate(
          {enabled: true},
          {
            onSettled: () => {
              navigation.goBack()
            },
          },
        )
      } else {
        // Permission denied, close modal
        logger.debug('[Notifications] Permission denied by user')
        navigation.goBack()
      }
    } catch (error) {
      logger.error('[Notifications] Permission request failed:', error)
      setIsRequesting(false)
      await notificationService.openSettings()
    }
  }

  /**
   * handleSkip
   * Handles the user pressing the skip/not now button.
   * Sets the permission requested flag and closes the modal.
   */
  const handleSkip = (): void => {
    setHasRequestedPermission(true)
    setPermissionGranted(false)
    navigation.goBack()
  }

  return (
    <Screen.Static testID="NotificationPermissionScreen">
      <Column
        flex={1}
        justifyContent="space-between"
        padding="lg"
        paddingV="xl"
        gap="lg"
        testID="NotificationPermissionScreenContainer">
        <Column
          gap="md"
          centerX
          testID="NotificationPermissionScreenContentColumn">
          <MaterialIcons
            name="notifications-active"
            size={80}
            color={styles.icon.color}
          />

          <Text.Title
            align="center"
            testID="NotificationPermissionScreenTitleText">
            Stay Updated
          </Text.Title>

          <Text.Paragraph
            color="secondary"
            align="center"
            testID="NotificationPermissionScreenDescriptionText">
            Enable push notifications to receive updates about your audio tours,
            new narratives for your collected objects, and personalized
            recommendations.
          </Text.Paragraph>
        </Column>

        <Column
          gap="sm"
          testID="NotificationPermissionScreenActionsColumn">
          <Button
            label="Enable Notifications"
            onPress={handleEnableNotifications}
            disabled={isRequesting || toggleMutation.isPending}
            testID="NotificationPermissionScreenEnableButton"
          />
          <Button
            label="Not Now"
            variant="secondary"
            onPress={handleSkip}
            disabled={isRequesting || toggleMutation.isPending}
            testID="NotificationPermissionScreenNotNowButton"
          />
        </Column>
      </Column>
    </Screen.Static>
  )
}

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.color.pressable.primary.default.background,
  },
}))
