# src/modules/community/screens

Screen components for the Community Tours module.

## Files

- **CommunityScreen.tsx** - Main browse screen with search, recommendations, and tour list
- **CommunityDetailScreen.tsx** - Tour detail view with full information and start button

## Screen Navigation

- CommunityScreen is the tab entry point (Explore tab)
- CommunityDetailScreen is accessed by tapping a tour card
- Uses React Navigation native stack for transitions

## Layout Patterns

- CommunityScreen uses SectionList with horizontal featured sections
- CommunityDetailScreen uses FlatList with header component
- Both screens support pull-to-refresh
