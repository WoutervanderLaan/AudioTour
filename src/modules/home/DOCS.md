# Home Module

## Purpose

The home module provides the application's default landing tab. It exists so the
bottom tab navigator always has at least one resolvable tab and a valid initial
route. In this template it renders a simple placeholder screen that new projects
are expected to replace with their primary experience.

## Key Files

- **index.ts** — Module configuration registered with the `ModuleRegistry`. Exposes the `Home` tab.
- **screenConfig.ts** — Tab route configuration (`homeTabs`) mapping the home route to its screen and icon.
- **routes.types.ts** — Route name enum and typed params for the home tab (`HomeTabName`, `HomeTabParams`).
- **screens/** — Screen components rendered by the module.

## Usage Guidelines

- Replace `screens/HomeScreen.tsx` with your app's main screen, or add additional
  stack/modal routes to `screenConfig.ts` following the pattern in other modules.
- The home tab is the navigator's `initialRouteName`; if you rename it, update
  `src/core/navigation/Tabs.tsx` accordingly.
