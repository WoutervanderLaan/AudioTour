import {act, renderHook, waitFor} from '@testing-library/react-native'

import {useHistoryStore} from '../store/useHistoryStore'
import type {CreatePersistedTourParams} from '../types'

import {useTourSync} from './useTourSync'

import type {FeedItem} from '@/modules/tour/types'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid-123'),
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
    warn: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock the API mutation
const mockSaveToCloud = jest.fn()
jest.mock('../api/mutations', () => ({
  useSaveTourToCloud: () => ({
    mutateAsync: mockSaveToCloud,
    isPending: false,
  }),
}))

// Mock AppState
jest.mock('react-native', () => ({
  AppState: {
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}))

describe('useTourSync', () => {
  const mockFeedItem: FeedItem = {
    id: 'feed-item-1',
    photos: ['photo1.jpg'],
    status: 'ready',
    createdAt: 1704067200000,
    metadata: {title: 'Test Artwork'},
  }

  const mockTourParams: CreatePersistedTourParams = {
    title: 'Test Tour',
    description: 'A test tour',
    heroImageUri: 'hero.jpg',
    museumId: 'museum-123',
    museumName: 'Test Museum',
    coordinates: null,
    feedItems: [mockFeedItem],
    userId: null,
    sessionId: 'session-123',
  }

  beforeEach(() => {
    useHistoryStore.getState().reset()
    mockSaveToCloud.mockReset()
    mockSaveToCloud.mockResolvedValue({tour: {}, message: 'Success'})
    jest.clearAllMocks()
  })

  describe('pendingCount', () => {
    it('should return 0 when no tours', () => {
      const {result} = renderHook(() => useTourSync())

      expect(result.current.pendingCount).toBe(0)
    })

    it('should count local tours', () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      expect(result.current.pendingCount).toBe(1)
    })

    it('should count error tours', () => {
      act(() => {
        const id = useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore.getState().updateTour(id, {syncStatus: 'error'})
      })

      const {result} = renderHook(() => useTourSync())

      expect(result.current.pendingCount).toBe(1)
    })

    it('should not count synced tours', () => {
      act(() => {
        const id = useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore.getState().updateTour(id, {syncStatus: 'synced'})
      })

      const {result} = renderHook(() => useTourSync())

      expect(result.current.pendingCount).toBe(0)
    })
  })

  describe('syncTour', () => {
    it('should sync a local tour successfully', async () => {
      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      let success: boolean = false
      await act(async () => {
        success = await result.current.syncTour('mock-uuid-123')
      })

      expect(success).toBe(true)
      expect(mockSaveToCloud).toHaveBeenCalled()

      const tour = useHistoryStore.getState().getTour('mock-uuid-123')
      expect(tour?.syncStatus).toBe('synced')
    })

    it('should return false for non-existent tour', async () => {
      const {result} = renderHook(() => useTourSync())

      let success: boolean = true
      await act(async () => {
        success = await result.current.syncTour('non-existent')
      })

      expect(success).toBe(false)
      expect(mockSaveToCloud).not.toHaveBeenCalled()
    })

    it('should skip already synced tours', async () => {
      act(() => {
        const id = useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore.getState().updateTour(id, {syncStatus: 'synced'})
      })

      const {result} = renderHook(() => useTourSync())

      let success: boolean = false
      await act(async () => {
        success = await result.current.syncTour('mock-uuid-123')
      })

      expect(success).toBe(true)
      expect(mockSaveToCloud).not.toHaveBeenCalled()
    })

    it('should handle sync failure', async () => {
      mockSaveToCloud.mockRejectedValueOnce(new Error('Network error'))

      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      let success: boolean = true
      await act(async () => {
        success = await result.current.syncTour('mock-uuid-123')
      })

      expect(success).toBe(false)

      const tour = useHistoryStore.getState().getTour('mock-uuid-123')
      expect(tour?.syncStatus).toBe('error')
    })

    it('should set syncing status during sync', async () => {
      let syncingStatus: string | undefined

      mockSaveToCloud.mockImplementationOnce(async () => {
        // Check status during the sync
        syncingStatus = useHistoryStore
          .getState()
          .getTour('mock-uuid-123')?.syncStatus
        return {tour: {}, message: 'Success'}
      })

      act(() => {
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      await act(async () => {
        await result.current.syncTour('mock-uuid-123')
      })

      expect(syncingStatus).toBe('syncing')
    })
  })

  describe('syncAllTours', () => {
    it('should sync all local tours', async () => {
      const Crypto = require('expo-crypto')

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-1')
        useHistoryStore.getState().saveTour(mockTourParams)
        Crypto.randomUUID.mockReturnValueOnce('tour-2')
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      await act(async () => {
        await result.current.syncAllTours()
      })

      expect(mockSaveToCloud).toHaveBeenCalledTimes(2)

      const tours = useHistoryStore.getState().tours
      expect(tours.every(t => t.syncStatus === 'synced')).toBe(true)
    })

    it('should skip already synced tours', async () => {
      const Crypto = require('expo-crypto')

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-1')
        useHistoryStore.getState().saveTour(mockTourParams)
        useHistoryStore.getState().updateTour('tour-1', {syncStatus: 'synced'})

        Crypto.randomUUID.mockReturnValueOnce('tour-2')
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      await act(async () => {
        await result.current.syncAllTours()
      })

      // Only one tour should be synced (tour-2)
      expect(mockSaveToCloud).toHaveBeenCalledTimes(1)
    })

    it('should do nothing when no tours to sync', async () => {
      const {result} = renderHook(() => useTourSync())

      await act(async () => {
        await result.current.syncAllTours()
      })

      expect(mockSaveToCloud).not.toHaveBeenCalled()
    })

    it('should continue syncing after individual failures', async () => {
      const Crypto = require('expo-crypto')

      // First call fails, second succeeds
      // Tours are prepended so tour-2 (saved second) will be synced first
      mockSaveToCloud
        .mockRejectedValueOnce(new Error('First failed'))
        .mockResolvedValueOnce({tour: {}, message: 'Success'})

      act(() => {
        Crypto.randomUUID.mockReturnValueOnce('tour-1')
        useHistoryStore.getState().saveTour(mockTourParams)
        Crypto.randomUUID.mockReturnValueOnce('tour-2')
        useHistoryStore.getState().saveTour(mockTourParams)
      })

      const {result} = renderHook(() => useTourSync())

      await act(async () => {
        await result.current.syncAllTours()
      })

      expect(mockSaveToCloud).toHaveBeenCalledTimes(2)

      const tour1 = useHistoryStore.getState().getTour('tour-1')
      const tour2 = useHistoryStore.getState().getTour('tour-2')

      // tour-2 is first in array (prepended), so it fails first
      // tour-1 is second, so it succeeds
      expect(tour2?.syncStatus).toBe('error')
      expect(tour1?.syncStatus).toBe('synced')
    })
  })

  describe('isSyncing', () => {
    it('should be false initially', () => {
      const {result} = renderHook(() => useTourSync())

      expect(result.current.isSyncing).toBe(false)
    })
  })
})
