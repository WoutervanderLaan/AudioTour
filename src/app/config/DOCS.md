# src/app/config

This folder contains application-level configuration, including module registration and initialization.

## Files

- `modules.ts` - Central registration point for all application modules. Modules are registered with the ModuleRegistry to be included in the application navigation and lifecycle.

## Adding New Modules

To add a new module to the application:

1. Create the module configuration in `src/modules/[module-name]/module.config.ts`
2. Import the module config in `modules.ts`
3. Register it using `moduleRegistry.register(yourModuleConfig)`
4. Modules are registered in order, so dependencies must be registered first
