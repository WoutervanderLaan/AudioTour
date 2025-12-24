import type React from 'react'
import {useFormContext} from 'react-hook-form'

import {MAX_PHOTOS} from '../constants'
import type {PhotoSubmitForm} from '../schema'

import {
  ImageInputControlled,
  TextInputControlled,
} from '@/shared/components/ui/form'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * TourPhotoSubmitFormInputsProps
 * Props for the TourPhotoSubmitFormInputs component
 */
type TourPhotoSubmitFormInputsProps = {
  /**
   * Test ID for the component
   */
  testId?: string
}

/**
 * TourPhotoSubmitFormInputs
 * Renders form inputs for submitting museum object photos and metadata.
 * Provides image upload with multiple photo support (1-5 photos) and optional
 * metadata fields including title, artist, year, material, and description.
 *
 * Must be used within a FormProvider context with PhotoSubmitForm schema.
 *
 * @param props - Component props
 * @returns React element containing the complete photo submission form inputs
 */
export const TourPhotoSubmitFormInputs = ({
  testId = 'TourPhotoSubmitFormInputs',
}: TourPhotoSubmitFormInputsProps): React.JSX.Element => {
  const {control} = useFormContext<PhotoSubmitForm>()

  return (
    <Column
      gap="md"
      testId={`${testId}ContainerView`}>
      <ImageInputControlled
        control={control}
        name="photos"
        label="Photos"
        maxImages={MAX_PHOTOS}
        required={true}
        hint="Upload 1-5 photos of the museum object"
        testId={`${testId}PhotosImageInput`}
      />

      <Text.Title testId={`${testId}SectionTitleText`}>
        Object Details (Optional)
      </Text.Title>

      <TextInputControlled
        control={control}
        name="title"
        label="Title"
        placeholder="e.g., The Starry Night"
        testId={`${testId}TitleTextInput`}
      />

      <TextInputControlled
        control={control}
        name="artist"
        label="Artist"
        placeholder="e.g., Vincent van Gogh"
        testId={`${testId}ArtistTextInput`}
      />

      <Row
        gap="md"
        testId={`${testId}YearMaterialView`}>
        <Box
          flex={1}
          testId={`${testId}YearContainerView`}>
          <TextInputControlled
            control={control}
            name="year"
            label="Year"
            placeholder="e.g., 1889"
            keyboardType="numeric"
            testId={`${testId}YearTextInput`}
          />
        </Box>
        <Box
          flex={1}
          testId={`${testId}MaterialContainerView`}>
          <TextInputControlled
            control={control}
            name="material"
            label="Material"
            placeholder="e.g., Oil on canvas"
            testId={`${testId}MaterialTextInput`}
          />
        </Box>
      </Row>

      <TextInputControlled
        control={control}
        name="description"
        label="Description"
        placeholder="Add any additional notes..."
        multiline
        numberOfLines={4}
        testId={`${testId}DescriptionTextInput`}
      />
    </Column>
  )
}
