import type React from 'react'
import {useMemo} from 'react'
import {useUnistyles} from 'react-native-unistyles'

import {AuthRouteName} from '@/modules/auth/routes.types'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import {ProfileRouteName} from '@/modules/profile/routes.types'
import {IconButton} from '@/shared/components/ui/pressable/IconButton/IconButton'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * ProfileHeaderButton
 * Header button component that navigates to the profile or login screen.
 * If the user is authenticated, navigates to the Profile screen.
 * If the user is not authenticated, navigates to the Login screen.
 *
 * @returns {React.JSX.Element} The profile header button component
 */
export const ProfileHeaderButton = (): React.JSX.Element => {
  const {theme} = useUnistyles()
  const {navigate} = useNavigation()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  /**
   * Handles the profile button press by navigating to the appropriate screen.
   */
  const handlePress = (): void => {
    if (isAuthenticated) {
      navigate(ProfileRouteName.profile)
    } else {
      navigate(AuthRouteName.login)
    }
  }

  const color = useMemo(
    () =>
      isAuthenticated ? theme.color.text.confirm : theme.color.text.default,
    [isAuthenticated, theme],
  )

  return (
    <IconButton
      testID="ProfileHeaderIconButton"
      name="person"
      size="md"
      onPress={handlePress}
      accessibilityLabel="Profile"
      color={color}
      accessibilityHint={
        isAuthenticated ? 'Opens your profile' : 'Opens the login screen'
      }
    />
  )
}
