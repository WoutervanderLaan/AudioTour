# src/core/api/mocks

Mock Service Worker (MSW) configuration for API mocking during development and testing.

## Files

- **server.native.ts** - MSW server setup for React Native
- **server.node.ts** - MSW server setup for Node.js (testing)
- **handlers.ts** - Mock API request handlers

## Purpose

Provides API mocking capabilities for development and testing without requiring a backend server. MSW intercepts network requests and returns mock responses based on defined handlers.
