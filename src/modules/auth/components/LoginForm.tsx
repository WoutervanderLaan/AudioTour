import type React from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../hooks/useAuth'
import {type LoginForm as LoginFormType, loginSchema} from '../schema'

import {logger} from '@/core/lib/logger/logger'
import {TextInputControlled} from '@/shared/components/ui/form/TextInputControlled'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * LoginForm
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const LoginForm = (): React.JSX.Element => {
  const {login, isLoggingIn, loginError} = useAuth()

  const {
    control,
    handleSubmit,
    formState: {isLoading},
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  })

  /**
   * Handles the login form submission by authenticating the user with provided credentials.
   *
   * @param credentials - The login form data containing email and password
   */
  const handleLogin = async ({
    email,
    password,
  }: LoginFormType): Promise<void> => {
    try {
      await login({email, password})
    } catch (error) {
      logger.error('Login failed:', error)
    }
  }

  return (
    <Column
      gap="lg"
      stretch
      testID="LoginScreenFormColumn">
      <TextInputControlled<LoginFormType>
        placeholder="Email"
        name="email"
        control={control}
        autoCapitalize="none"
        keyboardType="email-address"
        testID="LoginScreenEmailTextInput"
      />

      <TextInputControlled<LoginFormType>
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        testID="LoginScreenPasswordTextInput"
      />

      {!!loginError && (
        <Text.Paragraph
          variant="small"
          color="warning"
          testID="LoginScreenErrorText">
          {loginError.message || 'Something went wrong...'}
        </Text.Paragraph>
      )}

      <Button
        label={isLoggingIn ? 'Logging in...' : 'Login'}
        onPress={handleSubmit(handleLogin)}
        disabled={isLoggingIn || isLoading}
        testID="LoginScreenSubmitButton"
      />

      {!!(isLoggingIn || isLoading) && <ActivityIndicator />}
    </Column>
  )
}
