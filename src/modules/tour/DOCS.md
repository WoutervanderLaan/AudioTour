# Tour Module

## Overview

The Tour module handles the complete audio tour experience, from initialization to object capture, narrative generation, and audio playback.

## Features

- **Tour Initialization**: Start new tours with location-based museum detection
- **Photo Capture**: Capture multiple photos of museum objects with camera integration
- **Object Recognition**: Upload photos for AI-powered object recognition
- **Narrative Generation**: Generate contextual narratives for captured objects
- **Audio Playback**: Stream and play generated audio tours
- **Feed Interface**: Chat-like feed displaying tour items and audio
- **Object Details**: Detailed view of captured objects with metadata

## Screens

### TourHomeScreen

Landing screen for starting a new tour. Displays app title and call-to-action to begin a new tour session.

**Route**: `TourRouteName.home`

### TourFeedScreen

Main tour interface showing a feed of captured objects. Features:

- Feed items with photos and audio
- Camera button for capturing new objects
- Loading states during audio generation
- Navigation to object details

**Route**: `TourRouteName.feed`

### TourCameraScreen

Camera interface for capturing photos of museum objects. Handles camera permissions and photo capture.

**Route**: `TourRouteName.camera`

### TourPhotoSubmitScreen (Modal)

Modal screen for submitting captured photos with optional metadata. Features:

- Multi-photo support (add/delete)
- Form fields: title, artist, year, material, description
- Submit and cancel actions

**Route**: `TourRouteName.photoSubmit` (modal)

### TourObjectDetailScreen

Detailed view of a captured object showing:

- Photo gallery (swipeable for multiple photos)
- All metadata fields
- Generated narrative text
- Audio player
- Recognition confidence

**Route**: `TourRouteName.objectDetail`

## API Endpoints

The module integrates with the following API endpoints:

- `POST /process-artwork` - Upload photos for object recognition
- `POST /generate-narrative` - Generate narrative text for an object
- `POST /generate-audio` - Generate audio from narrative text

See `src/modules/tour/api/` for mutation hooks.

## State Management

Tour state is managed through:

- `src/store/slices/tourStore.ts` - Tour session and feed items
- `src/store/slices/museumStore.ts` - Museum location and context
- `src/store/slices/userSessionStore.ts` - User session tracking

## Hooks

### useTourInitialization

Initializes a new tour session with location services and museum detection.

**Location**: `src/modules/tour/hooks/useTourInitialization.ts`

**Usage**:

```typescript
const {initialize, isLoading, error, nearestMuseum} = useTourInitialization()
```

### useProcessArtwork

Mutation hook for uploading photos and getting object recognition.

**Location**: `src/modules/tour/api/useTourMutations.ts`

### useGenerateNarrative

Mutation hook for generating narrative text from object data.

**Location**: `src/modules/tour/api/useTourMutations.ts`

### useGenerateAudio

Mutation hook for generating audio from narrative text.

**Location**: `src/modules/tour/api/useTourMutations.ts`

## Components

### FeedItem

Displays a single tour item in the feed with photos, loading state, and audio player.

**Location**: `src/modules/tour/components/FeedItem.tsx`

## Architecture Notes

- Follows feature-based architecture with strict module boundaries
- Only imports from `@/shared` and `@/store`
- Uses TanStack Query for all API calls
- Implements TypeScript strictly with no `any` types
- Adheres to ESLint rules (max 300 lines/file, max 120 lines/function, etc.)
