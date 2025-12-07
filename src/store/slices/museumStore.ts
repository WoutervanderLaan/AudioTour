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
   * currentMuseumId
   */
  currentMuseumId?: string
  /**
   * objects
   */
  objects: ObjectItem[]
  /**
   * setMuseum
   */
  setMuseum: (id?: string) => void
  /**
   * setObjects
   */
  setObjects: (objects: ObjectItem[]) => void
  /**
   * reset
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
