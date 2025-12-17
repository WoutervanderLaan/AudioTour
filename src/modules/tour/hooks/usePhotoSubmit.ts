import {
  useGenerateAudio,
  useGenerateNarrative,
  useProcessArtwork,
} from '../api/mutations'
import type {FeedItemMetadata} from '../types'

import {logger} from '@/core/lib/logger'
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
  const {addFeedItem, updateFeedItem, setFeedLoading} = useTourActions()

  const processArtwork = useProcessArtwork()
  const generateNarrative = useGenerateNarrative()
  const generateAudio = useGenerateAudio()

  /**
   * submit
   * Submits photos for processing through the complete tour generation pipeline.
   * Handles artwork recognition, narrative generation, and audio creation in sequence.
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

      //TODO: The main call should generate audio. This is prio. It should arrive streamed. The text can be transcribed after.

      feedItemId = addFeedItem(photos, metadata)
      logger.debug('[TourPhotoSubmit] Created feed item:', feedItemId)

      // Step 1: Upload photos and process artwork
      updateFeedItem(feedItemId, {status: 'uploading'})
      const artworkResult = await processArtwork.mutateAsync({
        photos,
        metadata,
      })

      // Step 2: Update with recognition results
      updateFeedItem(feedItemId, {
        status: 'generating_narrative',
        objectId: artworkResult.object_id,
        recognitionConfidence: artworkResult.recognition_confidence,
      })

      // Step 3: Generate narrative
      const narrativeResult = await generateNarrative.mutateAsync({
        objectId: artworkResult.object_id,
      })

      updateFeedItem(feedItemId, {
        status: 'generating_audio',
        narrativeText: narrativeResult.text,
      })

      // Step 4: Generate audio
      const audioResult = await generateAudio.mutateAsync({
        text: narrativeResult.text,
      })

      // Step 5: Mark as ready
      updateFeedItem(feedItemId, {
        status: 'ready',
        audioUrl: audioResult.audio_url,
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
      setFeedLoading(false)
    }
  }

  return {
    submit,
    isLoading:
      processArtwork.isPending ||
      generateNarrative.isPending ||
      generateAudio.isPending,
  }
}
