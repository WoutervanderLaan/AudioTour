import type {FeedItem} from '@/modules/tour/types'

import type {CreatePersistedTourParams, PersistedTour} from '../types'

import {useHistoryStore} from './useHistoryStore'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid-123'),
}))

// Mock datetime
jest.mock('@/core/lib/datetime', () => ({
  datetime: {
    timestamp: jest.fn(() => 1704067200000), // 2024-01-01 00:00:00 UTC
  },
}))

describe('useHistoryStore', () => {
  const mockFeedItem: FeedItem = {
    id: 'feed-item-1',
    photos: ['photo1.jpg'],
    status: 'ready',
    createdAt: 1704067200000,
    metadata: {
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
    },
    narrativeText: 'A beautiful painting...',
    audioUrl: 'audio.mp3',
  }

  const mockTourParams: CreatePersistedTourParams = {
    title: 'My Museum Tour',
    description: 'A wonderful tour of art',
    heroImageUri: 'hero.jpg',
    museumId: 'museum-123',
    museumName: 'Art Museum',
    coordinates: {latitude: 52.3676, longitude: 4.9041},
    feedItems: [mockFeedItem],
    userId: null,
    sessionId: 'session-123',
  }

  beforeEach(() => {
    // Reset the store before each test
    const {reset} = useHistoryStore.getState()
    reset()
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have empty tours array', () => {
      const {tours} = useHistoryStore.getState()
      expect(tours).toEqual([])
    })

    it('should have isLoading false', () => {
      const {isLoading} = useHistoryStore.getState()
      expect(isLoading).toBe(false)
    })
  })

  describe('saveTour', () => {
    it('should save a new tour and return its ID', () => {
      const {saveTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)

      expect(id).toBe('mock-uuid-123')
    })

    it('should add tour with correct properties', () => {
      const {saveTour, tours} = useHistoryStore.getState()

      saveTour(mockTourParams)

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour).toMatchObject({
        ...mockTourParams,
        id: 'mock-uuid-123',
        createdAt: 1704067200000,
        updatedAt: 1704067200000,
        isShared: false,
        isOfficial: false,
        communityRating: 0,
        ratingCount: 0,
        syncStatus: 'local',
      })
    })

    it('should prepend new tours to the array', () => {
      const {saveTour} = useHistoryStore.getState()

      // Save first tour
      saveTour(mockTourParams)

      // Mock a different UUID for second tour
      const Crypto = require('expo-crypto')
      Crypto.randomUUID.mockReturnValueOnce('mock-uuid-456')

      // Save second tour
      saveTour({...mockTourParams, title: 'Second Tour'})

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(2)
      expect(tours[0].id).toBe('mock-uuid-456')
      expect(tours[1].id).toBe('mock-uuid-123')
    })

    it('should handle tour without coordinates', () => {
      const {saveTour} = useHistoryStore.getState()

      const paramsWithoutCoords: CreatePersistedTourParams = {
        ...mockTourParams,
        coordinates: null,
      }

      saveTour(paramsWithoutCoords)

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.coordinates).toBeNull()
    })

    it('should handle tour with empty feed items', () => {
      const {saveTour} = useHistoryStore.getState()

      const paramsWithEmptyFeed: CreatePersistedTourParams = {
        ...mockTourParams,
        feedItems: [],
      }

      saveTour(paramsWithEmptyFeed)

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.feedItems).toEqual([])
    })
  })

  describe('updateTour', () => {
    it('should update tour title', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      updateTour(id, {title: 'Updated Title'})

      const updatedTour = useHistoryStore.getState().tours[0]
      expect(updatedTour.title).toBe('Updated Title')
    })

    it('should update updatedAt timestamp', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()
      const datetime = require('@/core/lib/datetime').datetime

      const id = saveTour(mockTourParams)

      // Mock a later timestamp
      datetime.timestamp.mockReturnValueOnce(1704153600000)

      updateTour(id, {title: 'Updated Title'})

      const updatedTour = useHistoryStore.getState().tours[0]
      expect(updatedTour.updatedAt).toBe(1704153600000)
    })

    it('should update isShared flag', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      updateTour(id, {isShared: true})

      const updatedTour = useHistoryStore.getState().tours[0]
      expect(updatedTour.isShared).toBe(true)
    })

    it('should update syncStatus', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      updateTour(id, {syncStatus: 'synced'})

      const updatedTour = useHistoryStore.getState().tours[0]
      expect(updatedTour.syncStatus).toBe('synced')
    })

    it('should not affect other tours', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      const Crypto = require('expo-crypto')
      Crypto.randomUUID.mockReturnValueOnce('tour-1')
      const id1 = saveTour(mockTourParams)

      Crypto.randomUUID.mockReturnValueOnce('tour-2')
      saveTour({...mockTourParams, title: 'Second Tour'})

      updateTour(id1, {title: 'Updated First Tour'})

      const {tours} = useHistoryStore.getState()
      const secondTour = tours.find(t => t.id === 'tour-2')
      expect(secondTour?.title).toBe('Second Tour')
    })

    it('should handle updating non-existent tour', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      saveTour(mockTourParams)
      updateTour('non-existent-id', {title: 'Updated Title'})

      const {tours} = useHistoryStore.getState()
      expect(tours[0].title).toBe('My Museum Tour')
    })
  })

  describe('deleteTour', () => {
    it('should remove tour from array', () => {
      const {saveTour, deleteTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      deleteTour(id)

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(0)
    })

    it('should only remove specified tour', () => {
      const {saveTour, deleteTour} = useHistoryStore.getState()

      const Crypto = require('expo-crypto')
      Crypto.randomUUID.mockReturnValueOnce('tour-1')
      const id1 = saveTour(mockTourParams)

      Crypto.randomUUID.mockReturnValueOnce('tour-2')
      saveTour({...mockTourParams, title: 'Second Tour'})

      deleteTour(id1)

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(1)
      expect(tours[0].id).toBe('tour-2')
    })

    it('should handle deleting non-existent tour', () => {
      const {saveTour, deleteTour} = useHistoryStore.getState()

      saveTour(mockTourParams)
      deleteTour('non-existent-id')

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(1)
    })
  })

  describe('getTour', () => {
    it('should return tour by ID', () => {
      const {saveTour, getTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      const tour = getTour(id)

      expect(tour).toBeDefined()
      expect(tour?.id).toBe(id)
    })

    it('should return undefined for non-existent ID', () => {
      const {getTour} = useHistoryStore.getState()

      const tour = getTour('non-existent-id')

      expect(tour).toBeUndefined()
    })
  })

  describe('getTours', () => {
    it('should return empty array when no tours', () => {
      const {getTours} = useHistoryStore.getState()

      const tours = getTours()

      expect(tours).toEqual([])
    })

    it('should return tours sorted by creation date (newest first)', () => {
      const {saveTour, getTours} = useHistoryStore.getState()
      const datetime = require('@/core/lib/datetime').datetime
      const Crypto = require('expo-crypto')

      // First tour (oldest)
      datetime.timestamp.mockReturnValueOnce(1704067200000)
      Crypto.randomUUID.mockReturnValueOnce('tour-old')
      saveTour({...mockTourParams, title: 'Old Tour'})

      // Second tour (newest)
      datetime.timestamp.mockReturnValueOnce(1704153600000)
      Crypto.randomUUID.mockReturnValueOnce('tour-new')
      saveTour({...mockTourParams, title: 'New Tour'})

      const tours = getTours()

      expect(tours[0].title).toBe('New Tour')
      expect(tours[1].title).toBe('Old Tour')
    })
  })

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const {setLoading} = useHistoryStore.getState()

      setLoading(true)

      const {isLoading} = useHistoryStore.getState()
      expect(isLoading).toBe(true)
    })

    it('should set loading to false', () => {
      const {setLoading} = useHistoryStore.getState()

      setLoading(true)
      setLoading(false)

      const {isLoading} = useHistoryStore.getState()
      expect(isLoading).toBe(false)
    })
  })

  describe('reset', () => {
    it('should clear all tours', () => {
      const {saveTour, reset} = useHistoryStore.getState()

      saveTour(mockTourParams)
      reset()

      const {tours} = useHistoryStore.getState()
      expect(tours).toEqual([])
    })

    it('should reset loading state', () => {
      const {setLoading, reset} = useHistoryStore.getState()

      setLoading(true)
      reset()

      const {isLoading} = useHistoryStore.getState()
      expect(isLoading).toBe(false)
    })
  })

  describe('initialize', () => {
    it('should set isLoading to false', () => {
      const {setLoading, initialize} = useHistoryStore.getState()

      setLoading(true)
      initialize()

      const {isLoading} = useHistoryStore.getState()
      expect(isLoading).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('should handle multiple tours with same title', () => {
      const {saveTour} = useHistoryStore.getState()
      const Crypto = require('expo-crypto')

      Crypto.randomUUID.mockReturnValueOnce('tour-1')
      saveTour(mockTourParams)

      Crypto.randomUUID.mockReturnValueOnce('tour-2')
      saveTour(mockTourParams)

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(2)
      expect(tours[0].id).not.toBe(tours[1].id)
    })

    it('should handle updating tour with multiple feed items', () => {
      const {saveTour, updateTour} = useHistoryStore.getState()

      const manyFeedItems: FeedItem[] = Array.from({length: 10}, (_, i) => ({
        ...mockFeedItem,
        id: `feed-item-${i}`,
      }))

      const id = saveTour({...mockTourParams, feedItems: manyFeedItems})

      const newFeedItems: FeedItem[] = [
        ...manyFeedItems,
        {...mockFeedItem, id: 'feed-item-new'},
      ]

      updateTour(id, {feedItems: newFeedItems})

      const updatedTour = useHistoryStore.getState().tours[0]
      expect(updatedTour.feedItems).toHaveLength(11)
    })

    it('should handle save, update, delete sequence', () => {
      const {saveTour, updateTour, deleteTour} = useHistoryStore.getState()

      const id = saveTour(mockTourParams)
      updateTour(id, {title: 'Updated'})
      deleteTour(id)

      const {tours} = useHistoryStore.getState()
      expect(tours).toHaveLength(0)
    })
  })
})
