# src/store/slices

Zustand store slices.

## Purpose

Contains individual Zustand store slices that manage different domains of global
state. Each slice is responsible for a specific part of the application state.

This directory is intentionally empty in the template — it is the extension point
for app-wide global state. Add slices here using the `createModuleStore` factory in
`src/store/createStore.ts`. Module-scoped state should live inside the owning module
(see `src/modules/auth/store` for the pattern).

## Structure

Each slice typically contains:

- State shape definition
- Actions (state mutations)
- Selectors (derived state)
- TypeScript types for the slice

Slices are combined into a single root store.
