# src/modules/onboarding/utils

Utility functions for onboarding flow.

## Purpose

Contains helper functions and utilities used throughout the onboarding module.

## Contents

- **createStepSchema.ts** - Generates Zod validation schemas dynamically based on step configuration:
  - Takes a step index as input
  - Returns a Zod schema object based on the step type (radio, toggle, text)
  - Handles required/optional validation
  - Validates enum values for radio options
  - Exports `StepFormData` type for form data structure
