# src/store/slices

Zustand store slices.

## Purpose

Contains individual Zustand store slices that manage different domains of global state. Each slice is responsible for a specific part of the application state.

## Structure

Each slice typically contains:

- State shape definition
- Actions (state mutations)
- Selectors (derived state)
- TypeScript types for the slice

Slices are combined into a single root store.
