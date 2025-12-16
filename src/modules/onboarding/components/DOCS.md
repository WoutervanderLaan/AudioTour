# Onboarding Components

## Overview

This folder contains onboarding-specific UI components that are used within the onboarding module.

## Components

### OnboardingBanner

A smart component that manages the display of a sticky banner prompting users to complete the onboarding flow.

**Features:**

- Automatically shows when onboarding is incomplete and not dismissed
- Uses the global `useBanner` hook to display the banner via `BannerContext`
- Provides navigation to the onboarding flow when the CTA button is pressed
- Allows users to temporarily dismiss the banner
- Displays on screens throughout the app to encourage onboarding completion

**Behavior:**

- Shows banner if `onboarding.completed === false` and `onboarding.dismissed === false`
- Hides banner if onboarding is completed or dismissed
- Navigates to `OnboardingRouteName.flow` when "Get Started" is pressed
- Sets `dismissed` state when the banner is dismissed

**Usage:**

```tsx
import {OnboardingBanner} from '@/modules/onboarding/components/OnboardingBanner'

// In a screen or layout component
;<OnboardingBanner />
```

**Integration:**
This component is typically rendered in the main app layout or navigation container to ensure it appears across all screens when needed. The banner itself is managed by the global `BannerContext`, so the component returns `null` after triggering the banner display.
