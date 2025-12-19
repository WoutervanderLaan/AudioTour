# src/shared/components/ui/form

Form components and input elements.

## Purpose

Contains form-related UI components including:

- **FormField** - Wrapper component for consistent label, error, and help text rendering across all form inputs
- **TextInput** / **TextInputControlled** - Text input fields with controlled variants
- **Checkbox** / **CheckboxControlled** - Checkbox inputs with controlled variants
- **RadioGroup** / **RadioGroupControlled** - Radio button groups with controlled variants
- **Switch** / **SwitchControlled** - Toggle switch inputs with controlled variants
- **ImageInput** / **ImageInputControlled** - Image picker inputs with controlled variants

All input components have both uncontrolled and controlled (react-hook-form) variants. The **Controlled** variants (e.g., TextInputControlled) use **FormField** internally for consistent presentation, while uncontrolled variants are pure components that should be wrapped with FormField when needed. Designed to work seamlessly with react-hook-form and Zod validation.
