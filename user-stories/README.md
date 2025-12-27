# User Stories & Feature Descriptions

This folder contains user stories and feature descriptions for new AudioTour functionality related to tour history, sharing, and community/pre-made tours.

## Overview

The new features revolve around:

1. **Storing tours** - Persisting user-created audio tours
2. **Tour History** - Browsing and managing personal audio tour history
3. **Community Tours** - Browsing pre-made and community-shared tours

## User Story Files

| File                                                           | Description                          | Status     |
| -------------------------------------------------------------- | ------------------------------------ | ---------- |
| [01-tour-persistence.md](./01-tour-persistence.md)             | Core tour storage and data model     | Foundation |
| [02-history-module.md](./02-history-module.md)                 | Personal tour history browsing       | Feature    |
| [03-community-tours-module.md](./03-community-tours-module.md) | Community/pre-made tour browsing     | Feature    |
| [04-shared-search.md](./04-shared-search.md)                   | Shared search functionality          | Shared     |
| [05-shared-tour-card.md](./05-shared-tour-card.md)             | Shared tour card/list item component | Shared     |
| [06-tour-playback.md](./06-tour-playback.md)                   | Pre-made tour playback mode          | Feature    |

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                        Tour Playback (06)                        │
│                              ▲                                   │
├──────────────────────────────┼──────────────────────────────────┤
│     History Module (02)      │    Community Tours Module (03)   │
│            ▲                 │              ▲                   │
├────────────┼─────────────────┼──────────────┼───────────────────┤
│            └──────┬──────────┴──────────────┘                   │
│                   │                                              │
│         ┌─────────┴─────────┐                                   │
│         │                   │                                   │
│   Shared Search (04)   Tour Card (05)                           │
│         │                   │                                   │
│         └─────────┬─────────┘                                   │
│                   │                                              │
│                   ▼                                              │
│          Tour Persistence (01)                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Implementation Order

### Phase 1: Foundation

1. **01-tour-persistence.md** - Must be implemented first as it provides the data layer

### Phase 2: Shared Components

2. **05-shared-tour-card.md** - Reusable card component for tour lists
3. **04-shared-search.md** - Reusable search/filter functionality

### Phase 3: Core Features (can be parallelized)

4. **02-history-module.md** - Personal history module
5. **03-community-tours-module.md** - Community tours module

### Phase 4: Enhanced Features

6. **06-tour-playback.md** - Pre-made tour playback mode

## Cross-Module Task References

Tasks that appear in multiple stories are linked using the format:

- `→ See [filename.md#task-id]` for cross-references
- `⚠️ SHARED` prefix for tasks that benefit multiple features

## Codebase Pattern References

Each task includes references to existing codebase patterns:

- `📁 Reference:` points to existing files/folders to use as templates
- `📐 Pattern:` describes the architectural pattern to follow
- `🔗 Dependency:` notes dependencies on other tasks or external factors
