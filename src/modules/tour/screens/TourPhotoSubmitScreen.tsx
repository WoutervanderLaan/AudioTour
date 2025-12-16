import React, {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {ActivityIndicator, Alert} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'
import type {RouteProp} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import {AddPhoto} from '../components/AddPhoto'
import {TourPhotoSubmitFormInputs} from '../components/TourPhotoSubmitFormInputs'
import {usePhotoSubmit} from '../hooks/usePhotoSubmit'
import type {TourModalName, TourModalParams} from '../routes.types'
import {type PhotoSubmitForm, photoSubmitSchema} from '../schema'

import {logger} from '@/core/lib/logger'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Thumbnail} from '@/shared/components/ui/thumbnail/Thumbnail'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'

const MAX_PHOTOS = 5

/**
 * TourPhotoSubmitScreenProps
 * Props for the TourPhotoSubmitScreen
 */
type TourPhotoSubmitScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourModalParams, TourModalName.photoSubmit>
}

/**
 * TourPhotoSubmitScreen
 * Modal screen for submitting captured photos with optional metadata.
 * Supports multiple photos (up to MAX_PHOTOS) with add/delete functionality.
 *
 * @param props - Component props
 * @returns Tour photo submit screen component
 */
export const TourPhotoSubmitScreen = ({
  route,
}: TourPhotoSubmitScreenProps): React.JSX.Element => {
  const {goBack} = useNavigation()
  const {photos: initialPhotos = []} = route.params

  const [submitError, setSubmitError] = useState<string | undefined>(undefined)
  const {submit, isLoading} = usePhotoSubmit()

  const form = useForm<PhotoSubmitForm>({
    resolver: zodResolver(photoSubmitSchema),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = form

  const photos = watch('photos', initialPhotos)

  /**
   * handleAddPhoto
   * Opens camera/picker to add another photo
   *
   * @returns Promise that resolves when photo is added
   */
  const handleAddPhoto = async (): Promise<void> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        //TODO: for sim only
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (!result.canceled && result.assets?.[0]?.uri) {
        setValue('photos', [...photos, result.assets[0].uri])
      }
    } catch (err) {
      Alert.alert('Something went wrong', JSON.stringify(err))

      logger.error('[TourPhotoSubmit] Error adding photo:', err)
    }
  }

  /**
   * handleDeletePhoto
   * Removes a photo from the list
   *
   * @param index - Index of photo to remove
   * @returns void
   */
  const handleDeletePhoto = (index: number): void => {
    setValue(
      'photos',
      photos.filter((_, i) => i !== index),
    )
  }

  /**
   * onSubmit
   * Handles form submission with photos and metadata.
   * Creates feed item, uploads photos, generates narrative and audio.
   *
   * @param data - Form data with metadata fields
   * @returns Promise that resolves when submission is complete
   */
  const onSubmit = async ({
    photos,
    ...metadata
  }: PhotoSubmitForm): Promise<void> => {
    setSubmitError(undefined)

    const [_res, error] = await submit(photos, metadata)

    if (error) {
      setSubmitError(error.error)
      return
    }

    goBack()
  }

  return (
    <Screen.Scrollable keyboardAvoiding>
      <Box
        paddingH="md"
        paddingBottom="xl">
        <Column gap="lg">
          <Text.Label>
            {/*
            - TODO: Add image form component 
            - TODO: Move all image related code to own component
            */}
            {photos.length} / {MAX_PHOTOS} photos
          </Text.Label>

          <Row
            gap="sm"
            justifyContent="space-evenly"
            wrap="wrap">
            {photos.map((photo, index) => (
              <Thumbnail
                key={`photo-${index + 1}`}
                source={{uri: photo}}
                deletable
                size="md"
                resizeMode="cover"
                onDelete={() => handleDeletePhoto(index)}
              />
            ))}

            {photos.length < MAX_PHOTOS && (
              <AddPhoto onPress={handleAddPhoto} />
            )}
          </Row>
          {!!errors.photos && (
            <Text.Label color="warning">{errors.photos?.message}</Text.Label>
          )}

          <FormProvider {...form}>
            <TourPhotoSubmitFormInputs />
          </FormProvider>

          {!!submitError && <Text.Paragraph>{submitError}</Text.Paragraph>}

          <Column gap="sm">
            <Button
              label={isLoading ? 'Submitting...' : 'Submit'}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
            {!!isLoading && (
              <Row
                gap="sm"
                center>
                <ActivityIndicator size="small" />
                <Text.Label>Processing photos...</Text.Label>
              </Row>
            )}
            <Button
              label="Cancel"
              onPress={goBack}
              variant="secondary"
              disabled={isLoading}
            />
          </Column>
        </Column>
      </Box>
    </Screen.Scrollable>
  )
}
