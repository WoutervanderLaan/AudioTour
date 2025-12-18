# src/modules

Self-contained feature modules with their own screens, navigation, and business logic.

## Structure

- **auth/** - Authentication module (login, register, auth state)
- **notifications/** - Push notification module
- **onboarding/** - User onboarding module
- **profile/** - User profile module
- **tour/** - Tour and artwork management module

## Purpose

Modules are isolated features that follow a consistent structure with their own navigation, screens, hooks, store, and types. Each module exports a configuration object that plugs into the app's module registry. Modules can only import from shared and store, ensuring proper separation of concerns.
