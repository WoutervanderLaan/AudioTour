import React from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../hooks/useAuth'
import {type LoginForm, loginSchema} from '../schema'

import {logger} from '@/core/lib/logger'
import {TextInputControlled} from '@/shared/components/ui/form'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * LoginScreen
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const LoginScreen: React.FC = () => {
  const {login, isLoggingIn, loginError} = useAuth()

  const {
    control,
    handleSubmit,
    formState: {isLoading},
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })
  /**
   * handleLogin
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const handleLogin = async ({email, password}: LoginForm): Promise<void> => {
    try {
      await login({email, password})
    } catch (error) {
      logger.error('Login failed:', error)
    }
  }

  return (
    <Screen.Static keyboardAvoiding>
      <Column
        gap="md"
        center
        flex={1}
        padding="md">
        <Text.Title>Login</Text.Title>

        <Column
          gap="lg"
          style={{alignSelf: 'stretch'}}>
          <TextInputControlled<LoginForm>
            placeholder="Email"
            name="email"
            control={control}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInputControlled<LoginForm>
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
          />

          {!!loginError && (
            <Text.Paragraph
              variant="small"
              color="warning">
              {loginError.message || 'Login failed'}
            </Text.Paragraph>
          )}

          <Button
            label={isLoggingIn ? 'Logging in...' : 'Login'}
            onPress={handleSubmit(handleLogin)}
            disabled={isLoggingIn || isLoading}
          />

          {!!(isLoggingIn || isLoading) && <ActivityIndicator />}
        </Column>
      </Column>
    </Screen.Static>
  )
}
