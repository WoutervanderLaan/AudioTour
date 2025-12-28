import {useMutation, type UseMutationResult} from '@tanstack/react-query'

import type {
  GenerateAudioParams,
  GenerateAudioResponse,
  GenerateNarrativeParams,
  GenerateNarrativeResponse,
  ProcessArtworkParams,
  ProcessArtworkResponse,
} from './mutations.types'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger/logger'

/**
 * useProcessArtwork
 * Mutation hook for uploading photos and processing artwork recognition.
 * Converts photo URIs to FormData and sends to /process-artwork endpoint.
 *
 * @returns Mutation object with mutate function and state
 */
export function useProcessArtwork(): UseMutationResult<
  ProcessArtworkResponse,
  Error,
  ProcessArtworkParams
> {
  return useMutation({
    mutationFn: async (params: ProcessArtworkParams) => {
      logger.debug('[TourAPI] Processing artwork:', {
        photoCount: params.photos.length,
      })

      const formData = new FormData()

      // Convert photos to blobs and append to form data
      for (let i = 0; i < params.photos.length; i++) {
        const photoUri = params.photos[i]
        const photoBlob = await fetch(photoUri).then(res => res.blob())
        formData.append('photos', photoBlob, `photo-${i}.jpg`)
      }

      // Append metadata if provided
      if (params.metadata) {
        formData.append('metadata', JSON.stringify(params.metadata))
      }

      const response = await apiClient.post<ProcessArtworkResponse>(
        '/process-artwork',
        formData,
      )

      logger.debug('[TourAPI] Artwork processed:', response.data)
      return response.data
    },
    onError: error => {
      logger.error('[TourAPI] Error processing artwork:', error)
    },
  })
}

/**
 * useGenerateNarrative
 * Mutation hook for generating narrative text for an object.
 * Calls /generate-narrative endpoint with object ID.
 *
 * @returns Mutation object with mutate function and state
 */
export function useGenerateNarrative(): UseMutationResult<
  GenerateNarrativeResponse,
  Error,
  GenerateNarrativeParams
> {
  return useMutation({
    mutationFn: async (params: GenerateNarrativeParams) => {
      logger.debug('[TourAPI] Generating narrative:', params.objectId)

      const response = await apiClient.post<GenerateNarrativeResponse>(
        '/generate-narrative',
        {
          object_id: params.objectId,
          context: params.context,
        },
      )

      logger.debug('[TourAPI] Narrative generated')
      return response.data
    },
    onError: error => {
      logger.error('[TourAPI] Error generating narrative:', error)
    },
  })
}

/**
 * useGenerateAudio
 * Mutation hook for generating audio from narrative text.
 * Calls /generate-audio endpoint with text content.
 *
 * @returns Mutation object with mutate function and state
 */
export function useGenerateAudio(): UseMutationResult<
  GenerateAudioResponse,
  Error,
  GenerateAudioParams
> {
  return useMutation({
    mutationFn: async (params: GenerateAudioParams) => {
      logger.debug('[TourAPI] Generating audio from narrative')

      const response = await apiClient.post<GenerateAudioResponse>(
        '/generate-audio',
        {
          text: params.text,
          voice: params.voice,
        },
      )

      logger.debug('[TourAPI] Audio generated:', response.data.audio_url)
      return response.data
    },
    onError: error => {
      logger.error('[TourAPI] Error generating audio:', error)
    },
  })
}
