# src/store

Global Zustand state management.

## Contents

- **[slices/](./slices)** - Zustand store slices for different state domains
- **[middleware/](./middleware)** - Store middleware for logging, persistence, etc.
- **types.ts** - Store-related TypeScript types

## Purpose

Manages global application state using Zustand. State is organized into slices for better maintainability and code organization.

## Import Rules

Store can only import from: shared

This keeps the store independent from features and app-specific code.

## Note

UI-specific state (keyboard, toasts) is managed via React Context in `shared/context/` rather than in the global Zustand store.
