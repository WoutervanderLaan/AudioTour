# src/modules/community

Community Tours module for browsing and experiencing pre-made and community-shared audio tours.

## Structure

- **api/** - Community API endpoints (queries and mutations for tours, ratings, recommendations)
- **components/** - Community-specific components (tour cards, rating display/input, sections)
- **hooks/** - Community-specific hooks (useCommunityTours, useRecommendedTours, useNearbyTours)
- **screens/** - Community browse and detail screens
- **types.ts** - Community-related TypeScript types (CommunityTour, CommunityTourSummary)
- **routes.types.ts** - Community route type definitions
- **screenConfig.ts** - Community navigation stack and routes configuration
- **constants.ts** - Module constants (filter options, sort options)
- **index.ts** - Module configuration export for app registry

## Purpose

Provides discovery and playback functionality for pre-made (official) and community-shared audio tours. Users can browse by location, search by various criteria, filter by rating, and receive personalized recommendations based on their tour history and current location.

## Key Types

- **CommunityTour** - Extended tour data with author info and community metadata
- **CommunityTourSummary** - Lightweight representation for list views
- **TourRating** - Individual user rating for a tour
- **CommunityFilterOptions** - Search and filter parameters

## Dependencies

- `@/modules/history/types` - PersistedTour, TourSummary base types
- `@/shared/hooks/useUserLocation` - Location-based features
- `@/modules/history/store/useHistoryStore` - User history for recommendations
