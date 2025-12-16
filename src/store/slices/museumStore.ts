import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import type {ObjectItem} from '@/shared/types/types'

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
