/**
 * OnboardingStepType
 * Defines the type of input control for an onboarding step
 */
export enum OnboardingStepType {
  RADIO = 'radio',
  TOGGLE = 'toggle',
  TEXT = 'text',
}

/**
 * OnboardingStep
 * Configuration for a single onboarding step
 */
export type OnboardingStep = {
  /**
   * id - Unique identifier for the step
   */
  id: string
  /**
   * type - The type of input control
   */
  type: OnboardingStepType
  /**
   * title - Title of the step
   */
  title: string
  /**
   * description - Description text for the step
   */
  description: string
  /**
   * options - Options for radio button steps
   */
  options?: Array<{value: string; label: string; description?: string}>
  /**
   * placeholder - Placeholder for text input steps
   */
  placeholder?: string
  /**
   * required - Whether this step is required
   */
  required?: boolean
}

/**
 * OnboardingAnswers
 * Type for storing user's answers to onboarding questions
 */
export type OnboardingAnswers = Record<string, string | boolean>

/**
 * OnboardingState
 * Store state for the onboarding module
 */
export type OnboardingState = {
  /**
   * answers - User's answers to onboarding questions
   */
  answers: OnboardingAnswers
  /**
   * completed - Whether onboarding has been completed
   */
  completed: boolean
  /**
   * dismissed - Whether the banner has been dismissed (temporary)
   */
  dismissed: boolean
  /**
   * setAnswer - Set answer for a specific question
   */
  setAnswer: (questionId: string, answer: string | boolean) => void
  /**
   * completeOnboarding - Mark onboarding as completed
   */
  completeOnboarding: () => void
  /**
   * dismissBanner - Temporarily dismiss the banner
   */
  dismissBanner: () => void
  /**
   * reset - Reset onboarding state
   */
  reset: () => void
}
