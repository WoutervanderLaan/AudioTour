import {type OnboardingStep, OnboardingStepType} from '../types'

/**
 * ONBOARDING_STEPS
 * Configuration for all onboarding steps.
 * Each step represents a screen in the onboarding flow.
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'experience_level',
    type: OnboardingStepType.RADIO,
    title: 'How familiar are you with apps like this?',
    description: 'Help us tailor your experience to your level of interest',
    required: true,
    options: [
      {
        value: 'beginner',
        label: 'First-time user',
        description: 'I am new to apps like this',
      },
      {
        value: 'intermediate',
        label: 'Casual user',
        description: 'I use similar apps occasionally',
      },
      {
        value: 'advanced',
        label: 'Power user',
        description: 'I use apps like this frequently',
      },
    ],
  },
  {
    id: 'preferred_style',
    type: OnboardingStepType.RADIO,
    title: 'How do you prefer to learn?',
    description: 'We will adjust the content style based on your preference',
    required: true,
    options: [
      {
        value: 'storytelling',
        label: 'Storytelling',
        description: 'Engaging stories and anecdotes',
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
    title: 'Preferred session length',
    description: 'How much time do you typically have?',
    required: true,
    options: [
      {
        value: 'short',
        label: 'Quick (a few minutes)',
        description: 'Just the essentials',
      },
      {
        value: 'medium',
        label: 'Standard (15-30 min)',
        description: 'A balanced amount of content',
      },
      {
        value: 'long',
        label: 'Extended (30+ min)',
        description: 'In-depth and comprehensive',
      },
    ],
  },
  {
    id: 'accessibility',
    type: OnboardingStepType.TOGGLE,
    title: 'Accessibility preferences',
    description: 'Enable features to improve your experience',
    label: 'Enable accessibility features',
    hint: 'Larger text, high contrast, and screen reader support',
    required: false,
  },
]
