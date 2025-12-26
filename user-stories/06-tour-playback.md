# User Story: Pre-made Tour Playback Mode

## Overview

**As a** user
**I want** to follow a pre-made audio tour like a traditional museum guide
**So that** I can enjoy a curated experience without having to photograph artworks myself

## Description

This feature enables playback of pre-made and community tours in a guided, sequential manner. Unlike user-created tours where artworks are added dynamically, pre-made tours have a fixed sequence that users follow. The experience is similar to a traditional audio guide: the user sees which artwork to find next, navigates to it, and listens to the narration before moving on.

## Acceptance Criteria

- [ ] "Start Tour" button initiates guided playback mode
- [ ] Display current artwork to find with image and location hint
- [ ] Play audio narration when user is ready
- [ ] Navigate sequentially through all tour artworks
- [ ] Show progress indicator (e.g., "3 of 12")
- [ ] Allow skipping to next/previous artwork
- [ ] Pause and resume tour at any point
- [ ] Exit tour with confirmation
- [ ] No customization allowed (fixed sequence)

---

## Tasks

### TASK-6.1: Define Playback State Types

**Description:** Create TypeScript types for managing tour playback state.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**
- `src/modules/tour/types.ts` (FeedItem type)
- `src/shared/types/tour.ts` (PersistedTour type)

**Location:** `src/modules/community/types.ts` (extend existing)

**Subtasks:**
- [ ] Add playback types to `src/modules/community/types.ts`:
```typescript
type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'completed'

type TourPlaybackState = {
  tourId: string
  tour: CommunityTour
  currentIndex: number           // Current artwork index (0-based)
  totalItems: number             // Total artworks in tour
  status: PlaybackStatus
  audioProgress: number          // 0-1 playback progress
  startedAt: number              // Timestamp
  completedItems: string[]       // IDs of completed items
}

type PlaybackControls = {
  play: () => void
  pause: () => void
  next: () => void
  previous: () => void
  seekTo: (index: number) => void
  exit: () => void
}
```
- [ ] Add JSDoc documentation

📐 **Pattern:** State machine for playback

---

### TASK-6.2: Create Tour Playback Store

**Description:** Create a Zustand store for managing active tour playback.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/modules/tour/store/useTourStore.ts`
- `src/store/createStore.ts`

**Location:** `src/modules/community/store/usePlaybackStore.ts`

**Subtasks:**
- [ ] Create `src/modules/community/store/` folder with DOCS.md
- [ ] Create `usePlaybackStore.ts`:
```typescript
type PlaybackStoreState = {
  // State
  activeTour: TourPlaybackState | null
  isPlaying: boolean

  // Actions
  startTour: (tour: CommunityTour) => void
  setCurrentIndex: (index: number) => void
  play: () => void
  pause: () => void
  next: () => boolean            // Returns false if at end
  previous: () => boolean        // Returns false if at start
  markItemComplete: (itemId: string) => void
  completeTour: () => void
  exitTour: () => void
  reset: () => void
}
```
- [ ] Use immer for immutable updates
- [ ] Optionally persist partial state for resume functionality
- [ ] Create selectors:
  - `selectCurrentItem`
  - `selectProgress` (e.g., { current: 3, total: 12 })
  - `selectIsFirstItem`, `selectIsLastItem`
- [ ] Add JSDoc documentation
- [ ] Write unit tests

📐 **Pattern:** Zustand store with immer middleware

---

### TASK-6.3: Create Playback Screen

**Description:** Build the main playback screen that displays current artwork and controls.

**Priority:** High
**Estimated Complexity:** High

📁 **Reference:**
- `src/modules/tour/screens/TourObjectDetailScreen.tsx`
- `src/shared/components/features/audio-player/`

**Location:** `src/modules/community/screens/PlaybackScreen.tsx`

**Subtasks:**
- [ ] Create `PlaybackScreen.tsx`
- [ ] Add to screen config as modal (full screen):
```typescript
export const communityModals: StackNavigationRoutes<...> = {
  [CommunityModalName.playback]: {
    component: PlaybackScreen,
    name: CommunityModalName.playback,
    options: {
      headerShown: false,    // Custom header
      presentation: 'fullScreenModal',
    },
  },
}
```
- [ ] Implement screen layout:
```
┌─────────────────────────────────────┐
│ ✕ Exit          3 of 12    [Pause] │  Header
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │        Artwork Image            │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ "The Night Watch"                   │
│ by Rembrandt van Rijn              │
│ Gallery 2, Floor 1                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │       Audio Player              │ │
│ │ ▶ ━━━━━━━━━━━━━━━━━━━━━━ 0:00   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────┐               ┌─────────┐  │
│ │ ← │               │  Next →  │  │
│ │Prev│               │          │  │
│ └─────┘               └─────────┘  │
└─────────────────────────────────────┘
```
- [ ] Connect to `usePlaybackStore`
- [ ] Display current artwork from store
- [ ] Show progress indicator
- [ ] Implement exit confirmation

📐 **Pattern:** Full-screen modal with custom header

🔗 **Dependency:** TASK-6.1, TASK-6.2

---

### TASK-6.4: Create Playback Header Component

**Description:** Custom header with exit, progress, and pause controls.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/ui/navigation/`
- `src/shared/components/ui/pressable/IconButton.tsx`

