import {act, renderHook} from '@testing-library/react-native'

import {
  useHistoryActions,
  useHistoryLoading,
  useLocalTours,
  useSharedTours,
  useTourById,
  useTourCount,
  useTours,
  useTourSummaries,
} from './selectors'
import {useHistoryStore} from './useHistoryStore'

import type {FeedItem} from '@/modules/tour/types'

import type {CreatePersistedTourParams} from '../types'

// Mock datetime
jest.mock('@/core/lib/datetime', () => ({
  datetime: {
    timestamp: jest.fn(() => 1704067200000),
  },
}))

describe('history selectors', () => {
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
    useHistoryStore.getState().reset()
    jest.clearAllMocks()
  })

  describe('useTours', () => {
    it('should return empty array initially', () => {
      const {result} = renderHook(() => useTours())

      expect(result.current).toEqual([])
    })

    it('should return tours when available', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTours())

      expect(result.current).toHaveLength(1)
      expect(result.current[0].title).toBe('My Museum Tour')
    })

    it('should update when tours change', () => {
      const {result} = renderHook(() => useTours())
      expect(result.current).toHaveLength(0)

      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      expect(result.current).toHaveLength(1)
    })
  })

  describe('useTourById', () => {
    it('should return undefined for non-existent tour', () => {
      const {result} = renderHook(() => useTourById('non-existent'))

      expect(result.current).toBeUndefined()
    })

    it('should return tour when exists', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourById('test-uuid-123'))

      expect(result.current).toBeDefined()
      expect(result.current?.title).toBe('My Museum Tour')
    })
  })

  describe('useHistoryLoading', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useHistoryLoading())

      expect(result.current).toBe(false)
    })

    it('should update when loading changes', () => {
      const {result} = renderHook(() => useHistoryLoading())

      act(() => {
        useHistoryStore.getState().setLoading(true)
      })

      expect(result.current).toBe(true)
    })
  })

  describe('useTourCount', () => {
    it('should return 0 initially', () => {
      const {result} = renderHook(() => useTourCount())

      expect(result.current).toBe(0)
    })

    it('should return correct count', () => {
      const Crypto = require('expo-crypto')

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-1')
        useHistoryStore.getState().saveTour(mockTourParams)
        Crypto.randomUUID.mockReturnValueOnce('tour-2')
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourCount())

      expect(result.current).toBe(2)
    })
  })

  describe('useTourSummaries', () => {
    it('should return empty array initially', () => {
      const {result} = renderHook(() => useTourSummaries())

      expect(result.current).toEqual([])
    })

    it('should return summaries with artworkCount', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSummaries())

      expect(result.current).toHaveLength(1)
      expect(result.current[0]).toEqual({
        id: 'test-uuid-123',
        title: 'My Museum Tour',
        description: 'A wonderful tour of art',
        heroImageUri: 'hero.jpg',
        museumName: 'Art Museum',
        createdAt: 1704067200000,
        communityRating: 0,
        ratingCount: 0,
        artworkCount: 1,
      })
    })

    it('should sort by creation date (newest first)', () => {
      const datetime = require('@/core/lib/datetime').datetime
      const Crypto = require('expo-crypto')

      act(() => {
        datetime.timestamp.mockReturnValueOnce(1704067200000)
        Crypto.randomUUID.mockReturnValueOnce('tour-old')
        useHistoryStore.getState().saveTour({
          ...mockTourParams,
          title: 'Old Tour',
        })

        datetime.timestamp.mockReturnValueOnce(1704153600000)
        Crypto.randomUUID.mockReturnValueOnce('tour-new')
        useHistoryStore.getState().saveTour({
          ...mockTourParams,
          title: 'New Tour',
        })
      })

      const {result} = renderHook(() => useTourSummaries())

      expect(result.current[0].title).toBe('New Tour')
      expect(result.current[1].title).toBe('Old Tour')
    })
  })

  describe('useSharedTours', () => {
    it('should return empty array when no shared tours', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useSharedTours())

      expect(result.current).toEqual([])
    })

    it('should return only shared tours', () => {
      const Crypto = require('expo-crypto')

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-private')
        useHistoryStore.getState().saveTour(mockTourParams)

        Crypto.randomUUID.mockReturnValueOnce('tour-shared')
        useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore.getState().updateTour('tour-shared', {isShared: true})
      })

      const {result} = renderHook(() => useSharedTours())

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe('tour-shared')
    })
  })

  describe('useLocalTours', () => {
    it('should return all tours initially (all local)', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useLocalTours())

      expect(result.current).toHaveLength(1)
    })

    it('should exclude synced tours', () => {
      const Crypto = require('expo-crypto')

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-local')
        useHistoryStore.getState().saveTour(mockTourParams)

        Crypto.randomUUID.mockReturnValueOnce('tour-synced')
        useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore
          .getState()
          .updateTour('tour-synced', {syncStatus: 'synced'})
      })

      const {result} = renderHook(() => useLocalTours())

      expect(result.current).toHaveLength(1)
      expect(result.current[0].id).toBe('tour-local')
    })
  })

  describe('useHistoryActions', () => {
    it('should return all action methods', () => {
      const {result} = renderHook(() => useHistoryActions())

      expect(result.current).toHaveProperty('saveTour')
      expect(result.current).toHaveProperty('updateTour')
      expect(result.current).toHaveProperty('deleteTour')
      expect(result.current).toHaveProperty('reset')
    })

    it('should save tour via action', () => {
      const {result} = renderHook(() => useHistoryActions())

      act(() => {
        result.current.saveTour(mockTourParams)
      })

      const state = useHistoryStore.getState()
      expect(state.tours).toHaveLength(1)
    })

    it('should update tour via action', () => {
      const {result} = renderHook(() => useHistoryActions())

      act(() => {
        result.current.saveTour(mockTourParams)
      })

      act(() => {
        result.current.updateTour('test-uuid-123', {title: 'Updated Title'})
      })

      const state = useHistoryStore.getState()
      expect(state.tours[0].title).toBe('Updated Title')
    })

    it('should delete tour via action', () => {
      const {result} = renderHook(() => useHistoryActions())

      act(() => {
        result.current.saveTour(mockTourParams)
      })

      act(() => {
        result.current.deleteTour('test-uuid-123')
      })

      const state = useHistoryStore.getState()
      expect(state.tours).toHaveLength(0)
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useHistoryActions())

      act(() => {
        result.current.saveTour(mockTourParams)
      })

      act(() => {
        result.current.reset()
      })

      const state = useHistoryStore.getState()
      expect(state.tours).toHaveLength(0)
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useHistoryActions())

      const firstReference = result.current

      rerender(null)

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', () => {
      const {result: toursResult} = renderHook(() => useTours())
      const {result: countResult} = renderHook(() => useTourCount())
      const {result: loadingResult} = renderHook(() => useHistoryLoading())
      const {result: actionsResult} = renderHook(() => useHistoryActions())

      act(() => {
        actionsResult.current.saveTour(mockTourParams)
      })

      expect(toursResult.current).toHaveLength(1)
      expect(countResult.current).toBe(1)
      expect(loadingResult.current).toBe(false)

      act(() => {
        actionsResult.current.reset()
      })

      expect(toursResult.current).toHaveLength(0)
      expect(countResult.current).toBe(0)
    })
  })
})
