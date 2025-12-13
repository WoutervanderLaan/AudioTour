# Notifications Screens

This folder contains screen components for the notifications module.

## Files

- `NotificationPermissionScreen.tsx` - Modal screen for requesting push notification permission
- `NotificationSettingsScreen.tsx` - Settings screen for managing notification preferences

## Navigation

```tsx
import {
  NotificationRouteName,
  NotificationModalName,
} from '@/modules/notifications/routes.types'

// Navigate to settings screen
navigation.navigate(NotificationRouteName.settings)

// Open permission modal
navigation.navigate(NotificationModalName.permission)
```
