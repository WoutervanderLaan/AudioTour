import type React from 'react'

import {NotificationRouteName} from '@/modules/notifications/routes.types'
import {OnboardingBanner} from '@/modules/onboarding/components/OnboardingBanner'
import {OnboardingRouteName} from '@/modules/onboarding/routes.types'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {NavItem} from '@/shared/components/ui/navigation/NavItem/NavItem'
import {Screen} from '@/shared/components/ui/screen/Screen'
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
    <Screen.Scrollable testID="ProfileScreen">
      <OnboardingBanner testID="ProfileScreenOnboardingBanner" />

      <Column
        gap="xs"
        flex={1}
        padding="md"
        testID="ProfileScreenContentColumn">
        <NavItem
          label="Preferences"
          icon="tune"
          onPress={() => navigation.navigate(OnboardingRouteName.flow)}
          testID="ProfileScreenPreferencesNavItem"
        />
        <NavItem
          label="Push Notifications"
          icon="notifications"
          onPress={() => navigation.navigate(NotificationRouteName.settings)}
          testID="ProfileScreenPushNotificationsNavItem"
        />
      </Column>
    </Screen.Scrollable>
  )
}
