# src/shared/components/features/progress-indicator

Multi-step progress visualization component.

## Purpose

Provides a **ProgressIndicator** component that displays progress through a multi-step process with both text ("Step X of Y") and a visual progress bar.

## Features

- Text label showing current step and total steps
- Visual progress bar with percentage-based fill
- Calculates progress as `(currentStep - 1) / totalSteps * 100%`
- Integrates with the app's theme system for consistent styling
