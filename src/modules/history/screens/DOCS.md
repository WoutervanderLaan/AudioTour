# History Screens

This folder contains screen components for the History module.

## Screens

### HistoryScreen

Main history interface displaying a scrollable list of saved tours.

**Features:**

- FlatList with tour cards
- Pull-to-refresh support
- Empty state when no tours exist
- Loading indicator during data fetch
- Optimized rendering with memoization

**Navigation:**

- Tab: HistoryTab (bottom navigation)
- Pressing a tour card navigates to HistoryDetail

### HistoryDetailScreen

Full tour detail view with metadata and feed items.

**Route Params:**

- `tourId` - ID of the tour to display

**Features:**

- Hero image display
- Tour metadata (title, museum, date, description)
- Artwork count label
- Full list of FeedItem components
- Audio playback for each artwork
- Reuses FeedItem component from tour module

**Layout:**

```text
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
│ ...                                 │
└─────────────────────────────────────┘
```

## Navigation Configuration

Screens are configured in `screenConfig.ts`:

- `HistoryRouteName.list` - Main history list (also tab screen)
- `HistoryRouteName.detail` - Tour detail view

## Usage

Screens are registered automatically through the module registry. Navigation is handled via the `useNavigation` hook.

```tsx
import {useNavigation} from '@/shared/hooks/useNavigation'
import {HistoryRouteName} from '@/modules/history/routes.types'

const {navigate} = useNavigation()
navigate(HistoryRouteName.detail, {tourId: 'tour-123'})
```
