# src/modules/history/api

API layer for the history module, handling tour synchronization with the backend.

## Files

- **keys.ts** - TanStack Query key factory for cache management
- **queries.ts** - React Query hooks for fetching tour data
- **mutations.ts** - React Query hooks for creating/updating/deleting tours
- **mocks.ts** - MSW handlers for mocking API endpoints in development

## Query Keys

The `historyKeys` factory provides hierarchical keys for cache invalidation:

- `historyKeys.all` - Base key for all history queries
- `historyKeys.myTours()` - User's tour list
- `historyKeys.tour(id)` - Specific tour by ID
- `historyKeys.communityTours()` - Shared community tours
- `historyKeys.toursByMuseum(id)` - Tours filtered by museum

## Queries

- **useMyToursQuery** - Fetches all tours belonging to the current user
- **useTourByIdQuery** - Fetches a specific tour by ID
- **useCommunityToursQuery** - Fetches publicly shared community tours
- **useToursByMuseumQuery** - Fetches tours filtered by museum ID

## Mutations

- **useSaveTourToCloud** - Saves a new tour to the backend (POST /tours)
- **useUpdateCloudTour** - Updates an existing tour (PATCH /tours/:id)
- **useDeleteCloudTour** - Deletes a tour (DELETE /tours/:id)
- **useShareTour** - Shares or unshares a tour (PATCH /tours/:id/share)

## API Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | /tours           | List user's tours  |
| GET    | /tours/:id       | Get tour details   |
| GET    | /tours/community | List shared tours  |
| POST   | /tours           | Create new tour    |
| PATCH  | /tours/:id       | Update tour        |
| PATCH  | /tours/:id/share | Share/unshare tour |
| DELETE | /tours/:id       | Delete tour        |

## Usage

```typescript
// Fetching tours
const {data, isLoading} = useMyToursQuery()

// Saving a tour to cloud
const {mutateAsync: saveTour} = useSaveTourToCloud()
await saveTour(tourData)

// Sharing a tour
const {mutateAsync: shareTour} = useShareTour()
await shareTour({id: 'tour-123', isShared: true})
```
