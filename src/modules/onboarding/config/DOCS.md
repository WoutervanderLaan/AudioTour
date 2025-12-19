# src/modules/onboarding/config

Onboarding flow configuration and step definitions.

## Purpose

Contains the configuration for all onboarding steps shown to users when they first use the app. Each step collects user preferences to personalize their audio tour experience.

## Contents

- **steps.ts** - Array of `OnboardingStep` objects defining each step in the flow, including:
  - Experience level (beginner, intermediate, advanced)
  - Preferred learning style (storytelling, factual, conversational)
  - Interests (art, history, science)
  - Tour length preferences (short, medium, long)
  - Accessibility preferences (toggle for accessibility features)
