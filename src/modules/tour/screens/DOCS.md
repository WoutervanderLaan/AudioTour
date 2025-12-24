# src/modules/tour/screens

This folder contains all screen components for the tour module navigation flow.

## Screens

### TourHomeScreen.tsx

Landing screen for starting a new tour.

**Route**: `TourTabName.home`

**Features**:

- App title display
- Call-to-action button to begin tour
- Tour initialization using `useTourInitialization` hook
- Displays nearest museum if detected
- Navigation to TourFeedScreen on tour start

**Location**: `src/modules/tour/screens/TourHomeScreen.tsx`

### TourFeedScreen.tsx

Main tour interface showing a feed of captured objects.

**Route**: `TourRouteName.feed`

**Features**:

- Feed list displaying captured tour items
- Add artwork button for capturing new objects (camera or photo library)
- Loading states during audio generation
- Navigation to object detail screen
- Empty state when no items captured
- Uses `AddArtworkButton` component for photo capture flow

**Location**: `src/modules/tour/screens/TourFeedScreen.tsx`

### TourCameraPermissionScreen.tsx

Modal screen that requests camera or photo library permission from the user.

**Route**: `TourModalName.cameraPermission` (modal presentation)

**Features**:

- Permission request for camera or photo library
- User-friendly explanation of benefits
- Request permission button
- Skip/Not Now option
- Open Settings option
- Dynamic content based on source type (camera vs library)

**Location**: `src/modules/tour/screens/TourCameraPermissionScreen.tsx`

### TourPhotoSubmitScreen.tsx

Modal screen for submitting captured photos with optional metadata.

**Route**: `TourRouteName.photoSubmit` (modal presentation)

**Features**:

- Multi-photo support (add/delete)
- Form fields: title, artist, year, material, description
- Photo submission using `usePhotoSubmit` hook
- Submit and cancel actions
- Validation and error handling
- Automatic navigation to feed on successful submission

**Location**: `src/modules/tour/screens/TourPhotoSubmitScreen.tsx`

### TourObjectDetailScreen.tsx

Detailed view of a captured museum object.

**Route**: `TourRouteName.objectDetail`

**Features**:

- Photo gallery (swipeable for multiple photos)
- All metadata fields display
- Generated narrative text
- Integrated audio player
- Recognition confidence indicator
- Back navigation to feed

**Location**: `src/modules/tour/screens/TourObjectDetailScreen.tsx`

## Navigation Flow

1. **TourHomeScreen** → Initialize tour → Navigate to TourFeedScreen
2. **TourFeedScreen** → Press "Add Artwork" → Show action sheet (camera or library)
3. **Action Sheet** → Select source → Check permission → Show TourCameraPermissionScreen (modal) if needed
4. **TourCameraPermissionScreen** → Grant permission → Launch camera/library → Navigate to TourPhotoSubmitScreen (modal)
5. **TourPhotoSubmitScreen** → Submit → Navigate back to TourFeedScreen
6. **TourFeedScreen** → Press feed item → Navigate to TourObjectDetailScreen

## Integration

Screens are registered in `screenConfig.ts` and integrated into the app navigation via the ModuleRegistry.
