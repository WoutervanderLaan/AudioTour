import type {FeedItem} from '../types'

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
