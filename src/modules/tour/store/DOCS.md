# Tour Store

State management for the tour module using Zustand.

## Overview

The tour store manages the state for active audio tour sessions, including:

- Feed items collection
- Loading states
- Tour session management

## Store Structure

### Types

#### FeedItemStatus

Status progression for a tour feed item:

- `uploading` - Photos being uploaded
- `processing` - Artwork recognition in progress
- `generating_narrative` - Narrative text being generated
- `generating_audio` - Audio file being created
- `ready` - Item fully processed and ready
- `error` - Processing failed

#### FeedItemMetadata

Optional metadata about a museum object:

- `title` - Object title
- `artist` - Artist name
- `year` - Year of creation
- `material` - Material/medium
- `description` - Object description

#### FeedItem

Represents a single item in the tour feed with:

- `id` - Unique identifier
- `photos` - Array of photo URIs
- `metadata` - Optional object metadata
- `status` - Current processing status
- `objectId` - Recognized object ID
- `recognitionConfidence` - Recognition confidence (0-100)
- `narrativeText` - Generated narrative
- `audioUrl` - Generated audio URL
- `error` - Error message if status is error
- `createdAt` - Creation timestamp

### State

- `feedItems: FeedItem[]` - Array of tour feed items
- `feedLoading: boolean` - Loading state for feed operations

### Actions

- `addFeedItem(photos, metadata)` - Add a new feed item and return its ID
- `updateFeedItem(id, updates)` - Update an existing feed item by ID
- `setFeedLoading(loading)` - Set the feed loading state
- `getFeedItem(id)` - Get a feed item by ID
- `reset()` - Reset all tour state to initial values

## Usage

### Recommended: Use Selector Hooks

The tour store provides dedicated selector hooks for cleaner, more maintainable code. Always prefer these over direct store access.

```typescript
import {
  useFeedItems,
  useFeedLoading,
  useFeedItem,
  useHasActiveTour,
  useTourActions,
} from '@/modules/tour/store/selectors'

// Get state values
const feedItems = useFeedItems()
const feedLoading = useFeedLoading()
const feedItem = useFeedItem(itemId)
const hasActiveTour = useHasActiveTour()

// Get actions
const {addFeedItem, updateFeedItem, setFeedLoading, reset} = useTourActions()

// Use actions
const feedItemId = addFeedItem([photoUri1, photoUri2], {
  title: 'The Starry Night',
  artist: 'Vincent van Gogh',
})

updateFeedItem(feedItemId, {
  status: 'ready',
  narrativeText: 'Generated narrative...',
  audioUrl: 'https://...',
})
```

### Available Selectors

#### Value Selectors

- `useFeedItems()` - Returns all feed items
- `useFeedLoading()` - Returns feed loading state
- `useFeedItem(id)` - Returns a specific feed item by ID

#### Derived Selectors

- `useHasActiveTour()` - Returns true if there are any feed items
- `useFeedItemCount()` - Returns the total number of feed items
- `useHasPendingItems()` - Returns true if any items are still processing

#### Action Selectors

- `useTourActions()` - Returns all action functions (addFeedItem, updateFeedItem, setFeedLoading, reset)

### Direct Store Access (Not Recommended)

Only use direct store access when absolutely necessary:

```typescript
import {useTourStore} from '@/modules/tour/store/useTourStore'

const feedItems = useTourStore(state => state.feedItems)
```

## Best Practices

1. **Always use selector hooks** instead of direct store access for better performance and maintainability
2. **Use `useTourActions()`** to get action functions rather than individual selectors
3. **Use derived selectors** like `useHasActiveTour()` for computed state values
4. **Keep store updates atomic** - update feed items in single operations when possible

## Related Files

- `useTourStore.ts` - Main store implementation
- `selectors.ts` - Selector hooks for accessing store state
- `../hooks/usePhotoSubmit.ts` - Uses store to manage photo submission workflow
- `../screens/TourFeedScreen.tsx` - Displays feed items from store
- `../screens/TourObjectDetailScreen.tsx` - Shows individual feed item details
