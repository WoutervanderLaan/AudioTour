import * as Crypto from 'expo-crypto'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import type {FeedItem, FeedItemMetadata} from '../types'

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
   * addFeedItem - Add a new feed item
   */
  addFeedItem: (photos: string[], metadata?: FeedItemMetadata) => string
  /**
   * updateFeedItem - Update an existing feed item
   */
  updateFeedItem: (id: string, updates: Partial<FeedItem>) => void
  /**
   * setFeedLoading - Set the feed loading state
   */
  setFeedLoading: (loading: boolean) => void
  /**
   * getFeedItem - Get a feed item by ID
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
          createdAt: Date.now(),
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
