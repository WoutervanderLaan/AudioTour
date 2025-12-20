import {act, renderHook} from '@testing-library/react-native'
import * as Crypto from 'expo-crypto'

import type {FeedItemMetadata} from '../types'
import {
  useFeedItem,
  useFeedItemCount,
  useFeedItems,
  useFeedLoading,
  useHasActiveTour,
  useHasPendingItems,
  useTourActions,
} from './selectors'
import {useTourStore} from './useTourStore'

// Mock expo-crypto
jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-feed-item-id'),
}))

describe('tour selectors', () => {
  beforeEach(() => {
    // Reset store
    useTourStore.getState().reset()
    jest.clearAllMocks()
  })

  describe('useFeedItems', () => {
    it('should return empty array initially', () => {
      const {result} = renderHook(() => useFeedItems())

      expect(result.current).toEqual([])
    })

    it('should return feed items when added', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo1.jpg'])
      })

      const {result} = renderHook(() => useFeedItems())

      expect(result.current).toHaveLength(1)
      expect(result.current[0].photos).toEqual(['photo1.jpg'])
    })

    it('should update when items change', () => {
      const {result} = renderHook(() => useFeedItems())

      act(() => {
        useTourStore.getState().addFeedItem(['photo1.jpg'])
      })
      expect(result.current).toHaveLength(1)

      act(() => {
        useTourStore.getState().addFeedItem(['photo2.jpg'])
      })
      expect(result.current).toHaveLength(2)
    })
  })

  describe('useFeedLoading', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useFeedLoading())

      expect(result.current).toBe(false)
    })

    it('should return true when loading', () => {
      act(() => {
        useTourStore.getState().setFeedLoading(true)
      })

      const {result} = renderHook(() => useFeedLoading())

      expect(result.current).toBe(true)
    })

    it('should update when loading state changes', () => {
      const {result} = renderHook(() => useFeedLoading())

      act(() => {
        useTourStore.getState().setFeedLoading(true)
      })
      expect(result.current).toBe(true)

      act(() => {
        useTourStore.getState().setFeedLoading(false)
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useFeedItem', () => {
    it('should return undefined for non-existent item', () => {
      const {result} = renderHook(() => useFeedItem('non-existent'))

      expect(result.current).toBeUndefined()
    })

    it('should return feed item by ID', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      const {result} = renderHook(() => useFeedItem(id))

      expect(result.current).toBeDefined()
      expect(result.current?.id).toBe(id)
      expect(result.current?.photos).toEqual(['photo.jpg'])
    })

    it('should update when item changes', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      const {result} = renderHook(() => useFeedItem(id))
      expect(result.current?.status).toBe('uploading')

      act(() => {
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })
      expect(result.current?.status).toBe('ready')
    })

    it('should return undefined after item is removed via reset', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      const {result} = renderHook(() => useFeedItem(id))
      expect(result.current).toBeDefined()

      act(() => {
        useTourStore.getState().reset()
      })
      expect(result.current).toBeUndefined()
    })
  })

  describe('useHasActiveTour', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useHasActiveTour())

      expect(result.current).toBe(false)
    })

    it('should return true when feed has items', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo.jpg'])
      })

      const {result} = renderHook(() => useHasActiveTour())

      expect(result.current).toBe(true)
    })

    it('should return false after reset', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo.jpg'])
      })

      const {result} = renderHook(() => useHasActiveTour())
      expect(result.current).toBe(true)

      act(() => {
        useTourStore.getState().reset()
      })
      expect(result.current).toBe(false)
    })
  })

  describe('useFeedItemCount', () => {
    it('should return 0 initially', () => {
      const {result} = renderHook(() => useFeedItemCount())

      expect(result.current).toBe(0)
    })

    it('should return correct count', () => {
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      const {result} = renderHook(() => useFeedItemCount())

      act(() => {
        useTourStore.getState().addFeedItem(['photo1.jpg'])
      })
      expect(result.current).toBe(1)

      act(() => {
        useTourStore.getState().addFeedItem(['photo2.jpg'])
        useTourStore.getState().addFeedItem(['photo3.jpg'])
      })
      expect(result.current).toBe(3)
    })

    it('should return 0 after reset', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo.jpg'])
      })

      const {result} = renderHook(() => useFeedItemCount())
      expect(result.current).toBe(1)

      act(() => {
        useTourStore.getState().reset()
      })
      expect(result.current).toBe(0)
    })
  })

  describe('useHasPendingItems', () => {
    it('should return false initially', () => {
      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(false)
    })

    it('should return true when item is uploading', () => {
      act(() => {
        useTourStore.getState().addFeedItem(['photo.jpg'])
      })

      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(true)
    })

    it('should return true when item is processing', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      act(() => {
        useTourStore.getState().updateFeedItem(id, {status: 'processing'})
      })

      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(true)
    })

    it('should return false when all items are ready', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      act(() => {
        useTourStore.getState().updateFeedItem(id, {status: 'ready'})
      })

      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(false)
    })

    it('should return false when all items are errored', async () => {
      const id = await act(() =>
        useTourStore.getState().addFeedItem(['photo.jpg']),
      )

      act(() => {
        useTourStore.getState().updateFeedItem(id, {status: 'error'})
      })

      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(false)
    })

    it('should return true when at least one item is pending', async () => {
      let mockIdCounter = 0
      ;(Crypto.randomUUID as jest.Mock).mockImplementation(
        () => `id-${mockIdCounter++}`,
      )

      const id1 = await act(() =>
        useTourStore.getState().addFeedItem(['photo1.jpg']),
      )
      const id2 = await act(() =>
        useTourStore.getState().addFeedItem(['photo2.jpg']),
      )

      act(() => {
        useTourStore.getState().updateFeedItem(id1, {status: 'ready'})
        useTourStore.getState().updateFeedItem(id2, {status: 'processing'})
      })

      const {result} = renderHook(() => useHasPendingItems())

      expect(result.current).toBe(true)
    })
  })

  describe('useTourActions', () => {
    it('should return all action methods', () => {
      const {result} = renderHook(() => useTourActions())

      expect(result.current).toHaveProperty('addFeedItem')
      expect(result.current).toHaveProperty('updateFeedItem')
      expect(result.current).toHaveProperty('setFeedLoading')
      expect(result.current).toHaveProperty('reset')
    })

    it('should add feed item via action', async () => {
      const {result} = renderHook(() => useTourActions())

      const id = await act(() => result.current.addFeedItem(['photo.jpg']))

      const state = useTourStore.getState()
      expect(state.feedItems).toHaveLength(1)
      expect(state.feedItems[0].id).toBe(id)
    })

    it('should add feed item with metadata via action', () => {
      const {result} = renderHook(() => useTourActions())
      const metadata: FeedItemMetadata = {
        title: 'Test Artwork',
        artist: 'Test Artist',
      }

      act(() => {
        result.current.addFeedItem(['photo.jpg'], metadata)
      })

      const state = useTourStore.getState()
      expect(state.feedItems[0].metadata).toEqual(metadata)
    })

    it('should update feed item via action', async () => {
      const {result} = renderHook(() => useTourActions())

      const id = await act(() => result.current.addFeedItem(['photo.jpg']))

      act(() => {
        result.current.updateFeedItem(id, {
          status: 'ready',
          objectId: 'obj-123',
        })
      })

      const state = useTourStore.getState()
      expect(state.feedItems[0].status).toBe('ready')
      expect(state.feedItems[0].objectId).toBe('obj-123')
    })

    it('should set feed loading via action', () => {
      const {result} = renderHook(() => useTourActions())

      act(() => {
        result.current.setFeedLoading(true)
      })

      expect(useTourStore.getState().feedLoading).toBe(true)
    })

    it('should reset via action', () => {
      const {result} = renderHook(() => useTourActions())

      act(() => {
        result.current.addFeedItem(['photo.jpg'])
        result.current.setFeedLoading(true)
      })

      act(() => {
        result.current.reset()
      })

      const state = useTourStore.getState()
      expect(state.feedItems).toEqual([])
      expect(state.feedLoading).toBe(false)
    })

    it('should maintain stable reference', () => {
      const {result, rerender} = renderHook(() => useTourActions())

      const firstReference = result.current

      rerender(null)

      expect(result.current).toBe(firstReference)
    })
  })

  describe('integration tests', () => {
    it('should work together across selectors', async () => {
      const {result: itemsResult} = renderHook(() => useFeedItems())
      const {result: loadingResult} = renderHook(() => useFeedLoading())
      const {result: hasActiveResult} = renderHook(() => useHasActiveTour())
      const {result: countResult} = renderHook(() => useFeedItemCount())
      const {result: hasPendingResult} = renderHook(() => useHasPendingItems())
      const {result: actionsResult} = renderHook(() => useTourActions())

      // Initial state
      expect(itemsResult.current).toEqual([])
      expect(loadingResult.current).toBe(false)
      expect(hasActiveResult.current).toBe(false)
      expect(countResult.current).toBe(0)
      expect(hasPendingResult.current).toBe(false)

      // Add item
      const id = await act(() =>
        actionsResult.current.addFeedItem(['photo.jpg']),
      )

      expect(itemsResult.current).toHaveLength(1)
      expect(hasActiveResult.current).toBe(true)
      expect(countResult.current).toBe(1)
      expect(hasPendingResult.current).toBe(true)

      // Set loading
      act(() => {
        actionsResult.current.setFeedLoading(true)
      })
      expect(loadingResult.current).toBe(true)

      // Mark as ready
      act(() => {
        actionsResult.current.updateFeedItem(id, {status: 'ready'})
      })
      expect(hasPendingResult.current).toBe(false)

      // Reset
      act(() => {
        actionsResult.current.reset()
      })

      expect(itemsResult.current).toEqual([])
      expect(loadingResult.current).toBe(false)
      expect(hasActiveResult.current).toBe(false)
      expect(countResult.current).toBe(0)
    })
  })
})
