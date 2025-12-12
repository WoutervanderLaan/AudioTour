export enum OnboardingRouteName {
  flow = 'OnboardingFlow',
}

/**
 * OnboardingStackParams
 * Parameters for onboarding stack screens
 */
export type OnboardingStackParams = {
  /**
   * OnboardingFlow screen params
   */
  [OnboardingRouteName.flow]: undefined
}

/**
 * OnboardingModalParams
 * Parameters for onboarding modal screens
 * Currently empty as no modals are defined
 */
export type OnboardingModalParams = Record<string, never>
