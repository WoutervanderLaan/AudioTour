# History Components

This folder contains UI components specific to the History module.

## Components

### HistoryTourCard

Card component for displaying a tour summary in the history list.

**Props:**

- `tour` - TourSummary object containing tour data
- `onPress` - Callback when the card is pressed

**Features:**

- Displays hero image, title, museum name, date, and artwork count
- Compact horizontal layout for list display
- Press feedback with opacity change

### HistoryEmptyState

Empty state component displayed when the user has no saved tours.

**Props:**

- `testID` - Test identifier for the component

**Features:**

- Museum icon illustration
- Friendly message encouraging the user to start a tour
- CTA button that navigates to the Tour tab

## Usage

```tsx
import {HistoryTourCard} from '@/modules/history/components/HistoryTourCard'
import {HistoryEmptyState} from '@/modules/history/components/HistoryEmptyState'

// Tour card in a list
<HistoryTourCard
  tour={tourSummary}
  onPress={() => navigate('HistoryDetail', { tourId: tour.id })}
/>

// Empty state when no tours
<HistoryEmptyState testID="HistoryScreenEmptyState" />
```

## Styling

All components use the theme system via `react-native-unistyles` and follow the app's design tokens for colors, spacing, and typography.
