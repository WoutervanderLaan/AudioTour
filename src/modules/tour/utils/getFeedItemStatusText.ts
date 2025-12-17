import type {FeedItem} from '@/modules/tour/store/useTourStore'

/**
 * getStatusText
 * Returns human-readable status text for a feed item status
 *
 * @param status - Feed item status
 * @returns Status text to display
 */
export const getFeedItemStatusText = (status: FeedItem['status']): string => {
  switch (status) {
    case 'uploading':
      return 'Uploading photos...'
    case 'processing':
      return 'Processing...'
    case 'generating_narrative':
      return 'Generating narrative...'
    case 'generating_audio':
      return 'Generating audio...'
    case 'ready':
      return 'Ready'
    case 'error':
      return 'Error occurred'
    default:
      return 'Processing...'
  }
}
