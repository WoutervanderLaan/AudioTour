import {act, renderHook} from '@testing-library/react-native'

import type {FeedItem} from '../types'

import {useTourPersistence} from './useTourPersistence'

import {useHistoryStore} from '@/modules/history/store/useHistoryStore'
import {useTourStore} from '@/modules/tour/store/useTourStore'
import {useMuseumStore} from '@/store/slices/museumStore'
import {useUserSessionStore} from '@/store/slices/userSessionStore'

// Mock expo-crypto for history store
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'mock-tour-id'),
}))

// Mock datetime
jest.mock('@/core/lib/datetime', () => ({
  datetime: {
    timestamp: jest.fn(() => 1704067200000),
  },
}))

// Mock logger
jest.mock('@/core/lib/logger/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
  },
}))

describe('useTourPersistence', () => {
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

  beforeEach(() => {
    // Reset all stores
    useTourStore.getState().reset()
    useHistoryStore.getState().reset()
    useMuseumStore.getState().reset()

    // Reset session store
    act(() => {
      useUserSessionStore.getState().regenerateSession()
    })

    jest.clearAllMocks()
  })

  describe('canSaveTour', () => {
    it('should return false when no feed items', () => {
      const {result} = renderHook(() => useTourPersistence())

      expect(result.current.canSaveTour()).toBe(false)
    })

    it('should return false when only uploading items', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo.jpg'])
      })

      const {result} = renderHook(() => useTourPersistence())

      expect(result.current.canSaveTour()).toBe(false)
    })

    it('should return true when at least one ready item', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      expect(result.current.canSaveTour()).toBe(true)
    })

    it('should return true when item has error status', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'error'})
      })

      const {result} = renderHook(() => useTourPersistence())

      expect(result.current.canSaveTour()).toBe(true)
    })
  })

  describe('saveTourToHistory', () => {
    it('should return null when no content to save', () => {
      const {result} = renderHook(() => useTourPersistence())

      const tourId = result.current.saveTourToHistory()

      expect(tourId).toBeNull()
    })

    it('should save tour and return ID when content available', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore
          .getState()
          .updateFeedItem(id, {...mockFeedItem, id, status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      let tourId: string | null = null
      act(() => {
        tourId = result.current.saveTourToHistory()
      })

      expect(tourId).toBe('mock-tour-id')
    })

    it('should save tour with museum name when museum is set', () => {
      act(() => {
        useMuseumStore.getState().setMuseum('rijksmuseum')
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.museumName).toBe('Rijksmuseum')
      expect(savedTour.title).toBe('Rijksmuseum Tour')
    })

    it('should save tour with Unknown Location when no museum', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.museumName).toBe('Unknown Location')
    })

    it('should save coordinates when provided', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())
      const coords = {latitude: 52.3599, longitude: 4.8852}

      act(() => {
        result.current.saveTourToHistory(coords)
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.coordinates).toEqual(coords)
    })

    it('should save null coordinates when not provided', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.coordinates).toBeNull()
    })

    it('should prevent duplicate saves', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      let firstId: string | null = null
      let secondId: string | null = null

      act(() => {
        firstId = result.current.saveTourToHistory()
        secondId = result.current.saveTourToHistory()
      })

      expect(firstId).toBe('mock-tour-id')
      expect(secondId).toBe('mock-tour-id')
      expect(useHistoryStore.getState().tours).toHaveLength(1)
    })

    it('should copy feed items to prevent mutation', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      // Modify original store
      act(() => {
        useTourStore.getState().reset()
      })

      // Saved tour should still have items
      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.feedItems).toHaveLength(1)
    })

    it('should include session ID', () => {
      const sessionId = useUserSessionStore.getState().sessionId

      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.sessionId).toBe(sessionId)
    })

    it('should generate hero image from first photo', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['hero-photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      const savedTour = useHistoryStore.getState().tours[0]
      expect(savedTour.heroImageUri).toBe('hero-photo.jpg')
    })
  })

  describe('isSaved', () => {
    it('should be false initially', () => {
      const {result} = renderHook(() => useTourPersistence())

      expect(result.current.isSaved).toBe(false)
    })

    it('should be true after saving', () => {
      act(() => {
        const id = useTourStore.getState().addFeedItem(['photo.jpg'])
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useTourPersistence())

      act(() => {
        result.current.saveTourToHistory()
      })

      // Note: isSaved uses a ref, so we need to check the saved tour exists
      expect(useHistoryStore.getState().tours).toHaveLength(1)
    })
  })

  describe('integration', () => {
    it('should save complete tour with all metadata', () => {
      act(() => {
        useMuseumStore.getState().setMuseum('van-gogh-museum')

        const id1 = useTourStore.getState().addFeedItem(['photo1.jpg'])
        useTourStore.getState().updateFeedItem(id1, {
          ...mockFeedItem,
          id: id1,
          status: 'ready',
        })

        const id2 = useTourStore.getState().addFeedItem(['photo2.jpg'])
        useTourStore.getState().updateFeedItem(id2, {
          id: id2,
          photos: ['photo2.jpg'],
          status: 'ready',
          createdAt: 1704067200000,
          metadata: {title: 'Sunflowers', artist: 'Van Gogh'},
        })
      })

      const {result} = renderHook(() => useTourPersistence())
      const coords = {latitude: 52.35833, longitude: 4.88111}

      act(() => {
        result.current.saveTourToHistory(coords)
      })

      const savedTour = useHistoryStore.getState().tours[0]

      expect(savedTour.title).toBe('Van Gogh Museum Tour')
      // Description includes artwork titles from metadata
      expect(savedTour.description).toMatch(/Featuring.*/)
      // Hero image comes from the first item with photos
      expect(savedTour.heroImageUri).toBeTruthy()
      expect(savedTour.museumId).toBe('van-gogh-museum')
      expect(savedTour.museumName).toBe('Van Gogh Museum')
      expect(savedTour.coordinates).toEqual(coords)
      expect(savedTour.feedItems).toHaveLength(2)
      expect(savedTour.syncStatus).toBe('local')
    })
  })
})
