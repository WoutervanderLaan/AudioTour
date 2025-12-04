/**
 * ObjectItem
 * Represents a museum object with metadata including name, artist, date, and generated content such as narrative text and audio.
 */
export type ObjectItem = {
  /**
   * id
   */
  id: string
  /**
   * name
   */
  name: string
  /**
   * artist
   */
  artist?: string
  /**
   * date
   */
  date?: string
  /**
   * museumIdd
   */
  museumIdd?: string
  /**
   * image_url
   */
  imageUrl?: string
  /**
   * generated_text
   */
  generatedText?: string
  /**
   * generated_audio
   */
  generatedAudio?: string
  /**
   * metadata
   */
  metadata?: Record<string, unknown>
}

/**
 * UserSequence
 * Represents a user's tour sequence tracking which museum objects they have visited in order during a session.
 */
export type UserSequence = {
  /**
   * id
   */
  id: string
  /**
   * user_session_id
   */
  userSessionId: string
  /**
   * object_ids
   */
  objectIds: string[]
  /**
   * created_at
   */
  createdAt?: string
}

/**
 * Museum
 * Represents a museum with basic information and licensing details for the audio tour platform.
 */
export type Museum = {
  /**
   * id
   */
  id: string
  /**
   * name
   */
  name: string
  /**
   * location
   */
  location?: string
  /**
   * is_licensed
   */
  isLicensed?: boolean
  /**
   * license_tier
   */
  licenseTier?: string
}

/**
 * UploadPhotoResponse
 * API response containing the identified museum object ID and recognition confidence score after photo upload.
 */
export type UploadPhotoResponse = {
  /**
   * object_id
   */
  objectId: string
  /**
   * recognition_confidence
   */
  recognitionConfidence: number
}

/**
 * GenerateNarrativeResponse
 * API response containing the AI-generated narrative text for a museum object.
 */
export type GenerateNarrativeResponse = {
  /**
   * narrative_text
   */
  narrativeText: string
}

/**
 * GenerateAudioResponse
 * API response containing the URL to the generated audio file for the narrative.
 */
export type GenerateAudioResponse = {
  /**
   * audio_url
   */
  audioUrl: string
}
