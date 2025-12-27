import type {FeedItem} from '@/modules/tour/types'

import {
  generateTourDescription,
  generateTourTitle,
  getHeroImageUri,
} from './tourTitleGenerator'

describe('tourTitleGenerator', () => {
  const createFeedItem = (overrides: Partial<FeedItem> = {}): FeedItem => ({
    id: 'feed-item-1',
    photos: ['photo1.jpg'],
    status: 'ready',
    createdAt: 1704067200000,
    ...overrides,
  })

  describe('generateTourTitle', () => {
    it('should return museum name + Tour when valid museum provided', () => {
      const items = [createFeedItem()]
      const result = generateTourTitle(items, 'Rijksmuseum')

      expect(result).toBe('Rijksmuseum Tour')
    })

    it('should return museum name + Tour for any valid museum', () => {
      const items = [createFeedItem()]
      const result = generateTourTitle(items, 'Van Gogh Museum')

      expect(result).toBe('Van Gogh Museum Tour')
    })

    it('should return default title for Unknown Location with empty items', () => {
      const result = generateTourTitle([], 'Unknown Location')

      expect(result).toBe('Art Tour')
    })

    it('should return artwork title for single item without museum', () => {
      const items = [
        createFeedItem({
          metadata: {title: 'The Starry Night'},
        }),
      ]
      const result = generateTourTitle(items, 'Unknown Location')

      expect(result).toBe('Tour: The Starry Night')
    })

    it('should return count for single item without title or museum', () => {
      const items = [createFeedItem()]
      const result = generateTourTitle(items, 'Unknown Location')

      expect(result).toBe('Art Tour - 1 Artwork')
    })

    it('should return count for multiple items without museum', () => {
      const items = [createFeedItem(), createFeedItem({id: 'feed-item-2'})]
      const result = generateTourTitle(items, 'Unknown Location')

      expect(result).toBe('Art Tour - 2 Artworks')
    })

    it('should return count for many items without museum', () => {
      const items = Array.from({length: 10}, (_, i) =>
        createFeedItem({id: `feed-item-${i}`}),
      )
      const result = generateTourTitle(items, 'Unknown Location')

      expect(result).toBe('Art Tour - 10 Artworks')
    })

    it('should prefer museum name over artwork count', () => {
      const items = [
        createFeedItem({metadata: {title: 'The Starry Night'}}),
        createFeedItem({id: 'feed-item-2'}),
      ]
      const result = generateTourTitle(items, 'MoMA')

      expect(result).toBe('MoMA Tour')
    })

    it('should handle empty museum name', () => {
      const items = [createFeedItem()]
      const result = generateTourTitle(items, '')

      expect(result).toBe('Art Tour - 1 Artwork')
    })
  })

  describe('generateTourDescription', () => {
    it('should return empty tour message for no items', () => {
      const result = generateTourDescription([])

      expect(result).toBe('An empty tour')
    })

    it('should return generic message for items without metadata', () => {
      const items = [createFeedItem()]
      const result = generateTourDescription(items)

      expect(result).toBe('A tour featuring 1 artwork')
    })

    it('should use plural for multiple items without metadata', () => {
      const items = [createFeedItem(), createFeedItem({id: 'feed-item-2'})]
      const result = generateTourDescription(items)

      expect(result).toBe('A tour featuring 2 artworks')
    })

    it('should include title and artist when both available', () => {
      const items = [
        createFeedItem({
          metadata: {title: 'The Starry Night', artist: 'Vincent van Gogh'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe('Featuring The Starry Night by Vincent van Gogh')
    })

    it('should include only title when artist not available', () => {
      const items = [
        createFeedItem({
          metadata: {title: 'The Starry Night'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe('Featuring The Starry Night')
    })

    it('should include artist when title not available', () => {
      const items = [
        createFeedItem({
          metadata: {artist: 'Vincent van Gogh'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe('Featuring work by Vincent van Gogh')
    })

    it('should combine multiple artworks', () => {
      const items = [
        createFeedItem({
          metadata: {title: 'The Starry Night', artist: 'Van Gogh'},
        }),
        createFeedItem({
          id: 'feed-item-2',
          metadata: {title: 'Mona Lisa', artist: 'da Vinci'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe(
        'Featuring The Starry Night by Van Gogh, Mona Lisa by da Vinci',
      )
    })

    it('should limit to first 3 artworks', () => {
      const items = [
        createFeedItem({
          metadata: {title: 'Artwork 1'},
        }),
        createFeedItem({
          id: 'feed-item-2',
          metadata: {title: 'Artwork 2'},
        }),
        createFeedItem({
          id: 'feed-item-3',
          metadata: {title: 'Artwork 3'},
        }),
        createFeedItem({
          id: 'feed-item-4',
          metadata: {title: 'Artwork 4'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe('Featuring Artwork 1, Artwork 2, Artwork 3')
      expect(result).not.toContain('Artwork 4')
    })

    it('should truncate long descriptions to 150 characters', () => {
      const items = [
        createFeedItem({
          metadata: {
            title: 'A Very Long Artwork Title That Goes On And On',
            artist: 'An Artist With A Very Long Name',
          },
        }),
        createFeedItem({
          id: 'feed-item-2',
          metadata: {
            title: 'Another Very Long Artwork Title',
            artist: 'Another Artist With Long Name',
          },
        }),
        createFeedItem({
          id: 'feed-item-3',
          metadata: {
            title: 'Yet Another Long Title',
            artist: 'Yet Another Artist',
          },
        }),
      ]
      const result = generateTourDescription(items)

      expect(result.length).toBeLessThanOrEqual(150)
      expect(result).toContain('...')
    })

    it('should skip items without title or artist', () => {
      const items = [
        createFeedItem(),
        createFeedItem({
          id: 'feed-item-2',
          metadata: {title: 'Valid Artwork'},
        }),
      ]
      const result = generateTourDescription(items)

      expect(result).toBe('Featuring Valid Artwork')
    })
  })

  describe('getHeroImageUri', () => {
    it('should return empty string for no items', () => {
      const result = getHeroImageUri([])

      expect(result).toBe('')
    })

    it('should return first photo from first item', () => {
      const items = [
        createFeedItem({photos: ['first.jpg', 'second.jpg']}),
        createFeedItem({id: 'feed-item-2', photos: ['third.jpg']}),
      ]
      const result = getHeroImageUri(items)

      expect(result).toBe('first.jpg')
    })

    it('should skip items without photos', () => {
      const items = [
        createFeedItem({photos: []}),
        createFeedItem({id: 'feed-item-2', photos: ['photo.jpg']}),
      ]
      const result = getHeroImageUri(items)

      expect(result).toBe('photo.jpg')
    })

    it('should return empty string if no items have photos', () => {
      const items = [
        createFeedItem({photos: []}),
        createFeedItem({id: 'feed-item-2', photos: []}),
      ]
      const result = getHeroImageUri(items)

      expect(result).toBe('')
    })
  })
})
