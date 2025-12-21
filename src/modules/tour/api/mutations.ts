import {useMutation, type UseMutationResult} from '@tanstack/react-query'
import {useRef, useCallback} from 'react'

import type {
  AudioChunk,
  GenerateAudioParams,
  GenerateAudioResponse,
  GenerateNarrativeParams,
  GenerateNarrativeResponse,
  ProcessArtworkParams,
  ProcessArtworkResponse,
  StreamAudioParams,
} from '../types'

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

/**
 * StreamAudioResult
 * Result object returned by useStreamAudio mutation
 */
export type StreamAudioResult = {
  /**
   * Final audio URL (available after streaming completes)
   */
  audioUrl?: string
  /**
   * Narrative text (available after generation or during streaming)
   */
  narrativeText?: string
  /**
   * Total audio duration in seconds
   */
  duration?: number
}

/**
 * StreamAudioOptions
 * Configuration options for audio streaming
 */
export type StreamAudioOptions = {
  /**
   * Callback invoked for each audio chunk received
   */
  onChunk?: (chunk: AudioChunk) => void
  /**
   * Callback invoked when audio metadata is received
   */
  onMetadata?: (format: string, duration?: number) => void
  /**
   * Callback invoked when narrative text is received
   */
  onNarrative?: (text: string) => void
  /**
   * Callback invoked with streaming progress (0-100)
   */
  onProgress?: (progress: number) => void
}

/**
 * useStreamAudio
 * Hook for streaming audio generation directly from object ID.
 * Streams audio chunks in real-time as they are generated, minimizing latency.
 * Narrative text is provided after audio streaming completes.
 *
 * @param options - Streaming callbacks for handling chunks, metadata, and progress
 * @returns Mutation object with streaming mutation function
 */
export function useStreamAudio(
  options?: StreamAudioOptions,
): UseMutationResult<StreamAudioResult, Error, StreamAudioParams> {
  const audioChunksRef = useRef<string[]>([])
  const resultRef = useRef<StreamAudioResult>({})

  const handleChunk = useCallback(
    (chunk: AudioChunk): void => {
      logger.debug('[TourAPI] Received audio chunk:', chunk.type)

      // Invoke user's onChunk callback
      if (options?.onChunk) {
        options.onChunk(chunk)
      }

      // Handle different chunk types
      switch (chunk.type) {
        case 'metadata':
          if (chunk.format && options?.onMetadata) {
            options.onMetadata(chunk.format, chunk.duration)
          }
          break

        case 'audio':
          if (chunk.audioData) {
            audioChunksRef.current.push(chunk.audioData)
            // Calculate approximate progress if sequence is available
            if (chunk.sequence !== undefined && options?.onProgress) {
              // This is a rough estimate - backend should provide better progress
              const progress = Math.min(chunk.sequence * 5, 95)
              options.onProgress(progress)
            }
          }
          break

        case 'narrative':
          if (chunk.narrativeText) {
            resultRef.current.narrativeText = chunk.narrativeText
            if (options?.onNarrative) {
              options.onNarrative(chunk.narrativeText)
            }
          }
          break

        case 'complete':
          if (chunk.audioUrl) {
            resultRef.current.audioUrl = chunk.audioUrl
          }
          if (chunk.duration !== undefined) {
            resultRef.current.duration = chunk.duration
          }
          if (options?.onProgress) {
            options.onProgress(100)
          }
          break
      }
    },
    [options],
  )

  return useMutation({
    mutationFn: async (params: StreamAudioParams) => {
      // Reset state for new request
      audioChunksRef.current = []
      resultRef.current = {}

      logger.debug('[TourAPI] Starting audio stream for object:', params.objectId)

      await apiClient.streamPost<AudioChunk>(
        '/stream-audio',
        {
          object_id: params.objectId,
          voice: params.voice,
          metadata: params.metadata,
        },
        handleChunk,
      )

      logger.debug('[TourAPI] Audio stream complete')
      return resultRef.current
    },
    onError: error => {
      logger.error('[TourAPI] Error streaming audio:', error)
    },
  })
}
