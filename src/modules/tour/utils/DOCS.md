# src/modules/tour/utils

This folder contains utility functions specific to the tour module.

## Files

### getFeedItemStatusText.ts

Utility function for converting feed item status codes into human-readable text.

**Purpose**: Provides consistent status text display across tour UI components.

**Signature**:
```typescript
function getFeedItemStatusText(status: FeedItemStatus): string
```

**Status Mappings**:
- `uploading` → "Uploading photos..."
- `generating_narrative` → "Analyzing object..."
- `generating_audio` → "Generating audio..."
- `ready` → "Ready to play"
- `error` → "Error processing object"

**Usage**:
```typescript
const statusText = getFeedItemStatusText(feedItem.status)
```

**Location**: `src/modules/tour/utils/getFeedItemStatusText.ts`

**Tests**: Has corresponding unit tests in `getFeedItemStatusText.test.ts`

## Adding New Utilities

When adding new utility functions to this folder:
1. Create a `.ts` file with the function
2. Add corresponding `.test.ts` file for unit tests
3. Export the function for use in tour components/screens
4. Update this DOCS.md file with function documentation
