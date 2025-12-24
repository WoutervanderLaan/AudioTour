import React, {useState} from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {useToggleNotificationsMutation} from '../api/mutations'
import {notificationService} from '../services/notificationService'
import {useNotificationStore} from '../store/useNotificationStore'

import {logger} from '@/core/lib/logger/logger'
import {Column} from '@/shared/components/ui/layout/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
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

  /**
   * handleOpenSettings
   * Opens the device notification settings for this app.
   * Useful if the user previously denied permission.
   */
  const handleOpenSettings = async (): Promise<void> => {
    await notificationService.openSettings()
  }

  const isPending = isRequesting || toggleMutation.isPending

  return (
    <Screen.Static testId="NotificationPermissionScreen">
      <Column
        flex={1}
        padding="lg"
        paddingTop="xl"
        gap="lg"
        testId="NotificationPermissionScreenContainerView">
        <Column
          flex={1}
          gap="md"
          centerX
          testId="NotificationPermissionScreenContentView">
          <MaterialIcons
            name="notifications-active"
            size={80}
            color={styles.icon.color}
          />

          <Spacer
            size="md"
            testId="NotificationPermissionScreenTopSpacerView" />

          <Text.Title
            align="center"
            testId="NotificationPermissionScreenTitleText">
            Stay Updated
          </Text.Title>

          <Text.Paragraph
            color="secondary"
            align="center"
            testId="NotificationPermissionScreenDescriptionText">
            Enable push notifications to receive updates about your audio tours,
            new narratives for your collected objects, and personalized
            recommendations.
          </Text.Paragraph>

          <Spacer
            size="lg"
            testId="NotificationPermissionScreenMiddleSpacerView" />

          <Column
            gap="sm"
            testId="NotificationPermissionScreenBenefitsView">
            <NotificationBenefit
              icon="tour"
              title="Tour Updates"
              description="Get notified when you complete tours and earn achievements"
              testId="NotificationPermissionScreenTourUpdatesBenefit"
            />
            <NotificationBenefit
              icon="auto-stories"
              title="New Narratives"
              description="Discover new stories about museum objects you've captured"
              testId="NotificationPermissionScreenNewNarrativesBenefit"
            />
            <NotificationBenefit
              icon="recommend"
              title="Recommendations"
              description="Receive personalized suggestions based on your interests"
              testId="NotificationPermissionScreenRecommendationsBenefit"
            />
          </Column>
        </Column>

        <Column
          gap="sm"
          testId="NotificationPermissionScreenActionsView">
          <Button
            label="Enable Notifications"
            onPress={handleEnableNotifications}
            disabled={isPending}
            testId="NotificationPermissionScreenEnableButton"
          />
          <Button
            label="Not Now"
            variant="secondary"
            onPress={handleSkip}
            disabled={isPending}
            testId="NotificationPermissionScreenNotNowButton"
          />
          <Button
            label="Open Settings"
            variant="secondary"
            onPress={handleOpenSettings}
            disabled={isPending}
            testId="NotificationPermissionScreenOpenSettingsButton"
          />
        </Column>
      </Column>
    </Screen.Static>
  )
}

/**
 * NotificationBenefitProps
 * Props for the NotificationBenefit component
 */
type NotificationBenefitProps = {
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
  /**
   * Test ID for the benefit component
   */
  testId?: string
}

/**
 * NotificationBenefit
 * Displays a single notification benefit with icon and description.
 *
 * @param {NotificationBenefitProps} props - Component props
 * @returns {React.JSX.Element} Rendered benefit item
 */
const NotificationBenefit = ({
  icon,
  title,
  description,
  testId,
}: NotificationBenefitProps): React.JSX.Element => {
  return (
    <Column
      gap="xs"
      style={styles.benefitContainer}
      testId={`${testId}View`}>
      <Column
        gap="sm"
        style={styles.benefitRow}
        testId={`${testId}ContentView`}>
        <MaterialIcons
          name={icon}
          size={24}
          color={styles.benefitIcon.color}
        />
        <Column
          flex={1}
          gap="xs"
          testId={`${testId}TextContainerView`}>
          <Text.Label testId={`${testId}TitleText`}>{title}</Text.Label>
          <Text.Paragraph
            variant="small"
            color="secondary"
            testId={`${testId}DescriptionText`}>
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
