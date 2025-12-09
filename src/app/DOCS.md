# src/app

Application-wide setup, initialization, and configuration.

## Structure

- **init/** - App initialization logic and startup routines
- **App.tsx** - Root application component with providers and navigation setup

## Purpose

This folder orchestrates the entire application startup process. It wraps the app with necessary providers (theme, query client, navigation), handles initialization, and sets up the root navigation structure. The app layer can import from shared, modules, store, and themes.
