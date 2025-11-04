import type {ComponentProps} from 'react'
import {Control, Controller, FieldValues, Path} from 'react-hook-form'
import {Switch, Text, TextInput, View} from 'react-native'

/**
 * function RHFTextInput
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export /**
 * Function or component RHFTextInput
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
function RHFTextInput<T extends FieldValues>({
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
} & ComponentProps<typeof TextInput>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={{marginBottom: 12}}>
          <Text>{label}</Text>
          <TextInput
            style={{borderWidth: 1, padding: 8}}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as any}
            {...props}
          />
          {!!error && <Text style={{color: 'red'}}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

/**
 * function RHFTextArea
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export /**
 * Function or component RHFTextArea
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
function RHFTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={{marginBottom: 12}}>
          <Text>{label}</Text>
          <TextInput
            style={{borderWidth: 1, padding: 8, height: 100}}
            placeholder={placeholder}
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as any}
          />
          {!!error && <Text style={{color: 'red'}}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

/**
 * function RHFCheckbox
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export /**
 * Function or component RHFCheckbox
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
function RHFCheckbox<T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>
  name: Path<T>
  label: string
}) {
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
          <Text style={{marginLeft: 8}}>{label}</Text>
          {!!error && <Text style={{color: 'red'}}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

// // ✅ Select (using Picker in React Native)
// export function RHFSelect<T extends FieldValues>({
//   control,
//   name,
//   label,
//   options,
// }: {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   options: { value: string; label: string }[];
// }) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <View style={{ marginBottom: 12 }}>
//           <Text>{label}</Text>
//           <Picker selectedValue={value as any} onValueChange={onChange}>
//             <Picker.Item label="Select..." value="" />
//             {options.map(opt => (
//               <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
//             ))}
//           </Picker>
//           {error && <Text style={{ color: "red" }}>{error.message}</Text>}
//         </View>
//       )}
//     />
//   );
// }
