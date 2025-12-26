# User Story: Tour Persistence

## Overview

**As a** user
**I want** my audio tours to be automatically saved
**So that** I can access them later in my history and optionally share them with the community

## Description

This foundational feature enables the storage and retrieval of completed audio tours. It establishes the data model and persistence layer that both the History and Community Tours modules depend on.

## Acceptance Criteria

- [ ] Completed tours are automatically saved when the user finishes or leaves a tour session
- [ ] Tour data includes all artwork entries, generated audio, and metadata
- [ ] Tours are persisted locally with AsyncStorage
- [ ] Tours can be synced to a backend API for cloud storage and sharing
- [ ] Auto-generated title and description are created from tour content

---

## Tasks

### TASK-1.1: Define Tour Data Types

**Description:** Create TypeScript types for persisted tour data that extends the existing `FeedItem` structure.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:** `src/modules/tour/types.ts` (existing FeedItem type)

```typescript
// New types to create:
type PersistedTour = {
  id: string
  createdAt: number
  updatedAt: number

  // Tour metadata
  title: string                    // Auto-generated or user-customized
  description: string              // Auto-generated or user-customized
  heroImageUri: string             // First photo or user-selected

  // Location context
  museumId: string | null          // From KNOWN_MUSEUMS or null if unknown
  museumName: string               // Museum name or 'Unknown Location'
  coordinates: Coordinates | null  // Lat/lng of tour start

  // Tour content
  feedItems: FeedItem[]            // All artwork entries from the tour

  // User & session
  userId: string | null            // For future auth integration
  sessionId: string                // From userSessionStore

  // Sharing & community
  isShared: boolean                // Whether tour is shared publicly
  isOfficial: boolean              // Admin-created pre-made tour
  communityRating: number          // 0-5 stars average
  ratingCount: number              // Number of ratings
}

type TourSummary = Pick<PersistedTour,
  'id' | 'title' | 'description' | 'heroImageUri' |
  'museumName' | 'createdAt' | 'communityRating' | 'ratingCount'
>
```

**Subtasks:**
- [ ] Create `src/shared/types/tour.ts` with `PersistedTour` and `TourSummary` types
- [ ] Create `Coordinates` re-export from `useUserLocation` types
- [ ] Add JSDoc documentation for all types
- [ ] Export types from `src/shared/types/index.ts`

📐 **Pattern:** Follow existing type organization in `src/shared/types/`

---

### TASK-1.2: Create Tour Persistence Store

**Description:** Create a Zustand store for managing persisted tours with AsyncStorage persistence.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/modules/auth/store/useAuthStore.ts` (persistence pattern)
- `src/modules/tour/store/useTourStore.ts` (store structure)
- `src/store/createStore.ts` (store factory)

**Subtasks:**
- [ ] Create `src/store/slices/tourHistoryStore.ts`
- [ ] Implement state: `tours: PersistedTour[]`, `isLoading: boolean`
- [ ] Implement actions:
  - `saveTour(tour: PersistedTour): void`
  - `updateTour(id: string, updates: Partial<PersistedTour>): void`
  - `deleteTour(id: string): void`
  - `getTour(id: string): PersistedTour | undefined`
  - `getTours(): PersistedTour[]`
- [ ] Use `createModuleStore` with `persist: true` for AsyncStorage
- [ ] Add selectors for filtered views (by date, museum, etc.)
- [ ] Create `src/store/slices/DOCS.md` update for new store
- [ ] Write unit tests in `src/store/slices/__tests__/tourHistoryStore.test.ts`

📐 **Pattern:** Use `immer` middleware for immutable updates (see `useTourStore.ts`)

---

### TASK-1.3: Implement Auto-Save on Tour Completion

**Description:** Automatically save the current tour when the user completes or exits the tour session.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/modules/tour/hooks/useTourInitialization.ts` (tour lifecycle)
- `src/modules/tour/store/useTourStore.ts` (current tour state)
- `src/store/slices/museumStore.ts` (museum context)

