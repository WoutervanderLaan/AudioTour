import type React from 'react'
import {useCallback} from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native'

import {OnboardingRouteName} from '@/modules/onboarding/routes.types'
import {OnboardingBanner} from '@/shared/components/features'
import {Column} from '@/shared/components/ui/layout/Column'
import {NavItem} from '@/shared/components/ui/navigation'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * ProfileScreen
 * Displays the user profile information and settings.
 * Includes navigation to onboarding flow and shows completion banner if needed.
 *
 * @returns {React.JSX.Element} The profile screen component
 */
export const ProfileScreen = (): React.JSX.Element => {
  const navigation = useNavigation()

  /**
   * handleOnboardingPress
   * Navigates to the onboarding flow
   */
  const handleOnboardingPress = useCallback((): void => {
    navigation.navigate(OnboardingRouteName.flow)
  }, [navigation])

  return (
    <Screen.Static>
      <OnboardingBanner />
      <Column
        gap="md"
        flex={1}
        padding="md">
        <Text.Title>Profile</Text.Title>

        <Column gap="xs">
          <Text.Label>Settings</Text.Label>
          <NavItem
            label="Preferences"
            icon="tune"
            rightContent={
              <MaterialIcons
                name="chevron-right"
                size={24}
              />
            }
            onPress={handleOnboardingPress}
          />
        </Column>
      </Column>
    </Screen.Static>
  )
}
