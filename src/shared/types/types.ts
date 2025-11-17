/**
 * ObjectItem
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
 */
export type GenerateNarrativeResponse = {
  /**
   * narrative_text
   */
  narrativeText: string
}

/**
 * GenerateAudioResponse
 * TODO: describe what this type represents.
 */
export type GenerateAudioResponse = {
  /**
   * audio_url
   */
  audioUrl: string
}
