# src/shared/context

React Context providers for UI state.

## Contexts

- **[banner/](./banner)** - Banner notification context for displaying sticky banners
- **[keyboard/](./keyboard)** - Keyboard context with visibility and state management
- **[toast/](./toast)** - Toast notification context with queue and display management

## Purpose

Provides React Context-based state management for UI-related concerns. These are separate from the main Zustand store and handle:

- UI state that needs to be accessed across many components
- State that is better suited for Context API than global state
- Cross-cutting UI concerns (keyboard, toasts, etc.)

## Note

This is in `shared/` (not `store/`) because it's UI-specific state management using React Context, while `store/` contains global Zustand state management.
