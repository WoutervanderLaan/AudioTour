import type React from 'react'

import {NotificationRouteName} from '@/modules/notifications/routes.types'
import {OnboardingBanner} from '@/modules/onboarding/components/OnboardingBanner'
import {OnboardingRouteName} from '@/modules/onboarding/routes.types'
import {Column} from '@/shared/components/ui/layout/Column'
import {NavItem} from '@/shared/components/ui/navigation'
import {Screen} from '@/shared/components/ui/screen'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * ProfileScreen
 * Displays the user profile information and settings.
 * Includes navigation to onboarding flow and shows completion banner if needed.
 *
 * @returns {React.JSX.Element} The profile screen component
 */
export const ProfileScreen = (): React.JSX.Element => {
  const navigation = useNavigation()

  return (
    <Screen.Scrollable testId="ProfileScreen">
      <OnboardingBanner testId="ProfileScreenOnboardingBanner" />

      <Column
        gap="xs"
        flex={1}
        padding="md"
        testId="ProfileScreenContentView">
        <NavItem
          label="Preferences"
          icon="tune"
          onPress={() => navigation.navigate(OnboardingRouteName.flow)}
          testId="ProfileScreenPreferencesNavItem"
        />
        <NavItem
          label="Push Notifications"
          icon="notifications"
          onPress={() => navigation.navigate(NotificationRouteName.settings)}
          testId="ProfileScreenPushNotificationsNavItem"
        />
      </Column>
    </Screen.Scrollable>
  )
}
