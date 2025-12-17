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

## Integration

These hooks integrate with:

- Tour API mutations (`src/modules/tour/api/useTourMutations.ts`)
- Tour store actions (`src/modules/tour/store/useTourStore.ts`)
- Global store slices (museum, user session)
