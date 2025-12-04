import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator, Image, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import {useShallow} from 'zustand/react/shallow'

import {
  CheckboxControlled,
  SwitchControlled,
  TextInputControlled,
} from '@/shared/components/ui/form'
import {Box} from '@/shared/components/ui/layout/Box'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Label} from '@/shared/components/ui/typography'
import {apiClient} from '@/core/api/client'
import {ObjectForm, objectSchema} from '@/shared/schema'
import {useTourStore} from '@/store/slices/tourStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Capture
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Capture = (): React.JSX.Element => {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)
  const [localError, setLocalError] = useState<string | undefined>(undefined)

  const navigate = useNavigation()

  const sessionId = useUserSessionStore(s => s.sessionId)

  const {setLastPhotoData} = useTourStore(
    useShallow(state => ({
      setLastPhotoData: state.setLastPhotoData,
    })),
  )

  const {control, handleSubmit} = useForm<ObjectForm>({
    resolver: zodResolver(objectSchema),
    defaultValues: {
      name: '',
      artist: '',
      year: undefined,
      description: '',
      category: undefined,
      notifications: false,
      acceptTerms: false,
    },
  })

  /**
   * onSubmit
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const onSubmit = (data: ObjectForm): void => {
    console.log('Form submitted:', data)
  }

  /**
   * pickImage
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const pickImage = async (): Promise<void> => {
    setLocalError(undefined)

    // const permission = await ImagePicker.requestCameraPermissionsAsync();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permission.status !== 'granted') {
      setLocalError('Camera permission is required')
      return
    }

    // const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    const res = await ImagePicker.launchImageLibraryAsync({quality: 0.7})

    if (!res.canceled && res.assets?.[0]?.uri) {
      setImageUri(res.assets[0].uri)
    }
  }

  const uploadPhoto = useMutation({
    mutationFn: async (params: {uri: string}) => {
      const form = new FormData()
      const photo = await fetch(params.uri)
      const photoBlob = await photo.blob()

      form.append('photos', photoBlob, 'photo.jpg')

      const response = await apiClient.post<{
        object_id: string
        recognition_confidence: number
      }>('/process-artwork', form)

      return response.data
    },
    onError: err => {
      console.error('Error uploading photo: ', err)
      setLocalError('Error uploading photo')
    },
  })

  /**
   * upload
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const upload = async (): Promise<void> => {
    if (!imageUri) return
    setLocalError(undefined)

    const {object_id: objectId, recognition_confidence: recognitionConfidence} =
      await uploadPhoto.mutateAsync({uri: imageUri})

    setLastPhotoData(imageUri, objectId, recognitionConfidence)

    if (objectId) {
      navigate.navigate('ObjectDetail', {id: objectId})
    }
  }

  return (
    <Screen.Scrollable keyboardAvoiding>
      <Box
        flex={1}
        paddingH="md"
        paddingV="lg"
        center>
        <Label>{sessionId}</Label>

        <Button
          onPress={pickImage}
          label="Take Photo"
        />
        {!!imageUri && (
          <Image
            source={{uri: imageUri}}
            style={styles.preview}
          />
        )}

        <Button
          onPress={upload}
          disabled={!imageUri || uploadPhoto.isPending}
          label="Upload & Identify"
        />

        {!!uploadPhoto.isPending && <ActivityIndicator />}
        {!!localError && <Label>{localError}</Label>}

        <View style={{width: '100%'}}>
          <SwitchControlled
            control={control}
            name="notifications"
            label="Enable notifications"
            hint="Receive updates about your account"
            required={true}
          />
          <CheckboxControlled
            control={control}
            name="acceptTerms"
            label="I accept the terms and conditions"
            required={true}
            hint="Read the full terms here"
          />
          <TextInputControlled
            control={control}
            multiline
            numberOfLines={4}
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          <TextInputControlled
            control={control}
            name="year"
            keyboardType="numeric"
            label="Year"
            placeholder="Enter year"
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            label="Submit"
          />
        </View>
      </Box>
    </Screen.Scrollable>
  )
}

const styles = StyleSheet.create(() => ({
  preview: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
}))