**Location:** `src/modules/community/components/PlaybackHeader.tsx`

**Subtasks:**
- [ ] Create `src/modules/community/components/PlaybackHeader.tsx`
- [ ] Props:
```typescript
type PlaybackHeaderProps = {
  currentIndex: number
  totalItems: number
  isPaused: boolean
  onExit: () => void
  onPauseToggle: () => void
}
```
- [ ] Layout:
  - Left: Exit button (X icon)
  - Center: Progress text ("3 of 12")
  - Right: Pause/Play button
- [ ] Style with theme tokens
- [ ] Use `SafeAreaView` for status bar
- [ ] Add accessibility labels

📐 **Pattern:** Custom header component

---

### TASK-6.5: Create Playback Controls Component

**Description:** Navigation controls for previous/next artwork.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/ui/pressable/Button.tsx`

**Location:** `src/modules/community/components/PlaybackControls.tsx`

**Subtasks:**
- [ ] Create `src/modules/community/components/PlaybackControls.tsx`
- [ ] Props:
```typescript
type PlaybackControlsProps = {
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  isLastItem: boolean
}
```
- [ ] Layout:
  - Previous button (disabled at start)
  - Next button (changes to "Finish" on last item)
- [ ] Style with prominent Next button
- [ ] Add haptic feedback on press
- [ ] Add accessibility labels

📐 **Pattern:** Control bar component

---

### TASK-6.6: Create Artwork Display Component

**Description:** Display current artwork information during playback.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/modules/tour/components/FeedItem.tsx`
- `src/shared/components/features/thumbnail/`

**Location:** `src/modules/community/components/PlaybackArtwork.tsx`

**Subtasks:**
- [ ] Create `src/modules/community/components/PlaybackArtwork.tsx`
- [ ] Props:
```typescript
type PlaybackArtworkProps = {
  item: FeedItem
  showLocationHint?: boolean
}
```
- [ ] Display:
  - Large artwork image (optimized for viewing)
  - Title and artist
  - Optional location hint (gallery/room)
  - Swipe gesture for image gallery (if multiple photos)
- [ ] Image should be zoomable with pinch gesture
- [ ] Use `expo-image` for performance

📐 **Pattern:** Detail display component

---

### TASK-6.7: Integrate Audio Player for Playback

**Description:** Connect the existing audio player for narration playback.

**Priority:** High
**Estimated Complexity:** Medium

📁 **Reference:**
- `src/shared/components/features/audio-player/AudioPlayer.tsx`

**Subtasks:**
- [ ] Import `AudioPlayer` in `PlaybackScreen`
- [ ] Pass current item's `audioUrl` to player
- [ ] Handle playback events:
  - On audio complete: auto-advance option or wait for user
  - On error: show retry option
- [ ] Sync with playback store state
- [ ] Consider auto-play setting (user preference)
- [ ] Handle audio focus (pause other audio apps)

📐 **Pattern:** Compose existing audio player

---

### TASK-6.8: Create Tour Completion Screen

