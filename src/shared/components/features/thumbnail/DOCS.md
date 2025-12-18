# src/shared/components/features/thumbnail

Image thumbnail display component with optional delete functionality.

## Purpose

The Thumbnail component provides a consistent way to display image thumbnails across the app with standardized sizing and optional deletion capabilities.

## Components

- **Thumbnail.tsx** - Main thumbnail component with three size variants (sm: 60px, md: 100px, lg: 140px) and optional delete button overlay
- **Thumbnail.stories.tsx** - Storybook stories for the Thumbnail component

## Usage

```tsx
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'

// Basic thumbnail
<Thumbnail source={{uri: imageUrl}} size="md" />

// Deletable thumbnail
<Thumbnail
  source={{uri: imageUrl}}
  size="lg"
  deletable
  onDelete={() => handleDelete()}
/>
```
