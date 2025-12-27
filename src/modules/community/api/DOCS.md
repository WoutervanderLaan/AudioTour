# src/modules/community/api

API layer for the Community Tours module using TanStack Query.

## Files

- **keys.ts** - Query key factory for cache management
- **queries.ts** - React Query hooks for fetching community tours
- **mutations.ts** - React Query hooks for rating and reporting tours
- **mocks.ts** - MSW mock handlers for development

## Key Endpoints

### Queries

- `GET /community/tours` - Fetch community tours with filters
- `GET /community/tours/:id` - Fetch single tour details
- `GET /community/tours/recommended` - Fetch personalized recommendations
- `GET /community/tours/nearby` - Fetch location-based tours

### Mutations

- `POST /community/tours/:id/rate` - Submit a rating for a tour
- `POST /community/tours/:id/report` - Report inappropriate content

## Cache Strategy

- Tours list: 2-minute stale time (community content updates frequently)
- Individual tour: 10-minute stale time
- Recommendations: 5-minute stale time
- Nearby tours: Location-based keys for proper invalidation