**Description:** Display completion summary when tour is finished.

**Priority:** Medium
**Estimated Complexity:** Low

📁 **Reference:**
- `src/shared/components/ui/layout/`
- `src/modules/community/components/RatingInput.tsx`

**Location:** `src/modules/community/screens/PlaybackCompleteScreen.tsx` or modal

**Subtasks:**
- [ ] Create completion view (can be modal or screen)
- [ ] Display:
```
┌─────────────────────────────────────┐
│                                     │
│        🎉                           │
│   Tour Complete!                    │
│                                     │
│   You explored 12 artworks          │
│   at Rijksmuseum                    │
│                                     │
│   How was your experience?          │
│   ⭐⭐⭐⭐⭐                          │  Rating input
│                                     │
│   ┌─────────────────────────────┐   │
│   │      Rate & Close           │   │
│   └─────────────────────────────┘   │
│                                     │
│   [Skip rating]                     │
│                                     │
└─────────────────────────────────────┘
```
- [ ] Prompt for rating (→ uses RatingInput from TASK-3.11)
- [ ] Submit rating on confirm
- [ ] Navigate back to community browse or home
- [ ] Optionally save tour to history (visited tours)

📐 **Pattern:** Completion modal with CTA

🔗 **Dependency:** [03-community-tours-module.md#TASK-3.11]

---

### TASK-6.9: Implement Exit Confirmation

**Description:** Show confirmation dialog when user tries to exit mid-tour.

**Priority:** Low
**Estimated Complexity:** Low

📁 **Reference:**
- [02-history-module.md#TASK-2.8] (delete confirmation pattern)

**Subtasks:**
- [ ] Add exit confirmation in `PlaybackScreen`
- [ ] Use `Alert.alert`:
```typescript
Alert.alert(
  'Exit Tour?',
  'Your progress will be lost. Are you sure you want to exit?',
  [
    { text: 'Continue Tour', style: 'cancel' },
    { text: 'Exit', style: 'destructive', onPress: handleExit },
  ]
)
```
- [ ] Clear playback state on confirm
- [ ] Navigate back to previous screen
- [ ] Optional: save progress for later resume

📐 **Pattern:** Confirmation dialog

---

### TASK-6.10: Add Start Tour Action to Detail Screen

**Description:** Connect the "Start Tour" button on community detail to playback mode.

**Priority:** High
**Estimated Complexity:** Low

📁 **Reference:**
- [03-community-tours-module.md#TASK-3.9] (CommunityDetailScreen)
- TASK-6.2 (usePlaybackStore)

**Subtasks:**
- [ ] In `CommunityDetailScreen`:
```typescript
const { startTour } = usePlaybackStore()
const navigation = useNavigation()

const handleStartTour = (): void => {
  startTour(tour)
  navigation.navigate(CommunityModalName.playback)
}
```
- [ ] Add prominent "Start Tour" button at bottom of detail screen
- [ ] Disable button if tour has no audio (edge case)
- [ ] Show loading state while fetching full tour data

📐 **Pattern:** Action trigger navigation

🔗 **Dependency:** TASK-6.2, [03-community-tours-module.md#TASK-3.9]

---

### TASK-6.11: Handle Background Audio

**Description:** Ensure audio continues playing when app is backgrounded.

**Priority:** Low
**Estimated Complexity:** Medium

📁 **Reference:**
- `expo-av` documentation
- `src/shared/components/features/audio-player/`

**Subtasks:**
- [ ] Configure audio session for background playback:
```typescript
Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
})
```
- [ ] Handle app state changes (`AppState.addEventListener`)
- [ ] Pause on phone call or other interruption
- [ ] Resume when interruption ends
- [ ] Consider lock screen controls (future enhancement)

📐 **Pattern:** Background audio handling

---

## Testing Requirements

- Unit tests for playback store actions
- Unit tests for playback state transitions
- Component tests for playback screen
- Integration tests for complete tour flow
- Test audio player integration
- Test exit confirmation flow

## Related Stories

- → [03-community-tours-module.md](./03-community-tours-module.md) - Initiates playback from detail
- → [01-tour-persistence.md](./01-tour-persistence.md) - Uses PersistedTour structure
