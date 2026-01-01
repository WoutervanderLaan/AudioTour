import type React from 'react'

import {RegisterForm} from '../components/RegisterForm'
import {AuthRouteName} from '../routes.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {LinkButton} from '@/shared/components/ui/pressable/LinkButton'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * RegisterScreen
 * User registration screen that allows new users to create an account.
 * Includes a link to navigate to the login screen for existing users.
 *
 * @returns {React.JSX.Element} The registration screen component
 */
export const RegisterScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()

  return (
    <Screen.Static
      keyboardAvoiding
      testID="RegisterScreen">
      <Column
        gap="md"
        center
        flex={1}
        padding="md"
        testID="RegisterScreenContainer">
        <Text.Title testID="RegisterScreenTitleText">Register</Text.Title>
        <Text.Paragraph testID="RegisterScreenSubtitleText">
          Create your account
        </Text.Paragraph>

        <RegisterForm />

        <Row
          gap="xs"
          centerY
          testID="RegisterScreenSignInPromptRow">
          <Text.Paragraph
            variant="small"
            testID="RegisterScreenSignInPromptText">
            Already have an account?
          </Text.Paragraph>
          <LinkButton
            label="Sign in"
            variant="small"
            onPress={() => navigate(AuthRouteName.login)}
            testID="RegisterScreenSignInLinkButton"
          />
        </Row>
      </Column>
    </Screen.Static>
  )
}
