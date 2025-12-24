# src/modules/tour/hooks

This folder contains custom React hooks that orchestrate tour-related functionality.

## Files

### useTourInitialization.ts

Hook for initializing a new tour session with location services and museum detection.

**Purpose**: Requests location permissions, gets user location, finds the nearest museum within 5km radius, and sets up tour session.

**Returns**:

- `isLoading`: Whether initialization is in progress
- `error`: Error message if initialization failed
- `nearestMuseum`: The nearest museum found (if any)
- `isInitialized`: Whether initialization is complete

**Usage**:

```typescript
const {isLoading, error, nearestMuseum, isInitialized} = useTourInitialization()
```

**Location**: `src/modules/tour/hooks/useTourInitialization.ts`

### usePhotoSubmit.ts

Hook that orchestrates the complete photo submission workflow for museum object recognition.

**Purpose**: Manages the multi-step process of:

1. Uploading photos for artwork recognition
2. Generating narrative text from recognized objects
3. Creating audio content from narratives
4. Updating feed item status at each step

**Returns**:

- `submit`: Function to submit photos with optional metadata. Returns tuple with either success (`{feedItemId}`) or error (`{error}`)
- `isLoading`: Combined loading state of all processing steps

**Usage**:

```typescript
const {submit, isLoading} = usePhotoSubmit()
const [result, error] = await submit(photos, metadata)
```

**Location**: `src/modules/tour/hooks/usePhotoSubmit.ts`

### useAddArtwork.ts

Hook that manages the complete workflow for adding artwork via camera or photo library.

**Purpose**: Orchestrates permission checking, permission requesting, and launching the appropriate media picker (camera or photo library). Handles the permission flow by showing the permission modal when needed.

**Returns**:

- `isLaunching`: Whether the artwork addition flow is in progress
- `handleAddArtwork`: Function to start the artwork addition flow (shows action sheet to choose camera or library)

**Usage**:

```typescript
const {isLaunching, handleAddArtwork} = useAddArtwork()
```

**Location**: `src/modules/tour/hooks/useAddArtwork.ts`

### usePermissionRequest.ts

Hook for handling camera and photo library permission requests within the permission modal.

**Purpose**: Provides methods for requesting permissions, opening device settings, and dismissing the permission screen.

**Parameters**:

- `sourceType`: The media source type (`MediaSourceType.camera` or `MediaSourceType.library`)

**Returns**:

- `isRequesting`: Whether a permission request is currently in progress
- `requestPermission`: Function to request permission (returns `true` if granted, `false` otherwise)
- `openSettings`: Function to open device settings
- `skip`: Function to dismiss the permission screen without granting

**Usage**:

```typescript
const {isRequesting, requestPermission, openSettings, skip} =
  usePermissionRequest(sourceType)
```

**Location**: `src/modules/tour/hooks/usePermissionRequest.ts`

### usePermissionCleanup.ts

Hook for handling cleanup callbacks when the permission screen unmounts.

**Purpose**: Ensures that exactly one callback is executed on unmount - either the success callback (if permission was granted) or the dismissal callback (if permission was denied/skipped).

**Parameters**:

- `onPermissionGranted`: Callback to execute when permission was granted
- `onModalDismissed`: Callback to execute when modal was dismissed without granting permission

**Returns**:

- `markPermissionGranted`: Function to mark that permission was granted (call before dismissing modal)

**Usage**:

```typescript
const {markPermissionGranted} = usePermissionCleanup({
  onPermissionGranted,
  onModalDismissed,
})
```

**Location**: `src/modules/tour/hooks/usePermissionCleanup.ts`

### usePhotoGallery.ts

Simple state management hook for photo gallery interactions.

**Purpose**: Manages the currently active photo index in a photo gallery.

**Returns**:

- `activePhotoIndex`: Currently active photo index (0-based)
- `setActivePhotoIndex`: Function to update the active photo index

**Usage**:

```typescript
const {activePhotoIndex, setActivePhotoIndex} = usePhotoGallery()
```

**Location**: `src/modules/tour/hooks/usePhotoGallery.ts`

## Integration

These hooks integrate with:

- Tour API mutations (`src/modules/tour/api/mutations.ts`)
- Tour store actions (`src/modules/tour/store/useTourStore.ts`)
- Camera service (`src/modules/tour/services/cameraService.ts`)
- Global store slices (museum, user session)
