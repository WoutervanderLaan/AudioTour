# Notifications Store

This folder contains the Zustand store for the notifications module.

## Files

- `useNotificationStore.ts` - Zustand store for notification state management

## State

- `deviceToken` - Device push token
- `isRegistered` - Whether device is registered for notifications
- `hasRequestedPermission` - Whether permission has been requested
- `permissionGranted` - Whether permission was granted
- `preferences` - User notification preferences
- `lastNotification` - Most recent notification received

## Usage

```tsx
import {useNotificationStore} from '@/modules/notifications/store/useNotificationStore'

const {preferences, setPreferences} = useNotificationStore()

// Update preferences
setPreferences({pushEnabled: true})
```
