import {useShallow} from 'zustand/shallow'

import {useMuseumStore} from './museumStore'

import type {ObjectItem} from '@/shared/types/types'

/**
 * useCurrentMuseumId
 * Selector hook for getting the current museum ID.
 *
 * @returns The ID of the currently selected museum, or undefined if none is selected
 */
export const useCurrentMuseumId = (): string | undefined =>
  useMuseumStore(state => state.currentMuseumId)

/**
 * useMuseumObjects
 * Selector hook for getting the museum objects collection.
 *
 * @returns Array of museum objects for the current museum
 */
export const useMuseumObjects = (): ObjectItem[] =>
  useMuseumStore(useShallow(state => state.objects))

/**
 * useMuseumActions
 * Selector hook for getting museum store actions.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing museum store action methods
 */
export const useMuseumActions = (): {
  setMuseum: (id?: string) => void
  setObjects: (objects: ObjectItem[]) => void
  reset: () => void
} =>
  useMuseumStore(
    useShallow(state => ({
      setMuseum: state.setMuseum,
      setObjects: state.setObjects,
      reset: state.reset,
    })),
  )
