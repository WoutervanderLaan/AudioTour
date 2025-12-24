import type React from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../hooks/useAuth'
import {AuthRouteName} from '../routes.types'
import {type RegisterForm, registerSchema} from '../schema'

import {logger} from '@/core/lib/logger/logger'
import {TextInputControlled} from '@/shared/components/ui/form'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable/Button'
import {LinkButton} from '@/shared/components/ui/pressable/LinkButton'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography'
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
  const {register: registerUser, isRegistering, registerError} = useAuth()

  const {
    control,
    handleSubmit,
    formState: {isLoading},
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  /**
   * Handles the registration form submission by creating a new user account.
   *
   * @param data - The registration form data containing name, email, and password
   */
  const handleRegister = async (data: RegisterForm): Promise<void> => {
    try {
      await registerUser(data)
    } catch (error) {
      logger.error('Registration failed:', error)
    }
  }

  /**
   * Navigates to the login screen when the sign in link is pressed.
   */
  const handleSignInPress = (): void => {
    navigate(AuthRouteName.login)
  }

  return (
    <Screen.Static
      keyboardAvoiding
      testID="RegisterScreen">
      <Column
        gap="md"
        center
        flex={1}
        padding="md"
        testID="RegisterScreenContainerColumn">
        <Text.Title testID="RegisterScreenTitleText">Register</Text.Title>
        <Text.Paragraph testID="RegisterScreenSubtitleText">
          Create your account
        </Text.Paragraph>

        <Column
          stretch
          gap="lg"
          testID="RegisterScreenFormColumn">
          <TextInputControlled<RegisterForm>
            placeholder="Name"
            name="name"
            control={control}
            autoCapitalize="words"
            testID="RegisterScreenNameTextInput"
          />

          <TextInputControlled<RegisterForm>
            placeholder="Email"
            name="email"
            control={control}
            autoCapitalize="none"
            keyboardType="email-address"
            testID="RegisterScreenEmailTextInput"
          />

          <TextInputControlled<RegisterForm>
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            testID="RegisterScreenPasswordTextInput"
          />

          {!!registerError && (
            <Text.Paragraph
              variant="small"
              color="warning"
              testID="RegisterScreenErrorText">
              {registerError.message || 'Something went wrong...'}
            </Text.Paragraph>
          )}

          <Button
            label={isRegistering ? 'Creating account...' : 'Register'}
            onPress={handleSubmit(handleRegister)}
            disabled={isRegistering || isLoading}
            testID="RegisterScreenSubmitButton"
          />

          {!!(isRegistering || isLoading) && <ActivityIndicator />}
        </Column>

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
            onPress={handleSignInPress}
            testID="RegisterScreenSignInLinkButton"
          />
        </Row>
      </Column>
    </Screen.Static>
  )
}
