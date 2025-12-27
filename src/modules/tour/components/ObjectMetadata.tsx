import React from 'react'

import type {FeedItem} from '../types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * ObjectMetadataProps
 * Props for the ObjectMetadata component
 */
export type ObjectMetadataProps = {
  /**
   * Object metadata
   */
  metadata?: FeedItem['metadata']
} & TestProps<'ObjectMetadata'>

/**
 * ObjectMetadata
 * Displays basic object metadata (title, artist, year, material)
 *
 * @param props - Component props
 * @returns Object metadata component
 */
export const ObjectMetadata = ({
  metadata,
  testID,
}: ObjectMetadataProps): React.JSX.Element | null => {
  if (!metadata) {
    return null
  }

  const hasYearOrMaterial =
    metadata.year !== undefined || metadata.material !== undefined

  return (
    <Column
      gap="lg"
      testID={`${testID}ContainerColumn`}>
      {metadata.title !== undefined && (
        <Text.Title testID={`${testID}TitleText`}>{metadata.title}</Text.Title>
      )}

      {metadata.artist !== undefined && (
        <Text.Paragraph testID={`${testID}ArtistText`}>
          {metadata.artist}
        </Text.Paragraph>
      )}

      {!!hasYearOrMaterial && (
        <Row
          gap="md"
          wrap="wrap"
          testID={`${testID}DetailsRow`}>
          {metadata.year !== undefined && (
            <Text.Label testID={`${testID}YearText`}>
              {metadata.year}
            </Text.Label>
          )}
          {metadata.material !== undefined && (
            <Text.Label testID={`${testID}MaterialText`}>
              {metadata.material}
            </Text.Label>
          )}
        </Row>
      )}
    </Column>
  )
}
