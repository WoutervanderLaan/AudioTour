import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Text} from '@react-navigation/elements'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {ActivityIndicator, Image, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'
import {useShallow} from 'zustand/react/shallow'

import {ObjectForm, objectSchema} from '@/features/capture/schemas/schema'
import {RHFTextArea, RHFTextInput} from '@/shared/components/ui/form/FormInputs'
import {useApi} from '@/shared/lib/api/useApi'
import {useTourStore} from '@/store/slices/tourStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

/**
 * Capture
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function Capture(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | undefined>(undefined)
  const [localError, setLocalError] = useState<string | undefined>(undefined)

  const navigate = useNavigation()
  const api = useApi()

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
    mutationFn: (params: {uri: string}) => api.uploadPhoto({uri: params.uri}),
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
      navigate.navigate('ObjectDetail', {objectId})
    }
  }

  return (
    <View style={styles.container}>
      <Text>{sessionId}</Text>

      <Button onPress={pickImage}>Take Photo</Button>
      {!!imageUri && (
        <Image
          source={{uri: imageUri}}
          style={styles.preview}
        />
      )}

      <Button
        onPress={upload}
        disabled={!imageUri || uploadPhoto.isPending}
        style={{opacity: !imageUri || uploadPhoto.isPending ? 0.5 : 1}}>
        Upload & Identify
      </Button>

      {!!uploadPhoto.isPending && <ActivityIndicator />}
      {!!localError && <Text>{localError}</Text>}

      <View style={{width: '100%'}}>
        <RHFTextInput
          control={control}
          name="name"
          label="Name"
          placeholder="Enter name of the object"
        />
        <RHFTextInput
          control={control}
          name="artist"
          label="Artist"
          placeholder="Enter artist name"
        />
        <RHFTextArea
          control={control}
          name="description"
          label="Description"
          placeholder="Enter description"
        />
        <RHFTextInput
          control={control}
          name="year"
          keyboardType="numeric"
          label="Year"
          placeholder="Enter year"
        />

        {/* <RHFSelect
        control={control}
        name="category"
        label="Category"
        options={[
          { value: "painting", label: "Painting" },
          { value: "sculpture", label: "Sculpture" },
          { value: "photography", label: "Photography" },
        ]}
      /> */}
        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 16,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
}))
