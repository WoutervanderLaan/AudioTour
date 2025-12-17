import {useShallow} from 'zustand/shallow'

import type {FeedItem, FeedItemMetadata} from './useTourStore'
import {useTourStore} from './useTourStore'

// Value selectors
/**
 * useFeedItems
 * React hook that returns all feed items from the tour store.
 *
 * @returns Array of feed items
 */
export const useFeedItems = (): FeedItem[] =>
  useTourStore(useShallow(state => state.feedItems))

/**
 * useFeedLoading
 * React hook that returns the feed loading state from the tour store.
 *
 * @returns Boolean indicating if feed is currently loading
 */
export const useFeedLoading = (): boolean =>
  useTourStore(state => state.feedLoading)

/**
 * useFeedItem
 * React hook that returns a specific feed item by ID.
 *
 * @param id - Feed item ID to retrieve
 * @returns Feed item or undefined if not found
 */
export const useFeedItem = (id: string): FeedItem | undefined =>
  useTourStore(useShallow(state => state.getFeedItem(id)))

// Derived selectors
/**
 * useHasActiveTour
 * React hook that returns whether there are any feed items in the current tour.
 *
 * @returns Boolean indicating if tour has any items
 */
export const useHasActiveTour = (): boolean =>
  useTourStore(state => state.feedItems.length > 0)

/**
 * useFeedItemCount
 * React hook that returns the total number of feed items.
 *
 * @returns Number of feed items
 */
export const useFeedItemCount = (): number =>
  useTourStore(state => state.feedItems.length)

/**
 * useHasPendingItems
 * React hook that returns whether there are any items currently processing.
 *
 * @returns Boolean indicating if any items are not ready or errored
 */
export const useHasPendingItems = (): boolean =>
  useTourStore(state =>
    state.feedItems.some(item => !['ready', 'error'].includes(item.status)),
  )

// Action selectors
/**
 * useTourActions
 * React hook that returns all tour-related actions for managing tour state.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing addFeedItem, updateFeedItem, setFeedLoading, and reset action functions
 */
export const useTourActions = (): {
  addFeedItem: (photos: string[], metadata?: FeedItemMetadata) => string
  updateFeedItem: (id: string, updates: Partial<FeedItem>) => void
  setFeedLoading: (loading: boolean) => void
  reset: () => void
} =>
  useTourStore(
    useShallow(state => ({
      addFeedItem: state.addFeedItem,
      updateFeedItem: state.updateFeedItem,
      setFeedLoading: state.setFeedLoading,
      reset: state.reset,
    })),
  )
