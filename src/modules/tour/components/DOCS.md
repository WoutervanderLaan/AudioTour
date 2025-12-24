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

### AddArtworkButton.tsx

Button component for adding/capturing new artwork photos to the tour.

**Props**:

- `onPress`: Callback when button is pressed
- Standard button props (styling, disabled, etc.)

**Purpose**: Provides consistent UI for triggering artwork photo capture across tour screens.

**Location**: `src/modules/tour/components/AddArtworkButton.tsx`

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

### ObjectDetails.tsx

Displays comprehensive object information including description, narrative, audio, and recognition confidence.

**Props**:

- `description`: Optional object description
- `recognitionConfidence`: Recognition confidence percentage (0-100)
- `objectId`: Object ID from recognition
- `narrativeText`: Generated narrative text
- `audioUrl`: Audio file URL for playback
- `status`: Processing status of the feed item

**Features**:

- Displays object description and narrative
- Shows recognition confidence when available
- Integrated audio player for ready items
- Status-aware rendering

**Location**: `src/modules/tour/components/ObjectDetails.tsx`

### ObjectMetadata.tsx

Displays basic object metadata in a formatted layout.

**Props**:

- `metadata`: Object metadata (title, artist, year, material)

**Features**:

- Displays title, artist name
- Shows year and material when available
- Null-safe rendering (returns null if no metadata)

**Location**: `src/modules/tour/components/ObjectMetadata.tsx`

### ObjectNotFound.tsx

Error state component displayed when an object cannot be found.

**Purpose**: Shows a user-friendly message when navigating to a non-existent object detail.

**Location**: `src/modules/tour/components/ObjectNotFound.tsx`

### PhotoGallery.tsx

Photo gallery component with main photo display, indicators, and thumbnail strip.

**Props**:

- `photos`: Array of photo URIs to display
- `activePhotoIndex`: Currently active photo index
- `onPhotoSelect`: Callback when a photo is selected

**Features**:

- Main photo display (full width)
- Dot indicators for multiple photos
- Thumbnail strip for quick photo navigation
- Responsive sizing based on screen dimensions

**Location**: `src/modules/tour/components/PhotoGallery.tsx`

### PermissionActions.tsx

Action buttons for camera/library permission requests.

**Props**:

- `primaryButtonLabel`: Label for the primary action button
- `isDisabled`: Whether actions are disabled during request
- `onPrimaryAction`: Handler for enable permission action
- `onSkip`: Handler for skip action
- `onOpenSettings`: Handler for opening device settings

**Purpose**: Provides consistent permission action buttons across permission screens.

**Location**: `src/modules/tour/components/PermissionActions.tsx`

### PermissionBenefit.tsx

Displays a single permission benefit with icon and description.

**Props**:

- `icon`: MaterialIcons icon name
- `title`: Benefit title
- `description`: Benefit description

**Purpose**: Used within PermissionContent to display individual benefits of granting permission.

**Location**: `src/modules/tour/components/PermissionBenefit.tsx`

### PermissionContent.tsx

Displays permission request content including icon, title, description, and benefits list.

**Props**:

- `content`: Permission content configuration object

**Purpose**: Central component for rendering permission request screens with consistent formatting.

**Location**: `src/modules/tour/components/PermissionContent.tsx`

## Storybook

Components with `.stories.tsx` files available for development and testing in Storybook:

- `FeedItem.stories.tsx`
- `ObjectDetails.stories.tsx`
- `PhotoGallery.stories.tsx`