**Subtasks:**
- [ ] Create `src/modules/tour/hooks/useTourPersistence.ts`
- [ ] Implement `saveTourToHistory()` function that:
  - Collects all `feedItems` from `useTourStore`
  - Gets museum context from `useMuseumStore`
  - Generates title and description (→ See TASK-1.4)
  - Creates `PersistedTour` object
  - Saves via `tourHistoryStore.saveTour()`
- [ ] Call save on:
  - Navigation away from tour (via `useEffect` cleanup)
  - Explicit "End Tour" action
  - App backgrounding (optional, for safety)
- [ ] Add confirmation modal before overwriting existing tour
- [ ] Write tests for persistence hook

📐 **Pattern:** Use React Navigation's `beforeRemove` listener for exit detection

🔗 **Dependency:** TASK-1.1, TASK-1.2, TASK-1.4

---

### TASK-1.4: Auto-Generate Tour Title and Description

**Description:** Create utilities to automatically generate tour title and description from tour content.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/core/lib/` (utility organization)
- `src/modules/tour/types.ts` (FeedItem structure)

**Subtasks:**
- [ ] Create `src/shared/utils/tourTitleGenerator.ts`
- [ ] Implement `generateTourTitle(items: FeedItem[], museum: string): string`
  - Pattern: "{Museum} Tour" or "Tour at {Location}" or "Art Tour - {Date}"
  - Include artwork count or notable piece if available
- [ ] Implement `generateTourDescription(items: FeedItem[]): string`
  - Combine first few artwork descriptions
  - Limit to 150 characters
- [ ] Add unit tests in `src/shared/utils/__tests__/tourTitleGenerator.test.ts`

📐 **Pattern:** Pure utility functions with comprehensive tests

---

### TASK-1.5: Create API Endpoints for Tour Sync (Backend)

**Description:** Define API mutation hooks for syncing tours to the backend.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/modules/tour/api/mutations.ts` (mutation pattern)
- `src/modules/tour/api/keys.ts` (query key organization)
- `src/core/api/client.ts` (API client usage)

**Subtasks:**
- [ ] Create `src/modules/history/api/mutations.ts` (can be created early in history module)
- [ ] Implement mutations:
  - `useSaveTourToCloud()` - POST `/tours`
  - `useUpdateCloudTour()` - PATCH `/tours/:id`
  - `useDeleteCloudTour()` - DELETE `/tours/:id`
- [ ] Create `src/modules/history/api/queries.ts`
  - `useMyTours()` - GET `/tours/mine`
  - `useTourById()` - GET `/tours/:id`
- [ ] Create MSW mocks in `src/modules/history/api/mocks.ts`
- [ ] Add query keys in `src/modules/history/api/keys.ts`

📐 **Pattern:** Follow TanStack Query mutation pattern with error handling

⚠️ **SHARED:** These API endpoints will also be used by Community Tours module

---

### TASK-1.6: Sync Local Tours with Backend

**Description:** Implement bidirectional sync between local storage and backend API.

**Priority:** Low
**Estimated Complexity:** High

📁 **Reference:**
- `src/store/slices/tourHistoryStore.ts` (local storage - from TASK-1.2)
- `src/modules/history/api/` (API layer - from TASK-1.5)

**Subtasks:**
- [ ] Create `src/modules/history/hooks/useTourSync.ts`
- [ ] Implement sync strategy:
  - On app start: fetch cloud tours, merge with local
  - On tour save: save locally first, queue for cloud sync
  - Handle offline mode gracefully
- [ ] Add `syncStatus` field to `PersistedTour` type
- [ ] Implement conflict resolution (latest wins or user choice)
- [ ] Add background sync with `useEffect` on app focus

📐 **Pattern:** Optimistic updates with rollback on failure

🔗 **Dependency:** TASK-1.2, TASK-1.5

---

## Testing Requirements

- Unit tests for all utility functions
- Unit tests for store actions and selectors
- Integration tests for auto-save flow
- Mock API responses for sync tests

## Related Stories

- → [02-history-module.md](./02-history-module.md) - Consumes persisted tours
- → [03-community-tours-module.md](./03-community-tours-module.md) - Shares tour data model
- → [05-shared-tour-card.md](./05-shared-tour-card.md) - Uses `TourSummary` type
