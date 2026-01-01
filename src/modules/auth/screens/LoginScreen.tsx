import type React from 'react'

import {LoginForm} from '../components/LoginForm'
import {AuthRouteName} from '../routes.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {LinkButton} from '@/shared/components/ui/pressable/LinkButton'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * LoginScreen
 * Authentication screen that allows users to sign in with email and password.
 * Includes a link to navigate to the registration screen for new users.
 *
 * @returns {React.JSX.Element} The login screen component
 */
export const LoginScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()

  return (
    <Screen.Static
      keyboardAvoiding
      testID="LoginScreen">
      <Column
        gap="md"
        center
        flex={1}
        padding="md"
        testID="LoginScreenContainer">
        <Text.Title testID="LoginScreenTitleText">Login</Text.Title>
        <Text.Paragraph testID="LoginScreenSubtitleText">
          Sign in to your account
        </Text.Paragraph>

        <LoginForm />

        <Row
          gap="xs"
          centerY
          testID="LoginScreenSignUpPromptRow">
          <Text.Paragraph
            variant="small"
            testID="LoginScreenSignUpPromptText">
            Don&apos;t have an account?
          </Text.Paragraph>
          <LinkButton
            label="Sign up"
            variant="small"
            onPress={() => navigate(AuthRouteName.register)}
            testID="LoginScreenSignUpLinkButton"
          />
        </Row>
      </Column>
    </Screen.Static>
  )
}
