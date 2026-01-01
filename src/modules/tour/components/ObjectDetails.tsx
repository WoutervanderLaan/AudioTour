import React from 'react'

import type {FeedItem} from '../types'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'
import {capitalizeFirstLetter} from '@/shared/utils/capitalizeFirstLetter'

/**
 * ObjectDetailsProps
 * Props for the ObjectDetails component
 */
export type ObjectDetailsProps = {
  /**
   * Object description
   */
  description?: string
  /**
   * Recognition confidence (0-100)
   */
  recognitionConfidence?: number
  /**
   * Object ID from recognition
   */
  objectId?: string
  /**
   * Narrative text
   */
  narrativeText?: string
  /**
   * Audio URL
   */
  audioUrl?: string
  /**
   * Processing status
   */
  status: FeedItem['status']
  /**
   * Error message if any
   */
  error?: string
} & TestProps<'ObjectDetails'>

/**
 * ObjectDetails
 * Displays detailed object information (description, recognition, narrative, audio, status)
 *
 * @param props - Component props
 * @returns Object details component
 */
export const ObjectDetails = ({
  description,
  recognitionConfidence,
  objectId,
  narrativeText,
  audioUrl,
  status,
  error,
  testID,
}: ObjectDetailsProps): React.JSX.Element => {
  return (
    <Column
      gap="lg"
      testID={`${testID}Container`}>
      {description !== undefined && (
        <Column
          gap="xs"
          testID={`${testID}DescriptionColumn`}>
          <Text.Label testID={`${testID}DescriptionLabelText`}>
            Description
          </Text.Label>
          <Text.Paragraph testID={`${testID}DescriptionText`}>
            {description}
          </Text.Paragraph>
        </Column>
      )}

      {recognitionConfidence !== undefined && (
        <Column
          gap="xs"
          testID={`${testID}RecognitionColumn`}>
          <Text.Label testID={`${testID}RecognitionLabelText`}>
            Recognition
          </Text.Label>
          <Text.Label testID={`${testID}RecognitionConfidenceText`}>
            Confidence: {recognitionConfidence.toFixed(1)}%
          </Text.Label>
          {objectId !== undefined && (
            <Text.Label testID={`${testID}RecognitionObjectIdText`}>
              Object ID: {objectId}
            </Text.Label>
          )}
        </Column>
      )}

      {narrativeText !== undefined && (
        <Column
          gap="xs"
          testID={`${testID}NarrativeColumn`}>
          <Text.Label testID={`${testID}NarrativeLabelText`}>
            Narrative
          </Text.Label>
          <Text.Paragraph testID={`${testID}NarrativeText`}>
            {narrativeText}
          </Text.Paragraph>
        </Column>
      )}

      {audioUrl !== undefined && (
        <Column
          gap="xs"
          testID={`${testID}AudioColumn`}>
          <Text.Label testID={`${testID}AudioLabelText`}>Audio Tour</Text.Label>
          <AudioPlayer
            src={audioUrl}
            testID={`${testID}AudioPlayer`}
          />
        </Column>
      )}

      {status !== 'ready' && (
        <Box testID={`${testID}StatusBox`}>
          <Text.Label testID={`${testID}StatusText`}>
            Status: {capitalizeFirstLetter(status.replaceAll('_', ' '))}
          </Text.Label>
        </Box>
      )}

      {error !== undefined && (
        <Box testID={`${testID}ErrorBox`}>
          <Text.Label
            color="warning"
            testID={`${testID}ErrorText`}>
            Error: {error}
          </Text.Label>
        </Box>
      )}
    </Column>
  )
}
