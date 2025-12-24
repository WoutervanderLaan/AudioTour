import React from 'react'

import type {FeedItem} from '../types'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Text} from '@/shared/components/ui/typography'
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
  /**
   * Test ID for the component
   */
  testId?: string
}

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
  testId = 'ObjectDetails',
}: ObjectDetailsProps): React.JSX.Element => {
  return (
    <Column
      gap="lg"
      testId={`${testId}ContainerView`}>
      {description !== undefined && (
        <Column
          gap="xs"
          testId={`${testId}DescriptionView`}>
          <Text.Label testId={`${testId}DescriptionLabelText`}>
            Description
          </Text.Label>
          <Text.Paragraph testId={`${testId}DescriptionText`}>
            {description}
          </Text.Paragraph>
        </Column>
      )}

      {recognitionConfidence !== undefined && (
        <Column
          gap="xs"
          testId={`${testId}RecognitionView`}>
          <Text.Label testId={`${testId}RecognitionLabelText`}>
            Recognition
          </Text.Label>
          <Text.Label testId={`${testId}RecognitionConfidenceText`}>
            Confidence: {recognitionConfidence.toFixed(1)}%
          </Text.Label>
          {objectId !== undefined && (
            <Text.Label testId={`${testId}RecognitionObjectIdText`}>
              Object ID: {objectId}
            </Text.Label>
          )}
        </Column>
      )}

      {narrativeText !== undefined && (
        <Column
          gap="xs"
          testId={`${testId}NarrativeView`}>
          <Text.Label testId={`${testId}NarrativeLabelText`}>
            Narrative
          </Text.Label>
          <Text.Paragraph testId={`${testId}NarrativeText`}>
            {narrativeText}
          </Text.Paragraph>
        </Column>
      )}

      {audioUrl !== undefined && (
        <Column
          gap="xs"
          testId={`${testId}AudioView`}>
          <Text.Label testId={`${testId}AudioLabelText`}>Audio Tour</Text.Label>
          <AudioPlayer
            src={audioUrl}
            testId={`${testId}AudioPlayer`} />
        </Column>
      )}

      {status !== 'ready' && (
        <Box testId={`${testId}StatusView`}>
          <Text.Label testId={`${testId}StatusText`}>
            Status: {capitalizeFirstLetter(status.replaceAll('_', ' '))}
          </Text.Label>
        </Box>
      )}

      {error !== undefined && (
        <Box testId={`${testId}ErrorView`}>
          <Text.Label
            color="warning"
            testId={`${testId}ErrorText`}>
            Error: {error}
          </Text.Label>
        </Box>
      )}
    </Column>
  )
}
