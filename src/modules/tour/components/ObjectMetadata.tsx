import React from 'react'

import type {FeedItem} from '../types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * ObjectMetadataProps
 * Props for the ObjectMetadata component
 */
export type ObjectMetadataProps = {
  /**
   * Object metadata
   */
  metadata?: FeedItem['metadata']
}

/**
 * ObjectMetadata
 * Displays basic object metadata (title, artist, year, material)
 *
 * @param props - Component props
 * @returns Object metadata component
 */
export const ObjectMetadata = ({
  metadata,
}: ObjectMetadataProps): React.JSX.Element | null => {
  if (!metadata) {
    return null
  }

  const hasYearOrMaterial =
    metadata.year !== undefined || metadata.material !== undefined

  return (
    <Column gap="lg">
      {metadata.title !== undefined && (
        <Text.Title>{metadata.title}</Text.Title>
      )}

      {metadata.artist !== undefined && (
        <Text.Paragraph>{metadata.artist}</Text.Paragraph>
      )}

      {!!hasYearOrMaterial && (
        <Row
          gap="md"
          wrap="wrap">
          {metadata.year !== undefined && (
            <Text.Label>{metadata.year}</Text.Label>
          )}
          {metadata.material !== undefined && (
            <Text.Label>{metadata.material}</Text.Label>
          )}
        </Row>
      )}
    </Column>
  )
}
