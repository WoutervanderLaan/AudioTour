import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

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
 * MuseumState
 *
 * Global state for museum-related data including the currently selected museum
 * and its associated objects collection.
 */
type MuseumState = {
  /**
   * The ID of the currently selected museum
   */
  currentMuseumId?: string
  /**
   * Array of museum objects/artworks in the current museum
   */
  objects: ObjectItem[]
  /**
   * Set the current museum by ID
   */
  setMuseum: (id?: string) => void
  /**
   * Update the museum objects collection
   */
  setObjects: (objects: ObjectItem[]) => void
  /**
   * Reset museum state to initial values
   */
  reset: () => void
}

export const useMuseumStore = create<MuseumState>()(
  immer((set, _get) => ({
    currentMuseumId: undefined,
    objects: [],
    setMuseum: (id?: string): void =>
      set(state => {
        state.currentMuseumId = id
      }),
    reset: (): void =>
      set(state => {
        state.objects = []
        state.currentMuseumId = undefined
      }),
    setObjects: (objects: ObjectItem[]): void => {
      set(state => {
        state.objects = objects
      })
    },
  })),
)
