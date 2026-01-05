import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * FeedItemProps
 * Props for the FeedItem component
 */
export type FeedItemProps = {
  /**
   * The feed item data to display
   */
  item: FeedItemType
  /**
   * Callback when item is pressed to view details
   */
  onPress: () => void
} & TestProps<'FeedItem'>
