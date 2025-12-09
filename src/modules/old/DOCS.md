# src/modules/old

Legacy module containing screens that have not yet been migrated to proper feature modules.

## Structure

- **screens/** - Legacy screen components (Capture, Museum, ObjectDetail, Narrative, Recommendations, Settings, NotFound)
- **routes.types.ts** - Old route type definitions
- **screenConfig.ts** - Old navigation stack configuration
- **index.ts** - Temporary module configuration export

## Purpose

This is a temporary module containing screens from the original implementation. These screens should be migrated to proper feature modules (e.g., capture module, museum module) following the auth module pattern. Once migration is complete, this folder should be removed.
