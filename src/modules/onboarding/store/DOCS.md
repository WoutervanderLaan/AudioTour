# src/modules/onboarding/store

Zustand store for onboarding state management.

## Purpose

Manages the user's onboarding progress, answers to onboarding questions, completion status, and banner dismissal state. Persists data to AsyncStorage to maintain state across app restarts.

## Contents

- **useOnboardingStore.ts** - Zustand store hook with:
  - `answers` - Record of user answers keyed by question ID
  - `completed` - Boolean indicating if onboarding was completed
  - `dismissed` - Boolean indicating if onboarding banner was dismissed
  - `setAnswer(questionId, answer)` - Save answer for a specific question
  - `completeOnboarding()` - Mark onboarding as completed
  - `dismissBanner()` - Dismiss the onboarding banner
  - `reset()` - Reset onboarding state to initial values

- **selectors.ts** - Zustand selectors for accessing onboarding state
