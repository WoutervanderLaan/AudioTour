# src/core/api

API client and HTTP request handling.

## Purpose

Contains the custom `ApiClient` class that handles all HTTP communication with the backend API. The API client provides methods for:

## Configuration

API base URL is configured via `EXPO_PUBLIC_API_BASE_URL` environment variable (defaults to `http://localhost:8000` in development).
