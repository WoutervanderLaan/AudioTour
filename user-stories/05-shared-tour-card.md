# User Story: Shared Tour Card Component

## Overview

**As a** developer
**I want** a reusable tour card component
**So that** tour lists in History and Community modules have consistent appearance and behavior

## Description

This shared feature provides a reusable card component for displaying tour summaries in lists. The card shows key tour information (hero image, title, location, date, rating) and supports various actions (tap, edit, delete, share). It's designed to be flexible enough for both personal history tours and community tours.

## Acceptance Criteria

- [ ] Card displays hero image, title, description, location, and date
- [ ] Optional rating display for community tours
- [ ] Optional action buttons (edit, delete, share)
- [ ] Consistent styling across History and Community modules
- [ ] Proper image loading states and fallbacks
- [ ] Accessible with proper touch targets and labels
- [ ] Compact and full-size variants

---

## Tasks

### TASK-5.1: Define Tour Card Props Interface

**Description:** Create a comprehensive props interface that supports all use cases.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/types/tour.ts` (TourSummary type from TASK-1.1)
- `src/modules/tour/components/FeedItem.tsx` (existing card pattern)

**Location:** `src/shared/components/features/tour-card/types.ts`

**Subtasks:**
- [ ] Create folder `src/shared/components/features/tour-card/`
- [ ] Create `types.ts` with:
```typescript
import { TourSummary } from '@/shared/types/tour'

type TourCardVariant = 'full' | 'compact' | 'horizontal'

type TourCardActions = {
  onPress?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onShare?: () => void
}

type TourCardProps = {
  tour: TourSummary
  variant?: TourCardVariant
  showRating?: boolean
  showDate?: boolean
  showLocation?: boolean
  showActions?: boolean
  actions?: TourCardActions
  testID?: string
}
```
- [ ] Add JSDoc documentation for all types

📐 **Pattern:** Flexible props with sensible defaults

🔗 **Dependency:** [01-tour-persistence.md#TASK-1.1]

---

### TASK-5.2: Create Tour Card Component

**Description:** Build the main tour card component with all variants.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/modules/tour/components/FeedItem.tsx`
- `src/shared/components/features/thumbnail/Thumbnail.tsx`
- `src/shared/components/ui/layout/` (layout components)

**Location:** `src/shared/components/features/tour-card/TourCard.tsx`

**Subtasks:**
- [ ] Create `TourCard.tsx`
- [ ] Implement three variants:

**Full Variant (for lists):**
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │        Hero Image               │ │
│ │        (16:9 ratio)             │ │
│ └─────────────────────────────────┘ │
│ Tour Title                          │
│ 📍 Museum Name                      │
│ 📅 Dec 25, 2025                     │
│ ⭐ 4.2 (optional)                   │
└─────────────────────────────────────┘
```

**Compact Variant (for grids/carousels):**
```
┌───────────────────┐
│ ┌───────────────┐ │
│ │  Hero Image   │ │
│ │   (1:1)       │ │
│ └───────────────┘ │
│ Tour Title        │
│ 📍 Museum         │
└───────────────────┘
```

**Horizontal Variant (for featured sections):**
```
┌─────────────────────────────────┐
│ ┌──────┐                        │
│ │ Img  │ Tour Title             │
│ │ 1:1  │ 📍 Museum · ⭐ 4.2     │
│ └──────┘                        │
└─────────────────────────────────┘
```

- [ ] Use `Pressable` for touch handling
- [ ] Implement image loading with placeholder
- [ ] Add action buttons overlay (if `showActions`)
- [ ] Style with theme tokens
- [ ] Add accessibility labels
- [ ] Add JSDoc documentation

📐 **Pattern:** Presentational component with variants

🔗 **Dependency:** TASK-5.1

---

### TASK-5.3: Create Tour Card Image Component

**Description:** Create a specialized image component for tour hero images with loading states.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/features/thumbnail/Thumbnail.tsx`
- `expo-image` or React Native Image

**Location:** `src/shared/components/features/tour-card/TourCardImage.tsx`

**Subtasks:**
- [ ] Create `TourCardImage.tsx`
- [ ] Props: `uri: string`, `aspectRatio: '16:9' | '1:1'`, `fallbackIcon?: string`
- [ ] Features:
  - Loading placeholder (skeleton or blur)
  - Error fallback (generic tour icon)
  - Smooth fade-in on load
  - Proper sizing with aspect ratio
- [ ] Use `expo-image` for performance if available
- [ ] Add accessibility: `accessibilityRole="image"`
- [ ] Write unit tests

📐 **Pattern:** Image component with states

---

### TASK-5.4: Create Tour Card Metadata Component

**Description:** Create a sub-component for displaying tour metadata (location, date, rating).

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/ui/typography/Text.tsx`
- `src/shared/components/ui/layout/Row.tsx`

**Location:** `src/shared/components/features/tour-card/TourCardMeta.tsx`

**Subtasks:**
- [ ] Create `TourCardMeta.tsx`
- [ ] Props:
```typescript
type TourCardMetaProps = {
  location?: string
  date?: number              // Timestamp
  rating?: number
  ratingCount?: number
  variant?: 'full' | 'compact'
}
```
- [ ] Display with icons:
  - 📍 Location (location-on icon)
  - 📅 Date (formatted: "Dec 25, 2025")
  - ⭐ Rating with count
- [ ] Compact variant shows inline, full variant shows stacked
- [ ] Use relative date for recent tours ("Today", "Yesterday", "3 days ago")
- [ ] Create date formatting utility

📐 **Pattern:** Sub-component for composition

---

### TASK-5.5: Create Tour Card Actions Component

**Description:** Create overlay action buttons for edit, delete, and share.

**Priority:** Medium
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/shared/components/ui/pressable/IconButton.tsx`

