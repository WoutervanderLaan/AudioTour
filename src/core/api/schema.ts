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

/**
 * Individual recommendation item from GET /recommendations endpoint.
 */
export type RecommendationItem = {
  /**
   * ID of the recommended museum object
   */
  object_id: string
  /**
   * Recommendation score (optional, higher is better)
   */
  score?: number
}

/**
 * Response from GET /recommendations endpoint.
 * Returns a list of personalized museum object recommendations.
 */
export type RecommendationsResponse = RecommendationItem[]

/**
 * Individual museum object from GET /museum-objects/:id endpoint.
 */
export type MuseumObject = {
  /**
   * Unique identifier for the museum object
   */
  id: string
  /**
   * Name or title of the object
   */
  name: string
  /**
   * Artist or creator (optional)
   */
  artist?: string
  /**
   * Date or period of creation (optional)
   */
  date?: string
  /**
   * URL to object image (optional)
   */
  image_url?: string
  /**
   * Generated narrative text (optional)
   */
  generated_text?: string
  /**
   * Generated audio URL (optional)
   */
  generated_audio?: string
  /**
   * Additional metadata (optional)
   */
  metadata?: Record<string, unknown>
}

/**
 * Response from GET /museum-objects/:id endpoint.
 * Returns a list of museum objects for a specific museum.
 */
export type MuseumObjectsResponse = MuseumObject[]
