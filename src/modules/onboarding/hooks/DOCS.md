# src/modules/onboarding/hooks

Custom React hooks for onboarding flow logic.

## Purpose

Contains hooks that encapsulate the business logic and state management for the multi-step onboarding flow.

## Contents

- **useOnboardingFlow.ts** - Main onboarding flow hook that provides:
  - `currentStep` - Current step configuration object
  - `currentStepIndex` - Zero-based index of current step
  - `isLastStep` / `isFirstStep` - Boolean flags for navigation
  - `answers` - Record of all user answers
  - `stepSchema` - Zod validation schema for current step
  - `handleNext(data)` - Navigate to next step and save answer
  - `handleBack()` - Navigate to previous step
  - `handleSkip()` - Skip onboarding flow entirely
