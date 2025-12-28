# User Story: History Module

## Overview

**As a** user
**I want** to browse through my past audio tours
**So that** I can revisit memorable museum experiences and manage my tour collection

## Description

The History module provides users with access to their personal audio tour history. Users can browse, search, and manage their saved tours. Each tour displays key metadata and links to the full tour feed for detailed viewing.

## Acceptance Criteria

- [ ] New "History" tab appears in the bottom navigation
- [ ] History screen displays a scrollable list of saved tours
- [ ] Each tour card shows: date, location, title, description, hero image
- [ ] Users can search tours by title, description, date, or location
- [ ] Tapping a tour opens the feed view with all tour content
- [ ] Users can edit tour title, description, and hero image
- [ ] Users can delete tours from history

---

## Tasks

### TASK-2.1: Create History Module Structure

**Description:** Set up the history module folder structure following existing module patterns.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:** `src/modules/tour/` (module structure template)

**Folder Structure:**

```
src/modules/history/
├── api/
│   ├── mutations.ts      # API mutations for tour management
│   ├── queries.ts        # API queries for fetching tours
│   ├── keys.ts           # TanStack Query keys
│   ├── mocks.ts          # MSW mock handlers
│   └── DOCS.md
├── components/
│   ├── HistoryTourCard.tsx    # Tour list item (→ uses SharedTourCard)
│   ├── HistorySearchBar.tsx   # Search input (→ uses SharedSearch)
│   ├── HistoryEmptyState.tsx  # Empty state component
│   └── DOCS.md
├── hooks/
│   ├── useHistoryTours.ts     # Hook for fetching/filtering tours
│   ├── useTourActions.ts      # Edit/delete actions
│   └── DOCS.md
├── screens/
│   ├── HistoryScreen.tsx      # Main history list screen
│   ├── HistoryDetailScreen.tsx # Tour detail/feed view
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
- [ ] Add `history` to `ModuleSlug` enum in `src/modules/slugs.ts`
- [ ] Create `src/modules/history/types.ts` with module-specific types
- [ ] Create `src/modules/history/constants.ts`

📐 **Pattern:** Exact mirror of tour module organization

---

### TASK-2.2: Define History Navigation Routes

**Description:** Set up navigation routes and screen configuration for the history module.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**

- `src/modules/tour/routes.types.ts`
- `src/modules/tour/screenConfig.ts`

**Subtasks:**

- [ ] Create `src/modules/history/routes.types.ts`:

```typescript
export enum HistoryRouteName {
  list = 'HistoryList',
  detail = 'HistoryDetail',
}

export enum HistoryTabName {
  history = 'HistoryTab',
}

export type HistoryStackParams = {
  [HistoryRouteName.list]: undefined
  [HistoryRouteName.detail]: {tourId: string}
}

export type HistoryTabParams = {
  [HistoryTabName.history]: undefined
}
```

- [ ] Create `src/modules/history/screenConfig.ts` with:
  - Tab config for History tab (icon: 'history' from Material Icons)
  - Stack screen for detail view
- [ ] Export types for global navigation type augmentation

📐 **Pattern:** Follow tour module's route type structure exactly

🔗 **Dependency:** TASK-2.1

---

### TASK-2.3: Register History Module

**Description:** Register the history module in the app's module registry.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**

- `src/modules/modules.ts`
- `src/modules/tour/index.ts`

**Subtasks:**

- [ ] Create `src/modules/history/index.ts`:

```typescript
import {ModuleConfig} from '@/modules/types'
import {ModuleSlug} from '@/modules/slugs'
import {historyStacks, historyTabs} from './screenConfig'

export const historyModule: ModuleConfig = {
  name: ModuleSlug.history,
  version: '1.0.0',
  enabled: true,
  stacks: historyStacks,
  tabs: historyTabs,
  modals: {},
  dependencies: [],
  onRegister: () => {},
  onUnregister: () => {},
  onAppStart: () => {},
  queries: {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: TIME.FIVE_MINUTES,
  },
}
```

- [ ] Register module in `src/modules/modules.ts`:

```typescript
import {historyModule} from './history'
// In registerModules():
moduleRegistry.register(historyModule)
```

- [ ] Verify tab appears in bottom navigation

📐 **Pattern:** Standard module registration flow

🔗 **Dependency:** TASK-2.1, TASK-2.2

---

### TASK-2.4: Create History List Screen

**Description:** Build the main history screen displaying the user's saved tours.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/tour/screens/TourFeedScreen.tsx` (list pattern)
- `src/shared/components/ui/screen/Screen.tsx`

