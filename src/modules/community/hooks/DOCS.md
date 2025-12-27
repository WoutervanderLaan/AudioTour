# src/modules/community/hooks

Custom React hooks specific to the Community Tours module.

## Files

- **useCommunityTours.ts** - Fetch and filter community tours
- **useRecommendedTours.ts** - Fetch personalized recommendations based on history
- **useNearbyTours.ts** - Fetch location-based tours with distance calculation
- **useTourRating.ts** - Submit and update tour ratings

## Patterns

- Hooks wrap TanStack Query hooks with module-specific logic
- Use proper TypeScript types for parameters and return values
- Include JSDoc documentation with examples
- Handle loading, error, and empty states appropriately
