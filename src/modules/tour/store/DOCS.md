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

```typescript
import { useTourStore } from '@/modules/tour/store/useTourStore'

// Add a feed item
const addFeedItem = useTourStore(state => state.addFeedItem)
const feedItemId = addFeedItem([photoUri1, photoUri2], {
  title: 'The Starry Night',
  artist: 'Vincent van Gogh'
})

// Get feed items
const feedItems = useTourStore(state => state.feedItems)

// Update a feed item
const updateFeedItem = useTourStore(state => state.updateFeedItem)
updateFeedItem(feedItemId, {
  status: 'ready',
  narrativeText: 'Generated narrative...',
  audioUrl: 'https://...'
})

// Get specific feed item
const getFeedItem = useTourStore(state => state.getFeedItem)
const item = getFeedItem(feedItemId)
```

## Related Files

- `useTourStore.ts` - Main store implementation
- `../hooks/usePhotoSubmit.ts` - Uses store to manage photo submission workflow
- `../screens/TourFeedScreen.tsx` - Displays feed items from store
- `../screens/TourObjectDetailScreen.tsx` - Shows individual feed item details
