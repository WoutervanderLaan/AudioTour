import {shallow} from 'zustand/shallow'

import {useOnboardingStore} from './useOnboardingStore'

/**
 * useOnboardingAnswers
 * Selector hook for getting all onboarding answers.
 *
 * @returns Object containing user's answers to onboarding questions
 */
export const useOnboardingAnswers = () =>
  useOnboardingStore(state => state.answers)

/**
 * useOnboardingCompleted
 * Selector hook for checking if onboarding is completed.
 *
 * @returns True if onboarding has been completed
 */
export const useOnboardingCompleted = (): boolean =>
  useOnboardingStore(state => state.completed)

/**
 * useOnboardingDismissed
 * Selector hook for checking if onboarding banner is dismissed.
 *
 * @returns True if onboarding banner has been dismissed
 */
export const useOnboardingDismissed = (): boolean =>
  useOnboardingStore(state => state.dismissed)

/**
 * useOnboardingActions
 * Selector hook for getting onboarding store actions.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing onboarding store action methods
 */
export const useOnboardingActions = () =>
  useOnboardingStore(
    state => ({
      setAnswer: state.setAnswer,
      completeOnboarding: state.completeOnboarding,
      dismissBanner: state.dismissBanner,
      reset: state.reset,
    }),
    shallow,
  )
