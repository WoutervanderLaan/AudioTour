import type React from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../hooks/useAuth'
import {AuthRouteName} from '../routes.types'
import {type LoginForm, loginSchema} from '../schema'

import {logger} from '@/core/lib/logger/logger'
import {TextInputControlled} from '@/shared/components/ui/form'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable/Button'
import {LinkButton} from '@/shared/components/ui/pressable/LinkButton'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
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
  const {login, isLoggingIn, loginError} = useAuth()

  const {
    control,
    handleSubmit,
    formState: {isLoading},
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  /**
   * Handles the login form submission by authenticating the user with provided credentials.
   *
   * @param credentials - The login form data containing email and password
   */
  const handleLogin = async ({email, password}: LoginForm): Promise<void> => {
    try {
      await login({email, password})
    } catch (error) {
      logger.error('Login failed:', error)
    }
  }

  /**
   * Navigates to the registration screen when the sign up link is pressed.
   */
  const handleSignUpPress = (): void => {
    navigate(AuthRouteName.register)
  }

  return (
    <Screen.Static
      keyboardAvoiding
      testId="LoginScreen">
      <Column
        gap="md"
        center
        flex={1}
        padding="md"
        testId="LoginScreenContainerView">
        <Text.Title testId="LoginScreenTitleText">Login</Text.Title>
        <Text.Paragraph testId="LoginScreenSubtitleText">
          Sign in to your account
        </Text.Paragraph>

        <Column
          gap="lg"
          stretch
          testId="LoginScreenFormView">
          <TextInputControlled<LoginForm>
            placeholder="Email"
            name="email"
            control={control}
            autoCapitalize="none"
            keyboardType="email-address"
            testId="LoginScreenEmailTextInput"
          />

          <TextInputControlled<LoginForm>
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            testId="LoginScreenPasswordTextInput"
          />

          {!!loginError && (
            <Text.Paragraph
              variant="small"
              color="warning"
              testId="LoginScreenErrorText">
              {loginError.message || 'Something went wrong...'}
            </Text.Paragraph>
          )}

          <Button
            label={isLoggingIn ? 'Logging in...' : 'Login'}
            onPress={handleSubmit(handleLogin)}
            disabled={isLoggingIn || isLoading}
            testId="LoginScreenSubmitButton"
          />

          {!!(isLoggingIn || isLoading) && <ActivityIndicator />}
        </Column>

        <Row
          gap="xs"
          centerY
          testId="LoginScreenSignUpPromptView">
          <Text.Paragraph
            variant="small"
            testId="LoginScreenSignUpPromptText">
            Don&apos;t have an account?
          </Text.Paragraph>
          <LinkButton
            label="Sign up"
            variant="small"
            onPress={handleSignUpPress}
            testId="LoginScreenSignUpLinkButton"
          />
        </Row>
      </Column>
    </Screen.Static>
  )
}
