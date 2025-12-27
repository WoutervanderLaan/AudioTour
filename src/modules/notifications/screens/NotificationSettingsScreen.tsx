import type React from 'react'

import {useToggleNotificationsMutation} from '../api/mutations'
import {NotificationModalName} from '../routes.types'
import {useNotificationStore} from '../store/useNotificationStore'

import {FormField} from '@/shared/components/ui/form/FormField'
import {Switch} from '@/shared/components/ui/form/Switch'
import {Column} from '@/shared/components/ui/layout/Column'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * NotificationSettingsScreen
 * Screen for managing push notification settings.
 * Allows users to toggle notifications on/off and manage preferences.
 *
 * @returns {React.JSX.Element} The notification settings screen
 */
export const NotificationSettingsScreen = (): React.JSX.Element => {
  const navigation = useNavigation()
  const {preferences, permissionGranted, hasRequestedPermission} =
    useNotificationStore()
  const toggleMutation = useToggleNotificationsMutation()

  /**
   * handleToggleNotifications
   * Handles toggling push notifications on/off.
   * If permission hasn't been requested yet, opens the permission modal.
   *
   * @param {boolean} enabled - Whether to enable or disable notifications
   */
  const handleToggleNotifications = (enabled: boolean): void => {
    if (enabled && !hasRequestedPermission) {
      navigation.navigate(NotificationModalName.permission)
      return
    }

    if (enabled && !permissionGranted) {
      navigation.navigate(NotificationModalName.permission)
      return
    }

    toggleMutation.mutate({enabled})
  }

  return (
    <Screen.Scrollable testID="NotificationSettingsScreen">
      <Column
        flex={1}
        padding="md"
        gap="lg"
        testID="NotificationSettingsScreenContentColumn">
        <Column
          gap="sm"
          testID="NotificationSettingsScreenHeaderColumn">
          <Text.Title testID="NotificationSettingsScreenTitleText">
            Push Notifications
          </Text.Title>
          <Text.Paragraph
            color="secondary"
            testID="NotificationSettingsScreenDescriptionText">
            Manage your notification preferences to stay updated on tours, new
            narratives, and recommendations.
          </Text.Paragraph>
        </Column>

        <FormField
          hint={
            preferences.pushEnabled
              ? 'You will receive push notifications'
              : 'Push notifications are disabled'
          }
          testID="NotificationSettingsScreenPushEnabledFormField">
          <Switch
            label="Enable Push Notifications"
            value={preferences.pushEnabled}
            onChange={handleToggleNotifications}
            disabled={toggleMutation.isPending}
            testID="NotificationSettingsScreenPushEnabledSwitch"
          />
        </FormField>
      </Column>
    </Screen.Scrollable>
  )
}