**Subtasks:**

- [ ] Create `src/modules/history/screens/HistoryScreen.tsx`
- [ ] Implement using `Screen` component with `preset="scroll"` or `FlatList`
- [ ] Add search bar at top (→ See [04-shared-search.md#TASK-4.2])
- [ ] Render `HistoryTourCard` for each tour (→ See [05-shared-tour-card.md])
- [ ] Implement pull-to-refresh
- [ ] Add empty state when no tours exist
- [ ] Add loading skeleton during fetch
- [ ] Handle error states gracefully

**Component Structure:**

```tsx
<Screen preset="fixed">
  <HistorySearchBar onSearch={handleSearch} />
  <FlatList
    data={filteredTours}
    renderItem={({item}) => (
      <HistoryTourCard
        tour={item}
        onPress={() => navigateToDetail(item.id)}
        onEdit={() => openEditModal(item.id)}
        onDelete={() => confirmDelete(item.id)}
      />
    )}
    ListEmptyComponent={<HistoryEmptyState />}
  />
</Screen>
```

📐 **Pattern:** Follow TourFeedScreen FlatList optimization patterns

🔗 **Dependency:** TASK-2.1, TASK-2.2, [01-tour-persistence.md#TASK-1.2], [05-shared-tour-card.md]

---

### TASK-2.5: Create History Detail Screen

**Description:** Build the tour detail screen that displays the full tour feed content.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/tour/screens/TourFeedScreen.tsx` (existing feed)
- `src/modules/tour/components/FeedItem.tsx`

**Subtasks:**

- [ ] Create `src/modules/history/screens/HistoryDetailScreen.tsx`
- [ ] Receive `tourId` from route params
- [ ] Fetch tour from `tourHistoryStore` using `getTour(id)`
- [ ] Display tour metadata header (title, description, museum, date)
- [ ] Render feed items using existing `FeedItem` component
- [ ] Add "Edit Tour" action in header
- [ ] Add audio playback for each feed item
- [ ] Handle tour not found error

**Layout:**

```
┌─────────────────────────────────────┐
│ ← Back                    [Edit] ⋮  │  Header
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │        Hero Image               │ │
│ └─────────────────────────────────┘ │
│ Tour Title                          │
│ Museum Name · Date                  │
│ Description text...                 │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │      FeedItem 1                 │ │
│ │      [Audio Player]             │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │      FeedItem 2                 │ │
│ │      [Audio Player]             │ │
│ └─────────────────────────────────┘ │
│ ...                                 │
└─────────────────────────────────────┘
```

📐 **Pattern:** Reuse existing FeedItem component from tour module

⚠️ **SHARED:** This pattern will be reused for Community Tour detail view

🔗 **Dependency:** TASK-2.1, TASK-2.2, [01-tour-persistence.md#TASK-1.2]

---

### TASK-2.6: Implement useHistoryTours Hook

**Description:** Create a hook for fetching and filtering the user's tour history.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/tour/hooks/useTourInitialization.ts`
- `src/store/slices/tourHistoryStore.ts` (from TASK-1.2)

**Subtasks:**

- [ ] Create `src/modules/history/hooks/useHistoryTours.ts`
- [ ] Return all tours from `tourHistoryStore`
- [ ] Implement filtering by search query:
  - Title (case-insensitive contains)
  - Description (case-insensitive contains)
  - Museum name (case-insensitive contains)
  - Date (date range or specific date)
- [ ] Implement sorting options:
  - Most recent first (default)
  - Oldest first
  - Alphabetical by title
- [ ] Memoize filtered results with `useMemo`
- [ ] Add JSDoc documentation
- [ ] Write unit tests

**Hook Interface:**

```typescript
type UseHistoryToursOptions = {
  searchQuery?: string
  sortBy?: 'date-desc' | 'date-asc' | 'title'
}

type UseHistoryToursResult = {
  tours: TourSummary[]
  isLoading: boolean
  isEmpty: boolean
  refetch: () => void
}

function useHistoryTours(
  options?: UseHistoryToursOptions,
): UseHistoryToursResult
```

📐 **Pattern:** Composable hook with options object

🔗 **Dependency:** [01-tour-persistence.md#TASK-1.2]

---

### TASK-2.7: Implement Tour Edit Functionality

**Description:** Allow users to edit tour metadata (title, description, hero image).

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**

- `src/modules/profile/screens/ProfileEditScreen.tsx` (edit pattern)
- `src/shared/components/ui/form/` (form components)
- `react-hook-form` usage patterns

**Subtasks:**

- [ ] Create `src/modules/history/screens/HistoryEditScreen.tsx` or modal
- [ ] Use `react-hook-form` with Zod validation schema
- [ ] Form fields:
  - Title (TextInput, required, max 100 chars)
  - Description (TextArea, optional, max 500 chars)
  - Hero Image (ImagePicker from tour photos)
- [ ] Create `src/modules/history/hooks/useTourActions.ts`:
  - `updateTour(id, updates)` - calls store update
  - `deleteTour(id)` - calls store delete with confirmation
- [ ] Add optimistic updates for immediate feedback
- [ ] Handle validation errors
- [ ] Write tests for edit flow

📐 **Pattern:** Follow ProfileEditScreen form pattern

🔗 **Dependency:** TASK-2.5, [01-tour-persistence.md#TASK-1.2]

---

### TASK-2.8: Implement Tour Delete Functionality

**Description:** Allow users to delete tours from their history with confirmation.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**

- `src/shared/hooks/useBanner.ts` (feedback pattern)
- `Alert` from React Native

**Subtasks:**

- [ ] Add delete action to `useTourActions` hook
- [ ] Implement confirmation dialog using `Alert.alert`:

```typescript
Alert.alert(
  'Delete Tour',
  'Are you sure you want to delete this tour? This cannot be undone.',
  [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Delete', style: 'destructive', onPress: confirmDelete},
  ],
)
```

- [ ] Call `tourHistoryStore.deleteTour(id)` on confirm
- [ ] Show success toast/banner after deletion
- [ ] Navigate back to list if on detail screen
- [ ] Update list immediately (store subscription handles this)

📐 **Pattern:** Standard confirmation dialog flow

🔗 **Dependency:** TASK-2.6, [01-tour-persistence.md#TASK-1.2]

---

### TASK-2.9: Create Empty State Component

**Description:** Design and implement the empty state for when users have no tour history.

**Priority:** Low
**Estimated Complexity:** Low

📁 **Reference:**

- `src/shared/components/ui/` (component patterns)
- Existing empty states in the app

**Subtasks:**

- [ ] Create `src/modules/history/components/HistoryEmptyState.tsx`
- [ ] Display friendly message: "No tours yet"
- [ ] Add illustration or icon (use Material Icons)
- [ ] Include CTA button to start a new tour
- [ ] Add JSDoc documentation
- [ ] Style with theme tokens

**Component:**

```tsx
<Column
  align="center"
  padding="xl">
  <Icon
    name="museum"
    size={64}
    color={theme.colors.textSecondary}
  />
  <Spacer size="md" />
  <Text variant="heading">No Tours Yet</Text>
  <Spacer size="sm" />
  <Text
    variant="body"
    color="textSecondary"
    align="center">
    Start exploring museums and create your first audio tour!
  </Text>
  <Spacer size="lg" />
  <Button onPress={navigateToTour}>Start a Tour</Button>
</Column>
```

📐 **Pattern:** Centered layout with icon, text, and action

---

## Testing Requirements

- Unit tests for `useHistoryTours` hook with various filter combinations
- Unit tests for `useTourActions` hook
- Component tests for `HistoryScreen` with mock data
- Integration tests for edit and delete flows
- Snapshot tests for empty state

## Related Stories

- → [01-tour-persistence.md](./01-tour-persistence.md) - Provides data layer (required)
- → [04-shared-search.md](./04-shared-search.md) - Search component (shared)
- → [05-shared-tour-card.md](./05-shared-tour-card.md) - Tour card component (shared)
- → [03-community-tours-module.md](./03-community-tours-module.md) - Similar module pattern
