/**
 * FeedItemStatus
 * Status of a feed item in the tour
 */
type FeedItemStatus =
  | 'uploading'
  | 'processing'
  | 'generating_narrative'
  | 'generating_audio'
  | 'ready'
  | 'error'

/**
 * FeedItemMetadata
 * Optional metadata for a tour object
 */
export type FeedItemMetadata = {
  /**
   * Object title
   */
  title?: string
  /**
   * Artist name
   */
  artist?: string
  /**
   * Year of creation
   */
  year?: string
  /**
   * Material/medium
   */
  material?: string
  /**
   * Description
   */
  description?: string
}

/**
 * FeedItem
 * Represents a single item in the tour feed
 */
export type FeedItem = {
  /**
   * Unique ID for this feed item
   */
  id: string
  /**
   * Array of photo URIs
   */
  photos: string[]
  /**
   * Optional metadata
   */
  metadata?: FeedItemMetadata
  /**
   * Current status of this item
   */
  status: FeedItemStatus
  /**
   * Object ID from recognition API
   */
  objectId?: string
  /**
   * Recognition confidence score (0-100)
   */
  recognitionConfidence?: number
  /**
   * Generated narrative text
   */
  narrativeText?: string
  /**
   * Generated audio URL
   */
  audioUrl?: string
  /**
   * Error message if status is 'error'
   */
  error?: string
  /**
   * Timestamp when item was created
   */
  createdAt: number
}
