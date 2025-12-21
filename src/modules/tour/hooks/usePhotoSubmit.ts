import {useCallback, useRef} from 'react'

import {useProcessArtwork, useStreamAudio} from '../api/mutations'
import type {AudioChunk, FeedItemMetadata} from '../types'

import {logger} from '@/core/lib/logger/logger'
import {useTourActions} from '@/modules/tour/store/selectors'

/**
 * SubmitReturn
 * Represents the result of a photo submission operation using a tuple pattern for error handling.
 * Returns either a success tuple with the feed item ID or an error tuple with an error message.
 */
type SubmitReturn = Promise<
  | [
      {
        feedItemId: string
      },
      undefined,
    ]
  | [undefined, {error: string}]
>

/**
 * usePhotoSubmit
 * Hook that orchestrates the complete photo submission workflow for museum object recognition.
 * Manages the multi-step process of uploading photos, processing artwork recognition,
 * generating narratives, and creating audio content.
 *
 * @returns {object} Object containing submit function and loading state
 * @returns {Function} submit - Function to submit photos with optional metadata
 * @returns {boolean} isLoading - Combined loading state of all processing steps
 */
export const usePhotoSubmit = (): {
  submit: (photos: string[], metadata?: FeedItemMetadata) => SubmitReturn
  isLoading: boolean
} => {
  const {addFeedItem, updateFeedItem, setFeedLoading, getFeedItem} =
    useTourActions()

  const processArtwork = useProcessArtwork()

  // Use ref to track current feed item ID to avoid closure issues
  // This prevents race conditions when multiple submissions happen concurrently
  const currentFeedItemIdRef = useRef<string | undefined>(undefined)

  // Memoize callbacks to prevent unnecessary hook recreation
  const onChunk = useCallback(
    (chunk: AudioChunk) => {
      const currentId = currentFeedItemIdRef.current
      if (!currentId) return

      if (chunk.type === 'audio' && chunk.audioData) {
        // Accumulate audio chunks for progressive playback
        const currentItem = getFeedItem(currentId)
        if (currentItem) {
          updateFeedItem(currentId, {
            audioChunks: [...(currentItem.audioChunks || []), chunk.audioData],
          })
        }
      }
    },
    [getFeedItem, updateFeedItem],
  )

  const onProgress = useCallback(
    (progress: number) => {
      const currentId = currentFeedItemIdRef.current
      if (!currentId) return
      // Update streaming progress in real-time
      updateFeedItem(currentId, {
        audioStreamProgress: progress,
      })
    },
    [updateFeedItem],
  )

  const onNarrative = useCallback(
    (text: string) => {
      const currentId = currentFeedItemIdRef.current
      if (!currentId) return
      // Update narrative text when it arrives (may be during or after audio streaming)
      updateFeedItem(currentId, {
        narrativeText: text,
      })
    },
    [updateFeedItem],
  )

  const streamAudio = useStreamAudio({
    onChunk,
    onProgress,
    onNarrative,
  })

  /**
   * submit
   * Submits photos for processing through the complete tour generation pipeline.
   * Uses streaming audio generation to minimize latency - audio starts playing as soon as
   * chunks arrive, while narrative text is provided after or during the stream.
   * Updates feed item status at each step and manages error handling.
   *
   * @param {string[]} photos - Array of photo URIs to submit for processing
   * @param {FeedItemMetadata} [metadata] - Optional metadata to attach to the feed item
   * @returns {SubmitReturn} Promise resolving to tuple with either success (feedItemId) or error
   */
  const submit = async (
    photos: string[],
    metadata?: FeedItemMetadata,
  ): SubmitReturn => {
    let feedItemId: string | undefined

    try {
      setFeedLoading(true)

      feedItemId = addFeedItem(photos, metadata)
      currentFeedItemIdRef.current = feedItemId
      logger.debug('[TourPhotoSubmit] Created feed item:', feedItemId)

      // Step 1: Upload photos and process artwork
      updateFeedItem(feedItemId, {status: 'uploading'})
      const artworkResult = await processArtwork.mutateAsync({
        photos,
        metadata,
      })

      // Step 2: Update with recognition results and start streaming audio
      updateFeedItem(feedItemId, {
        status: 'streaming_audio',
        objectId: artworkResult.object_id,
        recognitionConfidence: artworkResult.recognition_confidence,
        audioStreamProgress: 0,
        audioChunks: [],
      })

      // Step 3: Stream audio with real-time updates
      // Audio is prioritized and streamed immediately to minimize latency
      // Narrative text arrives during or after streaming
      const streamResult = await streamAudio.mutateAsync({
        objectId: artworkResult.object_id,
        metadata,
      })

      // Step 4: Mark as ready when streaming completes
      updateFeedItem(feedItemId, {
        status: 'ready',
        audioUrl: streamResult.audioUrl,
        narrativeText: streamResult.narrativeText,
        audioStreamProgress: 100,
      })

      logger.debug('[TourPhotoSubmit] Submission complete')
      return [{feedItemId}, undefined]
    } catch (error) {
      logger.error('[TourPhotoSubmit] Submission error:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to process object'

      // Update feed item to error state if it was created
      if (feedItemId) {
        updateFeedItem(feedItemId, {
          status: 'error',
          error: errorMessage,
        })
      }

      return [undefined, {error: errorMessage}]
    } finally {
      currentFeedItemIdRef.current = undefined
      setFeedLoading(false)
    }
  }

  return {
    submit,
    isLoading: processArtwork.isPending || streamAudio.isPending,
  }
}