**Location:** `src/shared/components/features/tour-card/TourCardActions.tsx`

**Subtasks:**
- [ ] Create `TourCardActions.tsx`
- [ ] Props:
```typescript
type TourCardActionsProps = {
  onEdit?: () => void
  onDelete?: () => void
  onShare?: () => void
  position?: 'top-right' | 'bottom-right'
}
```
- [ ] Display as:
  - Icon buttons in corner (three-dot menu or individual icons)
  - Or dropdown menu on press
- [ ] Use `IconButton` with proper hit slop
- [ ] Style with semi-transparent background
- [ ] Add accessibility labels for each action
- [ ] Stop event propagation to prevent card press

📐 **Pattern:** Overlay component with actions

---

### TASK-5.6: Create Date Formatting Utility

**Description:** Create a utility for formatting tour dates with relative display.

**Priority:** Low
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/utils/` (utility patterns)

**Location:** `src/shared/utils/dateFormatter.ts`

**Subtasks:**
- [ ] Create `src/shared/utils/dateFormatter.ts`
- [ ] Functions:
```typescript
/**
 * Formats a timestamp as a relative or absolute date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string
 */
function formatTourDate(timestamp: number): string

/**
 * Returns relative time string for recent dates
 * @param timestamp - Unix timestamp in milliseconds
 * @returns "Today", "Yesterday", "3 days ago", or formatted date
 */
function getRelativeDate(timestamp: number): string
```
- [ ] Relative dates for within 7 days
- [ ] Absolute dates beyond 7 days
- [ ] Support for different locales (future enhancement)
- [ ] Write comprehensive unit tests

📐 **Pattern:** Pure utility functions

---

### TASK-5.7: Export and Document Tour Card

**Description:** Create proper exports and documentation for the tour card feature.

**Priority:** Low
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/features/` (existing feature exports)

**Subtasks:**
- [ ] Create `src/shared/components/features/tour-card/index.ts`:
```typescript
export { TourCard } from './TourCard'
export type { TourCardProps, TourCardVariant, TourCardActions } from './types'
```
- [ ] Create `src/shared/components/features/tour-card/DOCS.md`:
```markdown
# Tour Card Component

## Purpose
Reusable card component for displaying tour summaries in lists and grids.

## Usage
Used by History and Community modules for tour listings.

## Variants
- `full`: Full-width card for vertical lists
- `compact`: Square card for grids and carousels
- `horizontal`: Wide card for featured sections

## Key Files
- TourCard.tsx - Main component
- TourCardImage.tsx - Image with loading states
- TourCardMeta.tsx - Metadata display
- TourCardActions.tsx - Action buttons
- types.ts - TypeScript definitions
```
- [ ] Update `src/shared/components/features/index.ts` to include tour-card

📐 **Pattern:** Standard feature folder documentation

---

### TASK-5.8: Integrate in History Module

**Description:** Use the shared TourCard in the History module.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- [02-history-module.md#TASK-2.4] (HistoryScreen)

**Subtasks:**
- [ ] Import `TourCard` in `HistoryScreen.tsx`
- [ ] Configure for history use:
```tsx
<TourCard
  tour={tourSummary}
  variant="full"
  showRating={false}
  showDate={true}
  showLocation={true}
  showActions={true}
  actions={{
    onPress: () => navigateToDetail(tour.id),
    onEdit: () => openEditModal(tour.id),
    onDelete: () => confirmDelete(tour.id),
  }}
/>
```
- [ ] Test rendering and interactions

📐 **Pattern:** Consume shared component

⚠️ **SHARED:** Same component used in Community module

🔗 **Dependency:** TASK-5.2, [02-history-module.md#TASK-2.4]

---

### TASK-5.9: Integrate in Community Module

**Description:** Use the shared TourCard in the Community Tours module.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- [03-community-tours-module.md#TASK-3.6] (CommunityScreen)

**Subtasks:**
- [ ] Import `TourCard` in `CommunityScreen.tsx`
- [ ] Configure for community use:
```tsx
<TourCard
  tour={tourSummary}
  variant="full"
  showRating={true}
  showDate={true}
  showLocation={true}
  showActions={false}  // No edit/delete for community
  actions={{
    onPress: () => navigateToDetail(tour.id),
  }}
/>
```
- [ ] Use `compact` variant for featured section carousel
- [ ] Use `horizontal` variant for nearby tours section
- [ ] Test rendering and interactions

📐 **Pattern:** Consume shared component with different config

🔗 **Dependency:** TASK-5.2, [03-community-tours-module.md#TASK-3.6]

---

## Testing Requirements

- Unit tests for TourCard with all variants
- Unit tests for date formatting utility
- Component tests for image loading states
- Snapshot tests for each variant
- Accessibility tests for touch targets and labels

## Related Stories

- → [01-tour-persistence.md](./01-tour-persistence.md) - Provides TourSummary type
- → [02-history-module.md](./02-history-module.md) - Uses TourCard
- → [03-community-tours-module.md](./03-community-tours-module.md) - Uses TourCard
