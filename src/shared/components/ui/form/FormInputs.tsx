import type React from 'react'
import type {ComponentProps} from 'react'
import {Control, Controller, FieldValues, Path} from 'react-hook-form'
import {Switch, TextInput, View} from 'react-native'

import {Label} from '@/shared/components/ui/typography'

/**
 * RHFTextInput
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const RHFTextInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  ...props
}: {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
} & ComponentProps<typeof TextInput>): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={{marginBottom: 12}}>
          <Label>{label}</Label>
          <TextInput
            style={{borderWidth: 1, padding: 8}}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as any}
            {...props}
          />
          {!!error && <Label style={{color: 'red'}}>{error.message}</Label>}
        </View>
      )}
    />
  )
}

/**
 * RHFTextArea
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const RHFTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
}): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={{marginBottom: 12}}>
          <Label>{label}</Label>
          <TextInput
            style={{borderWidth: 1, padding: 8, height: 100}}
            placeholder={placeholder}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as any}
          />
          {!!error && <Label style={{color: 'red'}}>{error.message}</Label>}
        </View>
      )}
    />
  )
}

/**
 * RHFCheckbox
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const RHFCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>
  name: Path<T>
  label: string
}): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Switch
            value={value as any}
            onValueChange={onChange}
          />
          <Label style={{marginLeft: 8}}>{label}</Label>
          {!!error && <Label style={{color: 'red'}}>{error.message}</Label>}
        </View>
      )}
    />
  )
}
