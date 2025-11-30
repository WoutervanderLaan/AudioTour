# src/app/init

App initialization logic and configuration.

## Contents

- **Init.tsx** - Main initialization component that sets up app-wide providers (QueryClientProvider, SafeAreaProvider, etc.)
- **queryclient.ts** - TanStack Query (React Query) client configuration

## Purpose

Handles app initialization and setup of core providers before the main app renders. This includes:

- React Query client setup
- Safe area context provider
- Other app-wide provider configuration
