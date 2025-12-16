import {
  useGenerateAudio,
  useGenerateNarrative,
  useProcessArtwork,
} from '../api/useTourMutations'

import {useLogger} from '@/shared/hooks/useLogger'
import {type FeedItemMetadata, useTourStore} from '@/store/slices/tourStore'

/**
 * UsePhotoSubmitReturn
 * TODO: describe what this type represents.
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
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const usePhotoSubmit = (): {
  submit: (photos: string[], metadata?: FeedItemMetadata) => SubmitReturn
  isLoading: boolean
} => {
  const addFeedItem = useTourStore(state => state.addFeedItem)
  const updateFeedItem = useTourStore(state => state.updateFeedItem)
  const setFeedLoading = useTourStore(state => state.setFeedLoading)

  const logger = useLogger()

  const processArtwork = useProcessArtwork()
  const generateNarrative = useGenerateNarrative()
  const generateAudio = useGenerateAudio()

  /**
   * submit
   * TODO: describe what it does.
   *
   * @param {*} photos
   * @param {*} metadata
   * @returns {*} describe return value
   */
  const submit = async (
    photos: string[],
    metadata?: FeedItemMetadata,
  ): SubmitReturn => {
    try {
      setFeedLoading(true)

      //TODO: The main call should generate audio. This is prio. It should arrive streamed. The text can be transcribed after.

      const feedItemId = addFeedItem(photos, metadata)
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
