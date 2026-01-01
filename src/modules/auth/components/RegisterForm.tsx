import type React from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../hooks/useAuth'
import {type RegisterForm as RegisterFormType, registerSchema} from '../schema'

import {logger} from '@/core/lib/logger/logger'
import {TextInputControlled} from '@/shared/components/ui/form/TextInputControlled'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Button} from '@/shared/components/ui/pressable/Button/Button'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * RegisterForm
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const RegisterForm = (): React.JSX.Element => {
  const {register: registerUser, isRegistering, registerError} = useAuth()

  const {
    control,
    handleSubmit,
    formState: {isLoading},
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  })

  /**
   * Handles the registration form submission by creating a new user account.
   *
   * @param data - The registration form data containing name, email, and password
   */
  const handleRegister = async (data: RegisterFormType): Promise<void> => {
    try {
      await registerUser(data)
    } catch (error) {
      logger.error('Registration failed:', error)
    }
  }

  return (
    <Column
      stretch
      gap="lg"
      testID="RegisterScreenFormColumn">
      <TextInputControlled<RegisterFormType>
        placeholder="Name"
        name="name"
        control={control}
        autoCapitalize="words"
        testID="RegisterScreenNameTextInput"
      />

      <TextInputControlled<RegisterFormType>
        placeholder="Email"
        name="email"
        control={control}
        autoCapitalize="none"
        keyboardType="email-address"
        testID="RegisterScreenEmailTextInput"
      />

      <TextInputControlled<RegisterFormType>
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
  )
}
