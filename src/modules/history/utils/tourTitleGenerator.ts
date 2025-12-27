import type {FeedItem} from '@/modules/tour/types'

const MAX_DESCRIPTION_LENGTH = 150
const DEFAULT_MUSEUM_NAME = 'Unknown Location'
const DEFAULT_TOUR_TITLE = 'Art Tour'

/**
 * generateTourTitle
 * Generates a title for a tour based on the museum name and feed items.
 * Falls back to generic titles if specific information is not available.
 *
 * @param items - Array of feed items from the tour
 * @param museumName - Name of the museum or location
 * @returns Generated tour title string
 *
 * @example
 * generateTourTitle([feedItem], 'Rijksmuseum')
 * // Returns: "Rijksmuseum Tour"
 *
 * @example
 * generateTourTitle([feedItem1, feedItem2], 'Unknown Location')
 * // Returns: "Art Tour - 2 Artworks"
 */
export function generateTourTitle(
  items: FeedItem[],
  museumName: string,
): string {
  const hasValidMuseum =
    museumName.length > 0 && museumName !== DEFAULT_MUSEUM_NAME

  if (hasValidMuseum) {
    return `${museumName} Tour`
  }

  const artworkCount = items.length

  if (artworkCount === 0) {
    return DEFAULT_TOUR_TITLE
  }

  if (artworkCount === 1) {
    const firstItem = items[0]
    const artworkTitle = firstItem?.metadata?.title

    if (artworkTitle) {
      return `Tour: ${artworkTitle}`
    }

    return `${DEFAULT_TOUR_TITLE} - 1 Artwork`
  }

  return `${DEFAULT_TOUR_TITLE} - ${artworkCount} Artworks`
}

/**
 * generateTourDescription
 * Generates a description for a tour by combining artwork information.
 * Truncates to a maximum of 150 characters.
 *
 * @param items - Array of feed items from the tour
 * @returns Generated tour description string, truncated if necessary
 *
 * @example
 * generateTourDescription([feedItem1, feedItem2])
 * // Returns: "Featuring The Starry Night by Van Gogh, Mona Lisa by da Vinci"
 */
export function generateTourDescription(items: FeedItem[]): string {
  if (items.length === 0) {
    return 'An empty tour'
  }

  const artworkDescriptions = items
    .filter(item => item.metadata?.title || item.metadata?.artist)
    .slice(0, 3)
    .map(item => formatArtworkDescription(item))
    .filter(Boolean)

  if (artworkDescriptions.length === 0) {
    return `A tour featuring ${items.length} ${items.length === 1 ? 'artwork' : 'artworks'}`
  }

  const description = `Featuring ${artworkDescriptions.join(', ')}`

  return truncateDescription(description, MAX_DESCRIPTION_LENGTH)
}

/**
 * formatArtworkDescription
 * Formats a single artwork's title and artist into a descriptive string.
 *
 * @param item - Feed item containing artwork metadata
 * @returns Formatted description string for the artwork
 */
function formatArtworkDescription(item: FeedItem): string {
  const title = item.metadata?.title
  const artist = item.metadata?.artist

  if (title && artist) {
    return `${title} by ${artist}`
  }

  if (title) {
    return title
  }

  if (artist) {
    return `work by ${artist}`
  }

  return ''
}

/**
 * truncateDescription
 * Truncates a description to the specified maximum length.
 * Adds ellipsis if truncation occurs, cutting at word boundaries when possible.
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum allowed length including ellipsis
 * @returns Truncated text with ellipsis if necessary
 */
function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  const ellipsis = '...'
  const truncateAt = maxLength - ellipsis.length
  const truncated = text.substring(0, truncateAt)

  // Try to cut at a word boundary
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > truncateAt * 0.5) {
    return truncated.substring(0, lastSpace) + ellipsis
  }

  return truncated + ellipsis
}

/**
 * getHeroImageUri
 * Selects the hero image URI for a tour from its feed items.
 * Returns the first available photo from the first item with photos.
 *
 * @param items - Array of feed items from the tour
 * @returns URI of the hero image or empty string if none available
 */
export function getHeroImageUri(items: FeedItem[]): string {
  const itemWithPhoto = items.find(item => item.photos.length > 0)

  return itemWithPhoto?.photos[0] ?? ''
}
