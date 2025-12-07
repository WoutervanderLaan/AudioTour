import type React from 'react'

import {useNavigation} from '@react-navigation/native'

import {AuthRouteName} from '../routes.types'

import {
  OldModalName,
  OldRouteName,
  OldTabName,
} from '@/modules/old/routes.types'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'

/**
 * SocialsScreen - A tab screen for social features with navigation test buttons.
 * Demonstrates navigation to stack screens, modals, and other tabs.
 *
 * @returns The Socials tab screen component
 */
export const SocialsScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()
  return (
    <Screen.Static>
      <Column gap="md">
        <Button
          label="Not Found"
          onPress={() => navigate(OldRouteName.notFound)}
        />
        <Button
          label="Narrative"
          onPress={() => navigate(OldRouteName.narrative)}
        />
        <Button
          label="ObjectDetail"
          onPress={() =>
            navigate(OldRouteName.objectDetail, {objectId: '1234'})
          }
        />

        <Button
          label="Settings"
          onPress={() => navigate(OldModalName.settings)}
        />
        <Button
          label="Capture Tab"
          onPress={() => navigate(OldTabName.capture)}
        />
        <Button
          label="Login"
          onPress={() => navigate(AuthRouteName.login)}
        />
        <Button
          label="Register"
          onPress={() => navigate(AuthRouteName.register)}
        />
      </Column>
    </Screen.Static>
  )
}
