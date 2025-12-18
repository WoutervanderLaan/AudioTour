import type React from 'react'

import {useToggleNotificationsMutation} from '../api/mutations'
import {NotificationModalName} from '../routes.types'
import {useNotificationStore} from '../store/useNotificationStore'

import {Switch} from '@/shared/components/ui/form'
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
    <Screen.Scrollable>
      <Column
        flex={1}
        padding="md"
        gap="lg">
        <Column gap="sm">
          <Text.Title>Push Notifications</Text.Title>
          <Text.Paragraph color="secondary">
            Manage your notification preferences to stay updated on tours, new
            narratives, and recommendations.
          </Text.Paragraph>
        </Column>

        <Column gap="md">
          <Switch
            label="Enable Push Notifications"
            value={preferences.pushEnabled}
            onChange={handleToggleNotifications}
            // hint={
            //   preferences.pushEnabled
            //     ? 'You will receive push notifications'
            //     : 'Push notifications are disabled'
            // }
            disabled={toggleMutation.isPending}
            testID="push-notifications-toggle"
          />
        </Column>

        {!!preferences.pushEnabled && (
          <Column gap="md">
            <Text.Label color="secondary">
              Notification Types (Coming Soon)
            </Text.Label>

            <Switch
              label="Tour Notifications"
              value={preferences.tourNotifications}
              disabled
              // hint="Get notified about tour completions and achievements"
              testID="tour-notifications-toggle"
            />

            <Switch
              label="Narrative Notifications"
              value={preferences.narrativeNotifications}
              disabled
              // hint="Discover new stories about captured objects"
              testID="narrative-notifications-toggle"
            />

            <Switch
              label="Recommendation Notifications"
              value={preferences.recommendationNotifications}
              disabled
              // hint="Receive personalized suggestions"
              testID="recommendation-notifications-toggle"
            />

            <Switch
              label="Social Notifications"
              value={preferences.socialNotifications}
              disabled
              // hint="Updates about friends and community"
              testID="social-notifications-toggle"
            />

            <Text.Paragraph
              variant="small"
              color="secondary">
              Individual notification preferences will be available in a future
              update.
            </Text.Paragraph>
          </Column>
        )}
      </Column>
    </Screen.Scrollable>
  )
}
