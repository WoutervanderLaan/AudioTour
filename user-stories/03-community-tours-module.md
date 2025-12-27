# User Story: Community/Pre-made Tours Module

## Overview

**As a** user
**I want** to browse and experience pre-made and community-shared audio tours
**So that** I can enjoy curated museum experiences without creating my own tour

## Description

The Community Tours module allows users to discover and play pre-made (official) and community-shared audio tours. Users can browse by location, search by various criteria, filter by rating, and receive personalized recommendations based on their tour history and current location.

## Acceptance Criteria

- [ ] New "Explore" tab appears in the bottom navigation
- [ ] Browse screen displays a list of community and pre-made tours
- [ ] Each tour card shows: location, title, hero image, description, rating
- [ ] Users can search by title, description, location, or rating threshold
- [ ] Recommended/nearby tours are displayed at the top (toggleable)
- [ ] Tapping a tour opens a detail view with full information
- [ ] Detail view has a "Start Tour" button to begin playback
- [ ] Pre-made tours play as read-only sequential audio guides

---

## Tasks

### TASK-3.1: Create Community Tours Module Structure

**Description:** Set up the community tours module folder structure following existing module patterns.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:** `src/modules/tour/` and `src/modules/history/` (module structure templates)

**Folder Structure:**

```
src/modules/community/
├── api/
│   ├── mutations.ts      # Rating, reporting, etc.
│   ├── queries.ts        # Fetch community tours
│   ├── keys.ts           # TanStack Query keys
│   ├── mocks.ts          # MSW mock handlers
│   └── DOCS.md
├── components/
│   ├── CommunityTourCard.tsx   # Tour list item (→ uses SharedTourCard)
│   ├── CommunitySearchBar.tsx  # Search with filters (→ uses SharedSearch)
│   ├── RecommendedSection.tsx  # Recommendations carousel
│   ├── NearbySection.tsx       # Nearby tours section
│   ├── RatingDisplay.tsx       # Star rating component
│   ├── RatingInput.tsx         # Rating submission component
│   └── DOCS.md
├── hooks/
│   ├── useCommunityTours.ts       # Fetch and filter tours
│   ├── useRecommendedTours.ts     # Personalized recommendations
│   ├── useNearbyTours.ts          # Location-based tours
│   ├── useTourRating.ts           # Submit/update ratings
│   └── DOCS.md
├── screens/
│   ├── CommunityScreen.tsx        # Main browse screen
│   ├── CommunityDetailScreen.tsx  # Tour detail view
│   └── DOCS.md
├── types.ts              # Module-specific types
├── routes.types.ts       # Route definitions
├── screenConfig.ts       # Navigation configuration
├── constants.ts          # Module constants
├── index.ts              # Module export
└── DOCS.md               # Module documentation
```

**Subtasks:**

- [ ] Create folder structure as shown above
- [ ] Create all DOCS.md files with purpose descriptions
- [ ] Add `community` to `ModuleSlug` enum in `src/modules/slugs.ts`
- [ ] Create `src/modules/community/types.ts` with module-specific types
- [ ] Create `src/modules/community/constants.ts`

📐 **Pattern:** Mirror history module organization

---

### TASK-3.2: Define Community Tour Types

**Description:** Create TypeScript types specific to community tours, extending the shared `PersistedTour` type.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**

