# src/modules/history/hooks

Hooks for the history module, handling tour sync, persistence, and UI operations.

## Files

- **useHistoryTours.ts** - Hook for fetching and filtering tour history
- **useTourActions.ts** - Hook for tour edit/delete actions
- **useTourSync.ts** - Hook for syncing tours between local storage and backend API
- **useTourSync.test.ts** - Unit tests for the sync hook

## useHistoryTours

Provides access to the user's tour history with filtering and sorting.

**Options:**

- `searchQuery` - Filter tours by title, description, or museum name
- `sortBy` - Sort order: 'date-desc', 'date-asc', or 'title'

**Returns:**

- `tours` - Filtered and sorted tour summaries
- `isLoading` - Loading state
- `isEmpty` - Whether the filtered list is empty
- `refetch` - Function to refresh data

**Example:**

```typescript
const {tours, isLoading, isEmpty} = useHistoryTours({
  searchQuery: 'Rijksmuseum',
  sortBy: 'date-desc',
})
```

## useTourActions

Provides actions for managing saved tours.

**Returns:**

- `updateTour(id, updates)` - Updates tour metadata
- `deleteTour(id)` - Deletes with confirmation dialog
- `deleteTourDirect(id)` - Deletes without confirmation

**Example:**

```typescript
const {updateTour, deleteTour} = useTourActions()

// Update tour
updateTour('tour-123', {title: 'New Title'})

// Delete with confirmation
deleteTour('tour-123')
```

## useTourSync

Manages bidirectional sync between local AsyncStorage and cloud API:

- Automatically syncs tours when app comes to foreground
- Handles offline mode gracefully (tours stay local until sync)
- Implements optimistic updates with rollback on failure
- Tracks retry attempts (max 3) for failed syncs
- Provides manual sync controls for immediate synchronization

**Returns:**

- `syncAllTours()` - Syncs all pending tours
- `syncTour(id)` - Syncs a specific tour
- `isSyncing` - Whether any sync is in progress
- `pendingCount` - Number of tours awaiting sync

**Example:**

```typescript
const {syncAllTours, syncTour, isSyncing, pendingCount} = useTourSync()

// Check pending tours
if (pendingCount > 0) {
  console.log(`${pendingCount} tours need syncing`)
}

// Manual sync
await syncAllTours()

// Sync specific tour
const success = await syncTour('tour-123')
```

## Note

The main tour persistence hook (`useTourPersistence`) is located in the tour module
(`src/modules/tour/hooks/useTourPersistence.ts`) as it needs access to the active
tour session state. The history module hooks focus on post-save operations like syncing.
