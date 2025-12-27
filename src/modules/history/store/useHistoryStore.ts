import * as Crypto from 'expo-crypto'

import type {
  CreatePersistedTourParams,
  HistoryState,
  PersistedTour,
} from '../types'

import {datetime} from '@/core/lib/datetime'
import {createModuleStore} from '@/store/createStore'

const initialState = {
  tours: [] as PersistedTour[],
  isLoading: false,
}

/**
 * Zustand store for tour history state management.
 *
 * Manages persisted tours including saving, updating, and deleting tours.
 * Persists to AsyncStorage to maintain tour history across app restarts.
 *
 * @returns History store hook with state and actions
 */
export const useHistoryStore = createModuleStore<HistoryState>(
  (set, get) => ({
    ...initialState,

    saveTour: (params: CreatePersistedTourParams): string => {
      const id = Crypto.randomUUID()
      const now = datetime.timestamp()

      const newTour: PersistedTour = {
        ...params,
        id,
        createdAt: now,
        updatedAt: now,
        isShared: false,
        isOfficial: false,
        communityRating: 0,
        ratingCount: 0,
        syncStatus: 'local',
      }

      set(state => ({
        tours: [newTour, ...state.tours],
      }))

      return id
    },

    updateTour: (id: string, updates: Partial<PersistedTour>): void => {
      set(state => ({
        tours: state.tours.map(tour =>
          tour.id === id
            ? {...tour, ...updates, updatedAt: datetime.timestamp()}
            : tour,
        ),
      }))
    },

    deleteTour: (id: string): void => {
      set(state => ({
        tours: state.tours.filter(tour => tour.id !== id),
      }))
    },

    getTour: (id: string): PersistedTour | undefined => {
      return get().tours.find(tour => tour.id === id)
    },

    getTours: (): PersistedTour[] => {
      return [...get().tours].sort((a, b) => b.createdAt - a.createdAt)
    },

    setLoading: (loading: boolean): void => {
      set({isLoading: loading})
    },

    reset: (): void => {
      set(initialState)
    },

    initialize: (): void => {
      // Store is automatically hydrated by persistence middleware
      // This method can be used for any post-hydration setup
      set({isLoading: false})
    },
  }),
  {
    name: 'history-module',
    persist: true,
    devtools: true,
  },
)
