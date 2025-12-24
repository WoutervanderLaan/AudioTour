import type React from 'react'

import {useToggleNotificationsMutation} from '../api/mutations'
import {NotificationModalName} from '../routes.types'
import {useNotificationStore} from '../store/useNotificationStore'

import {FormField, Switch} from '@/shared/components/ui/form'
import {Column} from '@/shared/components/ui/layout/Column'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
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
    <Screen.Scrollable testId="NotificationSettingsScreen">
      <Column
        flex={1}
        padding="md"
        gap="lg"
        testId="NotificationSettingsScreenContentView">
        <Column
          gap="sm"
          testId="NotificationSettingsScreenHeaderView">
          <Text.Title testId="NotificationSettingsScreenTitleText">
            Push Notifications
          </Text.Title>
          <Text.Paragraph
            color="secondary"
            testId="NotificationSettingsScreenDescriptionText">
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
          testId="NotificationSettingsScreenPushEnabledFormFieldView">
          <Switch
            label="Enable Push Notifications"
            value={preferences.pushEnabled}
            onChange={handleToggleNotifications}
            disabled={toggleMutation.isPending}
            testId="NotificationSettingsScreenPushEnabledSwitch"
          />
        </FormField>
      </Column>
    </Screen.Scrollable>
  )
}
