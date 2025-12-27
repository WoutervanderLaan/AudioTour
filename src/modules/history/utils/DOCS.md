# src/modules/history/utils

Utility functions for the history module, primarily for generating tour metadata.

## Files

- **tourTitleGenerator.ts** - Functions for auto-generating tour titles and descriptions
- **tourTitleGenerator.test.ts** - Unit tests for title generator utilities

## Functions

### generateTourTitle(items, museumName)

Generates a title for a tour based on available information:

1. If valid museum name provided: `"{MuseumName} Tour"`
2. If single artwork with title: `"Tour: {ArtworkTitle}"`
3. Otherwise: `"Art Tour - {count} Artworks"`

### generateTourDescription(items)

Generates a description by combining artwork information:

- Uses title and artist from first 3 items with metadata
- Truncates to 150 characters maximum
- Falls back to generic count-based description

### getHeroImageUri(items)

Selects the hero image for a tour:

- Returns first available photo from feed items
- Skips items without photos
- Returns empty string if no photos available

## Usage

```typescript
import {
  generateTourTitle,
  generateTourDescription,
  getHeroImageUri,
} from '@/modules/history/utils/tourTitleGenerator'

const title = generateTourTitle(feedItems, 'Rijksmuseum')
// "Rijksmuseum Tour"

const description = generateTourDescription(feedItems)
// "Featuring The Starry Night by Van Gogh, Mona Lisa by da Vinci"

const heroImage = getHeroImageUri(feedItems)
// "photo1.jpg"
```
