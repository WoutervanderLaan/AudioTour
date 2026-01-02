# src/modules/history

History module handling tour persistence, retrieval, and synchronization with the backend.

## Structure

- **api/** - History API endpoints (queries and mutations for tour sync)
- **hooks/** - History-specific hooks (useTourPersistence, useTourSync)
- **screens/** - History list and detail screens
- **store/** - History state management with Zustand (persisted tours)
- **utils/** - Utility functions for tour title/description generation
- **types.ts** - History-related TypeScript types (PersistedTour, TourSummary)
- **routes.types.ts** - History route type definitions
- **screenConfig.ts** - History navigation stack and routes configuration
- **index.ts** - Module configuration export for app registry

## Purpose

Provides tour persistence functionality including automatic saving of completed tours, local storage with AsyncStorage, and optional cloud synchronization. This module serves as the foundation for the History tab (user's own tours). It is also designed to support the planned Community Tours module (shared tours) in the future.

## Key Types

- **PersistedTour** - Complete tour data including all feed items, metadata, and sharing settings
- **TourSummary** - Lightweight representation for list views
- **CreatePersistedTourParams** - Parameters for creating a new persisted tour
- **HistoryState** - Zustand store state shape

## Dependencies

- `@/modules/tour/types` - FeedItem type for tour content
- `@/shared/hooks/useUserLocation` - Coordinates type for location data
