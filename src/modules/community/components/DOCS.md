# src/modules/community/components

Reusable components specific to the Community Tours module.

## Files

- **CommunityTourCard.tsx** - Tour card for list display with rating and author
- **RatingDisplay.tsx** - Star rating display (read-only)
- **RatingInput.tsx** - Interactive star rating input
- **RecommendedSection.tsx** - Horizontal carousel for recommended tours
- **NearbySection.tsx** - Horizontal carousel for nearby tours
- **CommunityEmptyState.tsx** - Empty state for no results

## Patterns

- All components use react-native-unistyles for styling
- Components accept testID prop for testing
- Use shared UI components from @/shared/components/ui
- Follow arrow function component pattern with explicit return types
