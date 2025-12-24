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
import type {TestProps} from '@/shared/types/TestProps'

/**
 * TourPhotoSubmitFormInputsProps
 * Props for the TourPhotoSubmitFormInputs component
 */
type TourPhotoSubmitFormInputsProps = TestProps<'TourPhotoSubmitFormInputs'>

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
  testID,
}: TourPhotoSubmitFormInputsProps): React.JSX.Element => {
  const {control} = useFormContext<PhotoSubmitForm>()

  return (
    <Column
      gap="md"
      testID={`${testID}ContainerColumn`}>
      <ImageInputControlled
        control={control}
        name="photos"
        label="Photos"
        maxImages={MAX_PHOTOS}
        required={true}
        hint="Upload 1-5 photos of the museum object"
        testID={`${testID}PhotosImageInput`}
      />

      <Text.Title testID={`${testID}SectionTitleText`}>
        Object Details (Optional)
      </Text.Title>

      <TextInputControlled
        control={control}
        name="title"
        label="Title"
        placeholder="e.g., The Starry Night"
        testID={`${testID}TitleTextInput`}
      />

      <TextInputControlled
        control={control}
        name="artist"
        label="Artist"
        placeholder="e.g., Vincent van Gogh"
        testID={`${testID}ArtistTextInput`}
      />

      <Row
        gap="md"
        testID={`${testID}YearMaterialRow`}>
        <Box
          flex={1}
          testID={`${testID}YearContainerBox`}>
          <TextInputControlled
            control={control}
            name="year"
            label="Year"
            placeholder="e.g., 1889"
            keyboardType="numeric"
            testID={`${testID}YearTextInput`}
          />
        </Box>
        <Box
          flex={1}
          testID={`${testID}MaterialContainerBox`}>
          <TextInputControlled
            control={control}
            name="material"
            label="Material"
            placeholder="e.g., Oil on canvas"
            testID={`${testID}MaterialTextInput`}
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
        testID={`${testID}DescriptionTextInput`}
      />
    </Column>
  )
}
