# src/modules/history/store

History store for managing persisted tour data with AsyncStorage persistence.

## Files

- **useHistoryStore.ts** - Zustand store with persistence middleware for tour history
- **selectors.ts** - Optimized selector hooks for accessing store state
- **useHistoryStore.test.ts** - Unit tests for store actions
- **selectors.test.ts** - Unit tests for selector hooks

## Store State

- `tours: PersistedTour[]` - Array of all persisted tours
- `isLoading: boolean` - Loading state indicator

## Store Actions

- `saveTour(params)` - Creates and saves a new persisted tour, returns the generated ID
- `updateTour(id, updates)` - Updates an existing tour with partial changes
- `deleteTour(id)` - Removes a tour from history
- `getTour(id)` - Retrieves a tour by ID
- `getTours()` - Returns all tours sorted by creation date (newest first)
- `setLoading(loading)` - Sets the loading state
- `reset()` - Clears all tour history
- `initialize()` - Called after hydration from AsyncStorage

## Selectors

- `useTours()` - All tours sorted by creation date
- `useTourById(id)` - Single tour by ID
- `useHistoryLoading()` - Loading state
- `useTourCount()` - Total number of tours
- `useTourSummaries()` - Lightweight summaries for list views
- `useSharedTours()` - Only publicly shared tours
- `useLocalTours()` - Tours pending sync
- `useHistoryActions()` - All store actions

## Persistence

The store uses `createModuleStore` with `persist: true` to automatically persist tour data to AsyncStorage. Data survives app restarts and is hydrated on app launch.
