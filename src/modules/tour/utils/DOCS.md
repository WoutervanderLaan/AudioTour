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
- `processing` → "Processing..."
- `generating_narrative` → "Generating narrative..."
- `generating_audio` → "Generating audio..."
- `ready` → "Ready"
- `error` → "Error occurred"

**Usage**:

```typescript
const statusText = getFeedItemStatusText(feedItem.status)
```

**Location**: `src/modules/tour/utils/getFeedItemStatusText.ts`

**Tests**: Has corresponding unit tests in `getFeedItemStatusText.test.ts`

### permissionContent.ts

Configuration and content generator for camera/photo library permission screens.

**Purpose**: Provides centralized permission screen content (titles, descriptions, benefits) based on the permission type being requested.

**Exports**:

- `PermissionBenefit` - Type for individual permission benefits
- `PermissionContent` - Type for complete permission screen configuration
- `getPermissionContent(sourceType)` - Function to get content configuration

**Signature**:

```typescript
function getPermissionContent(sourceType: MediaSourceType): PermissionContent
```

**Returns**: Configuration object containing:

- `title`: Screen title ("Camera Access Required" or "Photo Library Access Required")
- `icon`: MaterialIcons icon name
- `description`: Explanation of why permission is needed
- `primaryButtonLabel`: Label for permission button
- `benefits`: Array of 3 benefits explaining what user can do

**Usage**:

```typescript
const content = getPermissionContent(MediaSourceType.camera)
```

**Location**: `src/modules/tour/utils/permissionContent.ts`

## Adding New Utilities

When adding new utility functions to this folder:

1. Create a `.ts` file with the function
2. Add corresponding `.test.ts` file for unit tests
3. Export the function for use in tour components/screens
4. Update this DOCS.md file with function documentation
