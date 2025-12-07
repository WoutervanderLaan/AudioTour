import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator, Image} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import {useShallow} from 'zustand/react/shallow'

import {OldRouteName} from '../routes'

import {apiClient} from '@/core/api/client'
import {ProcessArtworkResponse} from '@/core/api/schema'
import {logger} from '@/core/lib/logger'
import {AuthRouteName} from '@/modules/auth/routes'
import {ModuleSlug} from '@/modules/slugs'
import {
  CheckboxControlled,
  SwitchControlled,
  TextInputControlled,
} from '@/shared/components/ui/form'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Label} from '@/shared/components/ui/typography'
import {ObjectForm, objectSchema} from '@/shared/schema'
import {useTourStore} from '@/store/slices/tourStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Capture screen component.
 *
 * Allows users to capture or select photos of museum objects and upload them
 * for AI-powered object recognition. The screen includes a demo form for
 * testing various form controls.
 *
 * @returns The Capture screen component
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
  })

  /**
   * onSubmit
   * Handles form submission for the demo object form.
   *
   * @param data - Form data from the object form
   * @returns void
   */
  const onSubmit = (data: ObjectForm): void => {
    logger.debug('Form submitted:', data)
  }

  /**
   * pickImage
   * Opens the image picker to allow the user to select a photo from their library.
   *
   * @returns Promise that resolves when image selection is complete
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

      const response = await apiClient.post<ProcessArtworkResponse>(
        '/process-artwork',
        form,
      )

      return response.data
    },
    onError: err => {
      logger.error('Error uploading photo: ', err)
      setLocalError('Error uploading photo')
    },
  })

  /**
   * upload
   * Uploads the selected photo to the API for object recognition and navigates to the detail screen.
   *
   * @returns Promise that resolves when upload and navigation are complete
   */
  const upload = async (): Promise<void> => {
    if (!imageUri) return
    setLocalError(undefined)

    const {object_id: objectId, recognition_confidence: recognitionConfidence} =
      await uploadPhoto.mutateAsync({uri: imageUri})

    setLastPhotoData(imageUri, objectId, recognitionConfidence)

    if (objectId) {
      navigate.navigate(OldRouteName.objectDetail, {objectId: objectId})
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

        <Column gap="lg">
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
          <Button
            label="setting"
            onPress={() =>
              navigate.navigate(ModuleSlug.auth, {screen: AuthRouteName.login})
            }
          />
          {/* <TextInputControlled
            control={control}
            name="year"
            keyboardType="numeric"
            label="Year"
            placeholder="Enter year"
          /> */}

          <Button
            onPress={handleSubmit(onSubmit)}
            label="Submit"
          />
        </Column>
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
