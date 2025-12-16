import type React from 'react'
import {useFormContext} from 'react-hook-form'

import {TextInputControlled} from '@/shared/components/ui/form'
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
  const {control} = useFormContext()

  return (
    <Column gap="md">
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
