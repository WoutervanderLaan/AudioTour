import React, {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {ActivityIndicator} from 'react-native'

import {zodResolver} from '@hookform/resolvers/zod'
import type {RouteProp} from '@react-navigation/native'

import {TourPhotoSubmitFormInputs} from '../components/TourPhotoSubmitFormInputs'
import {usePhotoSubmit} from '../hooks/usePhotoSubmit'
import type {TourModalName, TourModalParams} from '../routes.types'
import {type PhotoSubmitForm, photoSubmitSchema} from '../schema'

import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'

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
    defaultValues: {
      photos: initialPhotos,
    },
  })

  const {handleSubmit} = form

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
    <FormProvider {...form}>
      <Screen.Scrollable
        keyboardAvoiding
        testId="TourPhotoSubmitScreen">
        <Box
          paddingH="md"
          paddingBottom="xl"
          testId="TourPhotoSubmitScreenContainerView">
          <Column
            gap="lg"
            testId="TourPhotoSubmitScreenContentView">
            <TourPhotoSubmitFormInputs testId="TourPhotoSubmitScreenFormInputs" />

            {!!submitError && (
              <Text.Paragraph testId="TourPhotoSubmitScreenErrorText">
                {submitError}
              </Text.Paragraph>
            )}

            <Column
              gap="sm"
              testId="TourPhotoSubmitScreenActionsView">
              <Button
                label={isLoading ? 'Submitting...' : 'Submit'}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                testId="TourPhotoSubmitScreenSubmitButton"
              />
              {!!isLoading && (
                <Row
                  gap="sm"
                  center
                  testId="TourPhotoSubmitScreenLoadingView">
                  <ActivityIndicator size="small" />
                  <Text.Label testId="TourPhotoSubmitScreenLoadingText">
                    Processing photos...
                  </Text.Label>
                </Row>
              )}
              <Button
                label="Cancel"
                onPress={goBack}
                variant="secondary"
                disabled={isLoading}
                testId="TourPhotoSubmitScreenCancelButton"
              />
            </Column>
          </Column>
        </Box>
      </Screen.Scrollable>
    </FormProvider>
  )
}
