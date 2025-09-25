// Shared app types aligned with handbook data model & API

export type ObjectItem = {
  id: string;
  name: string;
  artist?: string;
  date?: string;
  museum_id?: string;
  image_url?: string;
  generated_text?: string;
  generated_audio?: string;
  metadata?: Record<string, unknown>;
};

export type UserSequence = {
  id: string;
  user_session_id: string;
  object_ids: string[];
  created_at?: string;
};

export type Museum = {
  id: string;
  name: string;
  location?: string;
  is_licensed?: boolean;
  license_tier?: string;
};

export type UploadPhotoResponse = {
  object_id: string;
  recognition_confidence: number;
};

export type GenerateNarrativeResponse = {
  narrative_text: string;
};

export type GenerateAudioResponse = {
  audio_url: string;
};
