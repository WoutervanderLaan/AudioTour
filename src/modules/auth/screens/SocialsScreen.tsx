import type React from 'react'

import {AuthRouteName} from '../routes.types'

import {OldModalName, OldRouteName} from '@/modules/old/routes.types'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {useBanner} from '@/shared/hooks/useBanner'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * @deprecated
 * SocialsScreen - A tab screen for social features with navigation test buttons.
 * Demonstrates navigation to stack screens, modals, and other tabs.
 *
 * @returns The Socials tab screen component
 */
export const SocialsScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()
  const {showBanner, hideBanner} = useBanner()

  return (
    <Screen.Static>
      <Column gap="md">
        <Button
          label="Not Found"
          onPress={() => navigate(OldRouteName.notFound)}
        />

        <Button
          label="Settings"
          onPress={() => navigate(OldModalName.settings)}
        />

        <Button
          label="Login"
          onPress={() => navigate(AuthRouteName.login)}
        />
        <Button
          label="Register"
          onPress={() => navigate(AuthRouteName.register)}
        />
        <Button
          label="Banner Test"
          onPress={() =>
            showBanner({
              title: 'Test Banner',
              message: 'This is a test banner message',
              ctaLabel: 'OK',
              onCtaPress: hideBanner,
              variant: 'info',
              testID: 'test-banner',
            })
          }
        />
      </Column>
    </Screen.Static>
  )
}
