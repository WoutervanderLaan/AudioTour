# src/modules/tour/components

This folder contains tour-specific UI components used across tour screens.

## Components

### FeedItem.tsx

Displays a single tour item in the feed with photos, loading state, and audio player.

**Props**:

- `feedItem`: Feed item data containing photos, metadata, status, audio URL
- `onPress`: Callback when item is pressed (for navigation to detail view)

**Features**:

- Photo thumbnail display
- Status-based UI updates (uploading, generating narrative, generating audio, ready)
- Integrated audio player when ready
- Loading indicators during processing
- Metadata display (title, artist, year, etc.)

**Location**: `src/modules/tour/components/FeedItem.tsx`

### AddPhoto.tsx

Button component for adding/capturing new photos to the tour.

**Props**:

- `onPress`: Callback when button is pressed
- Standard button props (styling, disabled, etc.)

**Purpose**: Provides consistent UI for triggering photo capture across tour screens.

**Location**: `src/modules/tour/components/AddPhoto.tsx`

### TourPhotoSubmitFormInputs.tsx

Form input components for the photo submission modal.

**Purpose**: Provides form fields for entering optional metadata about captured objects:

- Title
- Artist
- Year
- Material
- Description

**Integration**: Used within TourPhotoSubmitScreen to collect metadata before photo submission.

**Location**: `src/modules/tour/components/TourPhotoSubmitFormInputs.tsx`

## Storybook

All components have corresponding `.stories.tsx` files for development and testing in Storybook.
