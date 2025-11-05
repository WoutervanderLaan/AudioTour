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
   * museum_id
   */
  museum_id?: string
  /**
   * image_url
   */
  image_url?: string
  /**
   * generated_text
   */
  generated_text?: string
  /**
   * generated_audio
   */
  generated_audio?: string
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
  user_session_id: string
  /**
   * object_ids
   */
  object_ids: string[]
  /**
   * created_at
   */
  created_at?: string
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
  is_licensed?: boolean
  /**
   * license_tier
   */
  license_tier?: string
}

/**
 * UploadPhotoResponse
 * TODO: describe what this type represents.
 */
export type UploadPhotoResponse = {
  /**
   * object_id
   */
  object_id: string
  /**
   * recognition_confidence
   */
  recognition_confidence: number
}

/**
 * GenerateNarrativeResponse
 * TODO: describe what this type represents.
 */
export type GenerateNarrativeResponse = {
  /**
   * narrative_text
   */
  narrative_text: string
}

/**
 * GenerateAudioResponse
 * TODO: describe what this type represents.
 */
export type GenerateAudioResponse = {
  /**
   * audio_url
   */
  audio_url: string
}
