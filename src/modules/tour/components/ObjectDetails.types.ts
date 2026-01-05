import type {FeedItem} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

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