- `src/modules/history/types.ts` (from [01-tour-persistence.md#TASK-1.1])
- `src/modules/community/types.ts`

**Subtasks:**

- [ ] Create community-specific types in `src/modules/community/types.ts`:

```typescript
import {PersistedTour, TourSummary} from '@/shared/types/tour'

// Extended community tour with author info
type CommunityTour = PersistedTour & {
  author: {
    id: string
    displayName: string
    avatarUrl?: string
  }
  isOfficial: boolean // Admin-created pre-made tour
  downloadCount: number // Times tour has been started
  tags: string[] // For discovery/filtering
}

type CommunityTourSummary = TourSummary & {
  author: {displayName: string}
  isOfficial: boolean
  downloadCount: number
}

// Rating types
type TourRating = {
  id: string
  tourId: string
  userId: string
  rating?: number // 1-5
  createdAt: number
}

// Filter options for search
type CommunityFilterOptions = {
  query?: string
  museumId?: string
  minRating?: number // 1-5
  isOfficial?: boolean
  sortBy?: 'rating' | 'recent' | 'popular' | 'distance'
}
```

- [ ] Add JSDoc documentation for all types
- [ ] Export types from module index

📐 **Pattern:** Extend shared types with module-specific additions

🔗 **Dependency:** [01-tour-persistence.md#TASK-1.1]

---

### TASK-3.3: Define Community Navigation Routes

**Description:** Set up navigation routes and screen configuration for the community module.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**

- `src/modules/history/routes.types.ts`
- `src/modules/history/screenConfig.ts`

**Subtasks:**

- [ ] Create `src/modules/community/routes.types.ts`:

```typescript
export enum CommunityRouteName {
  browse = 'CommunityBrowse',
  detail = 'CommunityDetail',
}

export enum CommunityTabName {
  explore = 'ExploreTab',
}

export type CommunityStackParams = {
  [CommunityRouteName.browse]: undefined
  [CommunityRouteName.detail]: {tourId: string}
}

export type CommunityTabParams = {
  [CommunityTabName.explore]: undefined
}
```

- [ ] Create `src/modules/community/screenConfig.ts` with:
  - Tab config for Explore tab (icon: 'explore' from Material Icons)
  - Stack screen for detail view
- [ ] Export types for global navigation type augmentation

📐 **Pattern:** Follow history module's route type structure exactly

🔗 **Dependency:** TASK-3.1

---

### TASK-3.4: Register Community Tours Module

**Description:** Register the community module in the app's module registry.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**

- `src/modules/modules.ts`
- `src/modules/history/index.ts`

**Subtasks:**

- [ ] Create `src/modules/community/index.ts`:

```typescript
import {ModuleConfig} from '@/modules/types'
import {ModuleSlug} from '@/modules/slugs'
import {communityStacks, communityTabs} from './screenConfig'

export const communityModule: ModuleConfig = {
  name: ModuleSlug.community,
  version: '1.0.0',
  enabled: true,
  stacks: communityStacks,
  tabs: communityTabs,
  modals: {},
  dependencies: [],
  onRegister: () => {},
  onUnregister: () => {},
  onAppStart: () => {},
  queries: {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 10, // 10 minutes
  },
}
```

- [ ] Register module in `src/modules/modules.ts`:

```typescript
import {communityModule} from './community'
// In registerModules():
moduleRegistry.register(communityModule)
```

- [ ] Verify tab appears in bottom navigation (should be 3rd tab)

📐 **Pattern:** Standard module registration flow

🔗 **Dependency:** TASK-3.1, TASK-3.3

---

### TASK-3.5: Create Community Tours API Layer

**Description:** Implement API queries and mutations for fetching and interacting with community tours.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/tour/api/mutations.ts`
- `src/modules/tour/api/queries.ts`
- `src/core/api/client.ts`

**Subtasks:**

- [ ] Create `src/modules/community/api/keys.ts`:

```typescript
export const communityKeys = {
  all: ['community'] as const,
  tours: () => [...communityKeys.all, 'tours'] as const,
  tour: (id: string) => [...communityKeys.tours(), id] as const,
  recommended: () => [...communityKeys.all, 'recommended'] as const,
  nearby: (lat: number, lng: number) =>
    [...communityKeys.all, 'nearby', lat, lng] as const,
}
```

- [ ] Create `src/modules/community/api/queries.ts`:
  - `useCommunityTours(filters)` - GET `/community/tours`
  - `useCommunityTour(id)` - GET `/community/tours/:id`
  - `useRecommendedTours()` - GET `/community/tours/recommended`
  - `useNearbyTours(coords)` - GET `/community/tours/nearby`
- [ ] Create `src/modules/community/api/mutations.ts`:
  - `useRateTour()` - POST `/community/tours/:id/rate`
  - `useReportTour()` - POST `/community/tours/:id/report`
- [ ] Create MSW mocks in `src/modules/community/api/mocks.ts`

📐 **Pattern:** TanStack Query with proper cache invalidation

🔗 **Dependency:** TASK-3.2

---

### TASK-3.6: Create Community Browse Screen

**Description:** Build the main community browse screen with recommendations, nearby tours, and full tour list.

**Priority:** High
**Estimated Complexity:** High

📁 **Reference:**

- `src/modules/tour/screens/TourFeedScreen.tsx` (list pattern)
- `src/modules/history/screens/HistoryScreen.tsx`

**Subtasks:**

- [ ] Create `src/modules/community/screens/CommunityScreen.tsx`
- [ ] Implement screen layout:

```
┌─────────────────────────────────────┐
│ Search Bar + Filters                │
├─────────────────────────────────────┤
│ [Recommended] | [Nearby]  ← Toggle  │
├─────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐      │
│ │ Tour  │ │ Tour  │ │ Tour  │ →    │  Horizontal scroll
│ │ Card  │ │ Card  │ │ Card  │      │
│ └───────┘ └───────┘ └───────┘      │
├─────────────────────────────────────┤
│ All Community Tours                 │
│ ┌─────────────────────────────────┐ │
│ │      Tour Card 1                │ │  Vertical scroll
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │      Tour Card 2                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

- [ ] Add toggle for Recommended vs Nearby at top
- [ ] Use horizontal `FlatList` for featured section
- [ ] Use `SectionList` or nested `FlatList` for full list
- [ ] Implement pull-to-refresh
- [ ] Add loading skeletons
- [ ] Handle empty states for each section

📐 **Pattern:** SectionList with horizontal featured section

🔗 **Dependency:** TASK-3.4, TASK-3.5, [04-shared-search.md], [05-shared-tour-card.md]

---

### TASK-3.7: Implement Recommended Tours Logic

**Description:** Create hook for fetching personalized tour recommendations based on user history.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/store/slices/tourHistoryStore.ts` (user history)
- `src/store/slices/userSessionStore.ts` (user preferences)

**Subtasks:**

- [ ] Create `src/modules/community/hooks/useRecommendedTours.ts`
- [ ] Recommendation factors:
  - Museums user has previously visited
  - Tags from past tours
  - User's stated preferences (from profile)
  - Community rating (boost highly-rated tours)
- [ ] Use API endpoint: GET `/community/tours/recommended`
- [ ] Pass user history summary to API for server-side recommendations
- [ ] Cache recommendations with appropriate stale time
- [ ] Fallback to popular tours if no history exists
- [ ] Add JSDoc and tests

📐 **Pattern:** TanStack Query with user context

🔗 **Dependency:** [01-tour-persistence.md#TASK-1.2], TASK-3.5

---

### TASK-3.8: Implement Nearby Tours Logic

**Description:** Create hook for fetching tours near the user's current location.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/shared/hooks/useUserLocation.ts`
- `src/shared/constants/museums.ts` (museum locations)
- `src/modules/tour/hooks/useTourInitialization.ts`

**Subtasks:**

- [ ] Create `src/modules/community/hooks/useNearbyTours.ts`
- [ ] Use `useUserLocation()` to get current coordinates
- [ ] Call API: GET `/community/tours/nearby?lat=X&lng=Y&radius=10km`
- [ ] Handle permission denied gracefully (show all tours instead)
- [ ] Sort by distance from user
- [ ] Use `haversineDistanceMeters` for client-side distance display
- [ ] Show distance on tour cards (e.g., "2.3 km away")
- [ ] Cache with location-based key
- [ ] Add JSDoc and tests

📐 **Pattern:** Location-aware query with graceful degradation

🔗 **Dependency:** TASK-3.5

---

### TASK-3.9: Create Community Detail Screen

**Description:** Build the tour detail screen showing full tour information and start button.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/history/screens/HistoryDetailScreen.tsx` (similar pattern)
- `src/modules/tour/components/FeedItem.tsx`

**Subtasks:**

- [ ] Create `src/modules/community/screens/CommunityDetailScreen.tsx`
- [ ] Fetch tour via `useCommunityTour(id)` query
- [ ] Display:
  - Hero image (full width)
  - Title and museum location
  - Author info with avatar
  - Community rating with star display
  - Description (expandable if long)
  - Tour preview (first 2-3 artworks shown)
  - Download/play count
  - Tags
- [ ] Add prominent "Start Tour" button (→ See [06-tour-playback.md])
- [ ] Add rating submission UI (if user hasn't rated)
- [ ] Add share button
- [ ] Add report button (overflow menu)
- [ ] Handle loading and error states

**Layout:**

```
┌─────────────────────────────────────┐
│ ← Back                        Share │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │        Hero Image               │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ Tour Title                          │
│ 📍 Museum Name                      │
│ ⭐⭐⭐⭐☆ 4.2 (128 ratings)          │
│                                     │
│ By AuthorName                       │
│                                     │
│ Description text that can be        │
│ expanded if it's too long...        │
│ [Read more]                         │
│                                     │
│ 🎨 12 Artworks · 45 min            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │      [  Start Tour  ]           │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Preview                             │
│ ┌─────┐ ┌─────┐ ┌─────┐           │
│ │ Art │ │ Art │ │ Art │           │
│ └─────┘ └─────┘ └─────┘           │
└─────────────────────────────────────┘
```

📐 **Pattern:** Detail screen with action button

⚠️ **SHARED:** Layout similar to HistoryDetailScreen - consider extracting shared component

🔗 **Dependency:** TASK-3.4, TASK-3.5

---

### TASK-3.10: Implement Rating Display Component

**Description:** Create a reusable star rating display component.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**

- `src/shared/components/ui/` (component patterns)

**Subtasks:**

- [ ] Create `src/modules/community/components/RatingDisplay.tsx`
- [ ] Props: `rating: number` (0-5), `count?: number`, `size?: 'sm' | 'md' | 'lg'`
- [ ] Display filled/half/empty stars using Material Icons
- [ ] Show rating count in parentheses if provided
- [ ] Style with theme tokens
- [ ] Add JSDoc documentation

**Component:**

```tsx
<RatingDisplay
  rating={4.2}
  count={128}
  size="md"
/>
// Renders: ⭐⭐⭐⭐☆ 4.2 (128)
```

📐 **Pattern:** Presentational component with size variants

---

### TASK-3.11: Implement Rating Input Component

**Description:** Create a component for users to submit their rating for a tour.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/community/api/mutations.ts` (rating mutation)
- `src/shared/components/ui/pressable/` (pressable components)

**Subtasks:**

- [ ] Create `src/modules/community/components/RatingInput.tsx`
- [ ] Props: `tourId: string`, `existingRating?: number`, `onRated?: () => void`
- [ ] Display 5 tappable stars
- [ ] Highlight stars on hover/press
- [ ] Call `useRateTour()` mutation on submit
- [ ] Show loading state during submission
- [ ] Handle errors with toast message
- [ ] Optimistically update display
- [ ] Add JSDoc documentation

📐 **Pattern:** Interactive input with mutation integration

🔗 **Dependency:** TASK-3.5

---

### TASK-3.12: Implement Search with Rating Filter

**Description:** Extend the shared search component to support rating threshold filtering.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**

- [04-shared-search.md] (shared search)
- `src/modules/community/types.ts` (filter options)

**Subtasks:**

- [ ] Extend shared search to accept filter chips
- [ ] Create filter chip options for rating:
  - "3+ Stars", "4+ Stars", "5 Stars"
- [ ] Add filter for "Official Only" toggle
- [ ] Pass filters to `useCommunityTours()` hook
- [ ] Update query when filters change
- [ ] Persist filter state across navigation

📐 **Pattern:** Filter chips pattern for quick filtering

🔗 **Dependency:** [04-shared-search.md], TASK-3.6

---

## Testing Requirements

- Unit tests for `useCommunityTours` with various filter combinations
- Unit tests for `useRecommendedTours` and `useNearbyTours`
- Component tests for rating display and input
- Integration tests for browse and detail screens
- Mock API responses for all endpoints

## Related Stories

- → [01-tour-persistence.md](./01-tour-persistence.md) - Shares tour data model
- → [04-shared-search.md](./04-shared-search.md) - Search component (shared)
- → [05-shared-tour-card.md](./05-shared-tour-card.md) - Tour card component (shared)
- → [06-tour-playback.md](./06-tour-playback.md) - Pre-made tour playback
- → [02-history-module.md](./02-history-module.md) - Similar module structure
