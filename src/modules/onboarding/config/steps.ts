import {OnboardingStepType, type OnboardingStep} from '../types'

/**
 * ONBOARDING_STEPS
 * Configuration for all onboarding steps.
 * Each step represents a screen in the onboarding flow.
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'experience_level',
    type: OnboardingStepType.RADIO,
    title: 'What is your experience with museums?',
    description:
      'Help us tailor your audio tour experience to your level of interest',
    required: true,
    options: [
      {
        value: 'beginner',
        label: 'First-time visitor',
        description: 'I rarely visit museums',
      },
      {
        value: 'intermediate',
        label: 'Casual visitor',
        description: 'I visit museums occasionally',
      },
      {
        value: 'advanced',
        label: 'Museum enthusiast',
        description: 'I visit museums frequently',
      },
    ],
  },
  {
    id: 'preferred_style',
    type: OnboardingStepType.RADIO,
    title: 'How do you prefer to learn?',
    description:
      'We will adjust the narrative style based on your preference',
    required: true,
    options: [
      {
        value: 'storytelling',
        label: 'Storytelling',
        description: 'Engaging narratives and anecdotes',
      },
      {
        value: 'factual',
        label: 'Factual',
        description: 'Historical facts and details',
      },
      {
        value: 'conversational',
        label: 'Conversational',
        description: 'Casual and friendly explanations',
      },
    ],
  },
  {
    id: 'interests',
    type: OnboardingStepType.RADIO,
    title: 'What interests you most?',
    description: 'We will prioritize content related to your interests',
    required: true,
    options: [
      {
        value: 'art',
        label: 'Art & Aesthetics',
        description: 'Artistic techniques and styles',
      },
      {
        value: 'history',
        label: 'History & Culture',
        description: 'Historical context and cultural significance',
      },
      {
        value: 'science',
        label: 'Science & Innovation',
        description: 'Scientific discoveries and innovations',
      },
    ],
  },
  {
    id: 'tour_length',
    type: OnboardingStepType.RADIO,
    title: 'Preferred tour length',
    description: 'How much time do you typically have for a museum visit?',
    required: true,
    options: [
      {
        value: 'short',
        label: 'Quick visit (30-45 min)',
        description: 'Brief highlights and key pieces',
      },
      {
        value: 'medium',
        label: 'Standard visit (1-2 hours)',
        description: 'Balanced tour with main attractions',
      },
      {
        value: 'long',
        label: 'Extended visit (2+ hours)',
        description: 'Comprehensive tour with details',
      },
    ],
  },
  {
    id: 'accessibility',
    type: OnboardingStepType.TOGGLE,
    title: 'Accessibility preferences',
    description: 'Enable features to improve your experience',
    required: false,
  },
]
