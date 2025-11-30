# src/app

Application-level setup, configuration, and initialization.

## Contents

- **App.tsx** - Main app component that sets up providers and navigation
- **[init/](./init)** - App initialization logic and configuration (QueryClient setup, etc.)
- **[navigation/](./navigation)** - Navigation configuration, linking, and screen components

## Purpose

This folder contains all app-wide setup code including:

- Provider hierarchy setup
- Navigation structure (bottom tabs + native stack)
- Deep linking configuration
- App initialization and bootstrapping

## Import Rules

The `app/` folder can import from: shared, features, store, themes.
