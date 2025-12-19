# src/core/api

API client and HTTP request handling.

## Purpose

Contains the custom `ApiClient` class that handles all HTTP communication with the backend API. The API client provides methods for:

- GET, POST, PUT, PATCH, DELETE HTTP requests
- Request/response interceptors for logging, authentication, and transforms
- Authentication token management with Bearer tokens
- FormData handling for file uploads (React Native compatible)
- Timeout configuration per request
- Automatic JSON parsing with fallback to text
- Consistent error handling with detailed error information

## Configuration

API base URL is configured via `EXPO_PUBLIC_API_BASE_URL` environment variable (defaults to `http://localhost:8000` in development).

## Contents

- **client.ts** - Generic HTTP client implementation (`ApiClient` class)
- **config.ts** - API configuration (base URL, endpoints)
- **queryclient.ts** - TanStack Query client setup
- **types.ts** - TypeScript types for API requests/responses
- **mock-config/** - MSW mock server configuration for testing
