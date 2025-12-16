/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Crypto from 'expo-crypto'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

/**
 * FeedItemStatus
 * Status of a feed item in the tour
 */
export type FeedItemStatus =
  | 'uploading'
  | 'processing'
  | 'generating_narrative'
  | 'generating_audio'
  | 'ready'
  | 'error'

/**
 * FeedItemMetadata
 * Optional metadata for a tour object
 */
export type FeedItemMetadata = {
  /**
   * Object title
   */
  title?: string
  /**
   * Artist name
   */
  artist?: string
  /**
   * Year of creation
   */
  year?: string
  /**
   * Material/medium
   */
  material?: string
  /**
   * Description
   */
  description?: string
}

/**
 * FeedItem
 * Represents a single item in the tour feed
 */
export type FeedItem = {
  /**
   * Unique ID for this feed item
   */
  id: string
  /**
   * Array of photo URIs
   */
  photos: string[]
  /**
   * Optional metadata
   */
  metadata?: FeedItemMetadata
  /**
   * Current status of this item
   */
  status: FeedItemStatus
  /**
   * Object ID from recognition API
   */
  objectId?: string
  /**
   * Recognition confidence score (0-100)
   */
  recognitionConfidence?: number
  /**
   * Generated narrative text
   */
  narrativeText?: string
  /**
   * Generated audio URL
   */
  audioUrl?: string
  /**
   * Error message if status is 'error'
   */
  error?: string
  /**
   * Timestamp when item was created
   */
  createdAt: number
}

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
   * @deprecated URI of the last photo taken by the user during the tour, used for object recognition
   */
  lastPhotoUri?: string
  /**
   * @deprecated Unique identifier of the currently recognized museum object from the photo
   */
  currentObjectId?: string
  /**
   * @deprecated Confidence score (0-1) indicating the accuracy of the object recognition result
   */
  recognitionConfidence?: number
  /**
   * @deprecated Generated narrative text describing the museum object and its context
   */
  narrativeText?: string
  /**
   * @deprecated URL to the generated audio file containing the spoken narrative
   */
  audioUrl?: string
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
   * @deprecated Updates the URI of the last captured photo
   */
  setLastPhoto: (uri?: string) => void
  /**
   * @deprecated setLastPhotoData (legacy)
   */
  setLastPhotoData: (
    uri: string,
    objectId: string,
    recognitionConfidence: number,
  ) => void
  /**
   * @deprecated Updates the narrative text for the current tour object
   */
  setNarrativeText: (narrativeText: string) => void
  /**
   * @deprecated Updates the audio URL for the current narrative
   */
  setAudioUrl: (audioUrl: string) => void
  /**
   * Resets all tour state to initial values, clearing photo, object, narrative, and audio data
   */
  reset: () => void
}

export const useTourStore = create<TourState>()(
  immer((set, get) => ({
    feedItems: [],
    feedLoading: false,
    lastPhotoUri: undefined,
    currentObjectId: undefined,
    recognitionConfidence: undefined,
    narrativeText: undefined,
    audioUrl: undefined,

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

    setLastPhoto: uri =>
      set(state => {
        state.lastPhotoUri = uri
      }),

    reset: () =>
      set(state => {
        state.feedItems = []
        state.feedLoading = false
        state.lastPhotoUri = undefined
        state.currentObjectId = undefined
        state.recognitionConfidence = undefined
        state.narrativeText = undefined
        state.audioUrl = undefined
      }),

    setLastPhotoData: (
      uri: string,
      objectId: string,
      recognitionConfidence: number,
    ) => {
      set(state => {
        state.lastPhotoUri = uri
        state.currentObjectId = objectId
        state.recognitionConfidence = recognitionConfidence
      })
    },

    setNarrativeText: (narrativeText: string) => {
      set(state => {
        state.narrativeText = narrativeText
      })
    },

    setAudioUrl: (audioUrl: string) => {
      set(state => {
        state.audioUrl = audioUrl
      })
    },
  })),
)
