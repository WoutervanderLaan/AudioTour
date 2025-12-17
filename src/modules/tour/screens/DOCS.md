# src/modules/tour/screens

This folder contains all screen components for the tour module navigation flow.

## Screens

### TourHomeScreen.tsx

Landing screen for starting a new tour.

**Route**: `TourRouteName.home`

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
- Camera button for capturing new objects
- Loading states during audio generation
- Pull-to-refresh functionality
- Navigation to camera and object detail screens
- Empty state when no items captured

**Location**: `src/modules/tour/screens/TourFeedScreen.tsx`

### TourCameraScreen.tsx

Camera interface for capturing photos of museum objects.

**Route**: `TourRouteName.camera`

**Features**:
- Camera permission handling
- Live camera preview
- Photo capture functionality
- Navigation to photo submit modal after capture
- Cancel navigation back to feed

**Location**: `src/modules/tour/screens/TourCameraScreen.tsx`

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
2. **TourFeedScreen** → Press camera → Navigate to TourCameraScreen
3. **TourCameraScreen** → Capture photo → Navigate to TourPhotoSubmitScreen (modal)
4. **TourPhotoSubmitScreen** → Submit → Navigate back to TourFeedScreen
5. **TourFeedScreen** → Press feed item → Navigate to TourObjectDetailScreen

## Integration

Screens are registered in `screenConfig.ts` and integrated into the app navigation via the ModuleRegistry.
