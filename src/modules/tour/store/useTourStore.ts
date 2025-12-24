import * as Crypto from 'expo-crypto'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import type {FeedItem, FeedItemMetadata} from '../types'

import {datetime} from '@/core/lib/datetime'

/**
 * TourState
 * Represents the state for managing an active audio tour session, including photo capture, object recognition, narrative generation, and audio playback.
 */
type TourState = {
  /**
   * Array of feed items in the current tour
   */
  feedItems: FeedItem[]
  /**
   * Whether the feed is currently processing (prevents new submissions)
   */
  feedLoading: boolean
  /**
   * Adds a new feed item with the provided photos and metadata. Returns the generated feed item ID
   */
  addFeedItem: (photos: string[], metadata?: FeedItemMetadata) => string
  /**
   * Updates an existing feed item with partial updates (e.g., status, narrative, audio URL)
   */
  updateFeedItem: (id: string, updates: Partial<FeedItem>) => void
  /**
   * Sets the feed loading state to prevent concurrent submissions while processing
   */
  setFeedLoading: (loading: boolean) => void
  /**
   * Retrieves a feed item by its ID, or undefined if not found
   */
  getFeedItem: (id: string) => FeedItem | undefined
  /**
   * Resets all tour state to initial values
   */
  reset: () => void
}

export const useTourStore = create<TourState>()(
  immer((set, get) => ({
    feedItems: [],
    feedLoading: false,

    addFeedItem: (photos: string[], metadata?: FeedItemMetadata): string => {
      const id = Crypto.randomUUID()
      set(state => {
        state.feedItems.push({
          id,
          photos,
          metadata,
          status: 'uploading',
          createdAt: datetime.timestamp(),
        })
      })
      return id
    },

    updateFeedItem: (id: string, updates: Partial<FeedItem>): void => {
      set(state => {
        const item = state.feedItems.find(i => i.id === id)
        if (item) {
          Object.assign(item, updates)
        }
      })
    },

    setFeedLoading: (loading: boolean): void => {
      set(state => {
        state.feedLoading = loading
      })
    },

    getFeedItem: (id: string): FeedItem | undefined => {
      return get().feedItems.find(i => i.id === id)
    },

    reset: (): void =>
      set(state => {
        state.feedItems = []
        state.feedLoading = false
      }),
  })),
)
