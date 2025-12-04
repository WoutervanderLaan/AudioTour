import type React from 'react'
import type {ComponentProps} from 'react'
import {Control, Controller, FieldValues, Path} from 'react-hook-form'
import {Switch as RNSwitch, TextInput, View} from 'react-native'

import {Checkbox} from '@/shared/components/ui/form/Checkbox'
import {Switch} from '@/shared/components/ui/form/Switch'
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
 * React Hook Form wrapper for Checkbox component with validation support
 *
 * @param {object} options - Component options
 * @param {Control<T>} options.control - React Hook Form control
 * @param {Path<T>} options.name - Field name in form
 * @param {string} options.label - Checkbox label
 * @param {string} [options.hint] - Helper text
 * @param {boolean} [options.required] - Whether field is required
 * @param {boolean} [options.disabled] - Whether checkbox is disabled
 * @returns {React.JSX.Element} Rendered form checkbox
 */
export const RHFCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  hint?: string
  required?: boolean
  disabled?: boolean
}): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Checkbox
          label={label}
          checked={value as boolean}
          onChange={onChange}
          error={error?.message}
          hint={hint}
          required={required}
          disabled={disabled}
        />
      )}
    />
  )
}

/**
 * RHFSwitch
 * React Hook Form wrapper for Switch component with validation support
 *
 * @param {object} options - Component options
 * @param {Control<T>} options.control - React Hook Form control
 * @param {Path<T>} options.name - Field name in form
 * @param {string} options.label - Switch label
 * @param {string} [options.hint] - Helper text
 * @param {boolean} [options.required] - Whether field is required
 * @param {boolean} [options.disabled] - Whether switch is disabled
 * @returns {React.JSX.Element} Rendered form switch
 */
export const RHFSwitch = <T extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  disabled,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  hint?: string
  required?: boolean
  disabled?: boolean
}): React.JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Switch
          label={label}
          value={value as boolean}
          onChange={onChange}
          error={error?.message}
          hint={hint}
          required={required}
          disabled={disabled}
        />
      )}
    />
  )
}
