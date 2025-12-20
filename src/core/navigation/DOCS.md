# src/core/navigation

Navigation infrastructure and module registry system.

## Files

- **RootNavigator.tsx** - Root navigation component
- **ModuleRegistry.ts** - Dynamic module registration system with two-phase dependency resolution
- **types.ts** - Navigation type definitions
- **Tabs.tsx** - Bottom tab navigation component
- **BlurBackground.tsx** - Blur overlay component for navigation stacks
- **ProfileHeaderButton.tsx** - Profile header button component
- **constants.ts** - Navigation constants

## Purpose

Provides the navigation infrastructure for the app using React Navigation. The ModuleRegistry allows feature modules to register their navigation stacks dynamically, enabling a modular architecture where features can be added/removed independently.

## Module Registration System

The ModuleRegistry uses a **two-phase registration process** to ensure order-independent module registration:

### Phase 1: Collection

During the collection phase, modules are registered via `moduleRegistry.register()`. Modules are added to a pending list without dependency validation. This means:

- Modules can be registered in any order
- Registration order does not matter
- No dependencies are checked during this phase

### Phase 2: Dependency Resolution

After all modules are collected, `moduleRegistry.resolveDependencies()` is called to:

- Validate module dependencies against the complete set of collected modules
- Only register modules with satisfied dependencies
- Call each module's `onRegister()` hook
- Log warnings for modules with missing dependencies

### Example

```typescript
// In src/modules/modules.ts
export const registerModules = (): void => {
  // Phase 1: Collect all modules (order doesn't matter)
  moduleRegistry.register(authModule)
  moduleRegistry.register(notificationsModule)
  moduleRegistry.register(profileModule)
  moduleRegistry.register(onboardingModule)
  moduleRegistry.register(tourModule)

  // Phase 2: Resolve dependencies and finalize registration
  moduleRegistry.resolveDependencies()
}
```

This two-phase approach ensures that module registration is robust and doesn't require careful ordering of module registrations.
