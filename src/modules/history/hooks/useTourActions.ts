import {useCallback} from 'react'
import {Alert} from 'react-native'

import {HistoryTabName} from '../routes.types'
import {useHistoryActions} from '../store/selectors'
import type {TourUpdateParams} from '../types'

import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * UseTourActionsResult
 * Return type for the useTourActions hook.
 */
export type UseTourActionsResult = {
  /**
   * Updates a tour with new metadata
   */
  updateTour: (id: string, updates: TourUpdateParams) => void
  /**
   * Deletes a tour with confirmation dialog
   */
  deleteTour: (id: string) => void
}

/**
 * useTourActions
 * Hook for performing actions on saved tours.
 * Provides update and delete functionality with confirmation dialogs.
 *
 * @returns Tour action functions
 *
 * @example
 * ```tsx
 * const { updateTour, deleteTour } = useTourActions()
 *
 * // Update tour title
 * updateTour('tour-123', { title: 'My Updated Tour' })
 *
 * // Delete with confirmation
 * deleteTour('tour-123')
 * ```
 */
export function useTourActions(): UseTourActionsResult {
  const actions = useHistoryActions()
  const {navigate, canGoBack, goBack} = useNavigation()

  /**
   * updateTour
   * Updates a tour with the provided metadata changes.
   *
   * @param id - Tour ID to update
   * @param updates - Partial tour updates
   */
  const updateTour = useCallback(
    (id: string, updates: TourUpdateParams): void => {
      actions.updateTour(id, updates)
    },
    [actions],
  )

  /**
   * deleteTourDirect
   * Deletes a tour without showing a confirmation dialog.
   *
   * @param id - Tour ID to delete
   */
  const deleteTourDirect = useCallback(
    (id: string): void => {
      actions.deleteTour(id)

      // Navigate back to history list if we can go back
      if (canGoBack()) {
        goBack()
      } else {
        navigate(HistoryTabName.history)
      }
    },
    [actions, canGoBack, goBack, navigate],
  )

  /**
   * deleteTour
   * Shows a confirmation dialog before deleting a tour.
   *
   * @param id - Tour ID to delete
   */
  const deleteTour = useCallback(
    (id: string): void => {
      Alert.alert(
        'Delete Tour',
        'Are you sure you want to delete this tour? This cannot be undone.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: (): void => deleteTourDirect(id),
          },
        ],
      )
    },
    [deleteTourDirect],
  )

  return {
    updateTour,
    deleteTour,
  }
}
