# src/modules/onboarding/screens

Screen components for the onboarding flow.

## Purpose

Contains the screen components that render the multi-step onboarding flow where users configure their tour preferences.

## Contents

- **OnboardingFlowScreen.tsx** - Main onboarding flow screen that:
  - Displays the current onboarding step (radio groups or toggles)
  - Renders step progress indicator
  - Provides navigation buttons (Back, Next/Finish, Skip)
  - Uses `useOnboardingFlow` hook for state management
  - Integrates with react-hook-form for validation
  - Shows appropriate controls based on step type (radio, toggle, text)
