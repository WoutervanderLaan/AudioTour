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
 * TourPhotoSubmitForm
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const TourPhotoSubmitFormInputs = (): React.JSX.Element => {
  const {control} = useFormContext<PhotoSubmitForm>()

  return (
    <Column gap="md">
      <ImageInputControlled
        control={control}
        name="photos"
        label="Photos"
        maxImages={MAX_PHOTOS}
        required={true}
        hint="Upload 1-5 photos of the museum object"
      />

      <Text.Title>Object Details (Optional)</Text.Title>

      <TextInputControlled
        control={control}
        name="title"
        label="Title"
        placeholder="e.g., The Starry Night"
      />

      <TextInputControlled
        control={control}
        name="artist"
        label="Artist"
        placeholder="e.g., Vincent van Gogh"
      />

      <Row gap="md">
        <Box flex={1}>
          <TextInputControlled
            control={control}
            name="year"
            label="Year"
            placeholder="e.g., 1889"
            keyboardType="numeric"
          />
        </Box>
        <Box flex={1}>
          <TextInputControlled
            control={control}
            name="material"
            label="Material"
            placeholder="e.g., Oil on canvas"
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
      />
    </Column>
  )
}
