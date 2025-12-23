import * as Crypto from 'expo-crypto'

import {useTourStore} from './useTourStore'
import type {FeedItemMetadata} from '../types'

import {datetime} from '@/core/lib/datetime'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-feed-item-id'),
}))

describe('useTourStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useTourStore.getState()
    reset()
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have empty feedItems array', () => {
      const {feedItems} = useTourStore.getState()
      expect(feedItems).toEqual([])
    })

    it('should have feedLoading false', () => {
      const {feedLoading} = useTourStore.getState()
      expect(feedLoading).toBe(false)
    })
  })

  describe('addFeedItem', () => {
    it('should add a feed item with photos only', () => {
      const {addFeedItem} = useTourStore.getState()
      const photos = ['photo1.jpg', 'photo2.jpg']

      const id = addFeedItem(photos)

      expect(id).toBe('test-feed-item-id')
      const {feedItems} = useTourStore.getState()
      expect(feedItems).toHaveLength(1)
      expect(feedItems[0]).toMatchObject({
        id: 'test-feed-item-id',
        photos,
        status: 'uploading',
      })
      expect(feedItems[0].createdAt).toBeGreaterThan(0)
    })

    it('should add a feed item with photos and metadata', () => {
      const {addFeedItem} = useTourStore.getState()
      const photos = ['photo1.jpg']
      const metadata: FeedItemMetadata = {
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        year: '1503',
        material: 'Oil on poplar',
        description: 'Famous portrait painting',
      }

      const id = addFeedItem(photos, metadata)

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0]).toMatchObject({
        id,
        photos,
        metadata,
        status: 'uploading',
      })
    })

    it('should add multiple feed items', () => {
      const {addFeedItem} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      addFeedItem(['photo1.jpg'])
      addFeedItem(['photo2.jpg'])
      addFeedItem(['photo3.jpg'])

      const {feedItems} = useTourStore.getState()
      expect(feedItems).toHaveLength(3)
      expect(feedItems[0].id).toBe('id-0')
      expect(feedItems[1].id).toBe('id-1')
      expect(feedItems[2].id).toBe('id-2')
    })

    it('should return unique ID for each item', () => {
      const {addFeedItem} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      const id1 = addFeedItem(['photo1.jpg'])
      const id2 = addFeedItem(['photo2.jpg'])

      expect(id1).not.toBe(id2)
    })

    it('should set correct initial status', () => {
      const {addFeedItem} = useTourStore.getState()

      addFeedItem(['photo.jpg'])

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('uploading')
    })

    it('should handle empty photos array', () => {
      const {addFeedItem} = useTourStore.getState()

      addFeedItem([])

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].photos).toEqual([])
    })

    it('should handle partial metadata', () => {
      const {addFeedItem} = useTourStore.getState()
      const metadata: FeedItemMetadata = {
        title: 'Artwork Title',
      }

      addFeedItem(['photo.jpg'], metadata)

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].metadata).toEqual(metadata)
      expect(feedItems[0].metadata?.artist).toBeUndefined()
    })
  })

  describe('updateFeedItem', () => {
    it('should update existing feed item', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      updateFeedItem(id, {
        status: 'processing',
        objectId: 'obj-123',
      })

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('processing')
      expect(feedItems[0].objectId).toBe('obj-123')
    })

    it('should update multiple properties', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      updateFeedItem(id, {
        status: 'ready',
        objectId: 'obj-123',
        recognitionConfidence: 95,
        narrativeText: 'This is a beautiful artwork...',
        audioUrl: 'https://example.com/audio.mp3',
      })

      const {feedItems} = useTourStore.getState()
      const item = feedItems[0]
      expect(item.status).toBe('ready')
      expect(item.objectId).toBe('obj-123')
      expect(item.recognitionConfidence).toBe(95)
      expect(item.narrativeText).toBe('This is a beautiful artwork...')
      expect(item.audioUrl).toBe('https://example.com/audio.mp3')
    })

    it('should not affect other feed items', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      const id1 = addFeedItem(['photo1.jpg'])
      addFeedItem(['photo2.jpg'])

      updateFeedItem(id1, {status: 'ready'})

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('ready')
      expect(feedItems[1].status).toBe('uploading')
    })

    it('should handle non-existent ID gracefully', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()

      addFeedItem(['photo.jpg'])
      updateFeedItem('non-existent-id', {status: 'ready'})

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('uploading')
    })

    it('should update error status and message', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      updateFeedItem(id, {
        status: 'error',
        error: 'Failed to process image',
      })

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('error')
      expect(feedItems[0].error).toBe('Failed to process image')
    })

    it('should handle partial updates', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      updateFeedItem(id, {objectId: 'obj-123'})

      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].status).toBe('uploading')
      expect(feedItems[0].objectId).toBe('obj-123')
    })
  })

  describe('getFeedItem', () => {
    it('should return feed item by ID', () => {
      const {addFeedItem, getFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      const item = getFeedItem(id)

      expect(item).toBeDefined()
      expect(item?.id).toBe(id)
    })

    it('should return undefined for non-existent ID', () => {
      const {getFeedItem} = useTourStore.getState()

      const item = getFeedItem('non-existent-id')

      expect(item).toBeUndefined()
    })

    it('should return correct item from multiple items', () => {
      const {addFeedItem, getFeedItem} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      addFeedItem(['photo1.jpg'])
      const id2 = addFeedItem(['photo2.jpg'])
      addFeedItem(['photo3.jpg'])

      const item = getFeedItem(id2)

      expect(item?.id).toBe(id2)
      expect(item?.photos).toEqual(['photo2.jpg'])
    })

    it('should return updated item', () => {
      const {addFeedItem, updateFeedItem, getFeedItem} = useTourStore.getState()

      const id = addFeedItem(['photo.jpg'])
      updateFeedItem(id, {status: 'ready', objectId: 'obj-123'})

      const item = getFeedItem(id)

      expect(item?.status).toBe('ready')
      expect(item?.objectId).toBe('obj-123')
    })
  })

  describe('setFeedLoading', () => {
    it('should set feedLoading to true', () => {
      const {setFeedLoading} = useTourStore.getState()

      setFeedLoading(true)

      const {feedLoading} = useTourStore.getState()
      expect(feedLoading).toBe(true)
    })

    it('should set feedLoading to false', () => {
      const {setFeedLoading} = useTourStore.getState()

      setFeedLoading(true)
      setFeedLoading(false)

      const {feedLoading} = useTourStore.getState()
      expect(feedLoading).toBe(false)
    })

    it('should not affect feedItems', () => {
      const {addFeedItem, setFeedLoading} = useTourStore.getState()

      addFeedItem(['photo.jpg'])
      setFeedLoading(true)

      const {feedItems} = useTourStore.getState()
      expect(feedItems).toHaveLength(1)
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const {addFeedItem, setFeedLoading, reset} = useTourStore.getState()

      addFeedItem(['photo.jpg'])
      setFeedLoading(true)

      reset()

      const {feedItems, feedLoading} = useTourStore.getState()
      expect(feedItems).toEqual([])
      expect(feedLoading).toBe(false)
    })

    it('should clear all feed items', () => {
      const {addFeedItem, reset} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      addFeedItem(['photo1.jpg'])
      addFeedItem(['photo2.jpg'])
      addFeedItem(['photo3.jpg'])

      reset()

      const {feedItems} = useTourStore.getState()
      expect(feedItems).toEqual([])
    })

    it('should allow adding items after reset', () => {
      const {addFeedItem, reset} = useTourStore.getState()

      addFeedItem(['photo1.jpg'])
      reset()
      const id = addFeedItem(['photo2.jpg'])

      const {feedItems} = useTourStore.getState()
      expect(feedItems).toHaveLength(1)
      expect(feedItems[0].id).toBe(id)
    })
  })

  describe('edge cases', () => {
    it('should handle large number of feed items', () => {
      const {addFeedItem} = useTourStore.getState()
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      for (let i = 0; i < 50; i++) {
        addFeedItem([`photo${i}.jpg`])
      }

      const {feedItems} = useTourStore.getState()
      expect(feedItems).toHaveLength(50)
    })

    it('should maintain createdAt timestamp', () => {
      const {addFeedItem} = useTourStore.getState()
      const beforeTime = datetime.timestamp()

      addFeedItem(['photo.jpg'])

      const afterTime = datetime.timestamp()
      const {feedItems} = useTourStore.getState()
      expect(feedItems[0].createdAt).toBeGreaterThanOrEqual(beforeTime)
      expect(feedItems[0].createdAt).toBeLessThanOrEqual(afterTime)
    })

    it('should handle all status types', () => {
      const {addFeedItem, updateFeedItem} = useTourStore.getState()
      const statuses = [
        'uploading',
        'processing',
        'generating_narrative',
        'generating_audio',
        'ready',
        'error',
      ] as const

      const id = addFeedItem(['photo.jpg'])

      statuses.forEach(status => {
        updateFeedItem(id, {status})
        const {feedItems} = useTourStore.getState()
        expect(feedItems[0].status).toBe(status)
      })
    })
  })
})
