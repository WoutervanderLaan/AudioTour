import type {FeedItemMetadata} from '../types'

/**
 * ProcessArtworkParams
 * Parameters for processing artwork photos
 */
export type ProcessArtworkParams = {
  /**
   * Array of photo URIs to upload
   */
  photos: string[]
  /**
   * Optional metadata about the object
   */
  metadata?: FeedItemMetadata
}

/**
 * GenerateNarrativeParams
 * Parameters for generating narrative text
 */
export type GenerateNarrativeParams = {
  /**
   * Object ID from recognition
   */
  objectId: string
  /**
   * Optional context or user preferences
   */
  context?: string
}

/**
 * GenerateAudioParams
 * Parameters for generating audio
 */
export type GenerateAudioParams = {
  /**
   * Narrative text to convert to audio
   */
  text: string
  /**
   * Optional voice/style preferences
   */
  voice?: string
}

/**
 * Centralized API response type definitions.
 *
 * This file contains all API endpoint response types to ensure type safety
 * and consistency across the application when making API calls.
 */

/**
 * Response from POST /process-artwork endpoint.
 * Returns the identified object ID and recognition confidence score.
 */
export type ProcessArtworkResponse = {
  /**
   * Unique identifier for the recognized museum object
   */
  object_id: string
  /**
   * Confidence score of the object recognition (0-100)
   */
  recognition_confidence: number
}

/**
 * Response from POST /generate-narrative endpoint.
 * Returns the AI-generated narrative text for a museum object.
 */
export type GenerateNarrativeResponse = {
  /**
   * Generated narrative text describing the museum object
   */
  text: string
}

/**
 * Response from POST /generate-audio endpoint.
 * Returns the URL to the generated audio file.
 */
export type GenerateAudioResponse = {
  /**
   * URL to the generated audio file (MP3)
   */
  audio_url: string
}
