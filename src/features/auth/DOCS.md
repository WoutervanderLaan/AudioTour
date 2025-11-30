# src/features/auth

Authentication and authorization feature.

## Purpose

Handles user authentication and authorization including:

- User login/logout
- Session management
- Auth state persistence
- Protected routes/screens
- Auth tokens and credentials

## Structure

- **components/** - Auth-specific UI (login forms, auth guards, etc.)
- **hooks/** - Auth hooks (useAuth, useSession, etc.)
- **services/** - Auth business logic and API calls
- **types/** - Auth-related TypeScript types

## Import Rules

Can only import from: shared, store
