# src/features/capture

Photo capture and object recognition feature.

## Purpose

Handles the core photo capture functionality including:

- Camera interface for photographing museum objects
- Image upload and processing
- Object recognition integration
- Capture history and management

## Structure

- **components/** - Capture-specific UI (camera, preview, etc.)
- **hooks/** - Capture hooks (useCamera, useCapture, etc.)
- **schemas/** - Zod validation schemas for capture data
- **types/** - Capture-related TypeScript types

## Import Rules

Can only import from: shared, store
