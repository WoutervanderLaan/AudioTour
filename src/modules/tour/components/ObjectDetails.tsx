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
}: ObjectDetailsProps): React.JSX.Element => {
  return (
    <Column gap="lg">
      {description !== undefined && (
        <Column gap="xs">
          <Text.Label>Description</Text.Label>
          <Text.Paragraph>{description}</Text.Paragraph>
        </Column>
      )}

      {recognitionConfidence !== undefined && (
        <Column gap="xs">
          <Text.Label>Recognition</Text.Label>
          <Text.Label>
            Confidence: {recognitionConfidence.toFixed(1)}%
          </Text.Label>
          {objectId !== undefined && (
            <Text.Label>Object ID: {objectId}</Text.Label>
          )}
        </Column>
      )}

      {narrativeText !== undefined && (
        <Column gap="xs">
          <Text.Label>Narrative</Text.Label>
          <Text.Paragraph>{narrativeText}</Text.Paragraph>
        </Column>
      )}

      {audioUrl !== undefined && (
        <Column gap="xs">
          <Text.Label>Audio Tour</Text.Label>
          <AudioPlayer src={audioUrl} />
        </Column>
      )}

      {status !== 'ready' && (
        <Box>
          <Text.Label>
            Status: {capitalizeFirstLetter(status.replaceAll('_', ' '))}
          </Text.Label>
        </Box>
      )}

      {error !== undefined && (
        <Box>
          <Text.Label color="warning">Error: {error}</Text.Label>
        </Box>
      )}
    </Column>
  )
}
