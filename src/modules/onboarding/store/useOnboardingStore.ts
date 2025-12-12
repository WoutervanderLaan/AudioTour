import type {OnboardingState} from '../types'

import {createModuleStore} from '@/store/createStore'

const initialState = {
  answers: {},
  completed: false,
  dismissed: false,
}

/**
 * useOnboardingStore
 * Zustand store for onboarding state management.
 *
 * Manages user's onboarding progress including answers to questions,
 * completion status, and banner dismissal state.
 * Persists to AsyncStorage to maintain state across app restarts.
 *
 * @returns Onboarding store hook with state and actions
 */
export const useOnboardingStore = createModuleStore<OnboardingState>(
  set => ({
    ...initialState,

    setAnswer: (questionId, answer): void => {
      set(state => ({
        answers: {
          ...state.answers,
          [questionId]: answer,
        },
      }))
    },

    completeOnboarding: (): void => {
      set({
        completed: true,
        dismissed: false,
      })
    },

    dismissBanner: (): void => {
      set({dismissed: true})
    },

    reset: (): void => {
      set(initialState)
    },
  }),
  {
    name: 'onboarding-module',
    persist: true,
    devtools: true,
  },
)
