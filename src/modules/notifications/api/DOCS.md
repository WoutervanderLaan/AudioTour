# Notifications API

This folder contains the API layer for the notifications module.

## Files

- `keys.ts` - TanStack Query key factory for notification queries
- `mutations.ts` - React Query mutations for device registration and notification toggling
- `mocks.ts` - MSW handlers for development/testing

## API Endpoints

### POST /notifications/register-device

Registers a device for push notifications.

### POST /notifications/unregister-device

Unregisters a device from push notifications.

### POST /notifications/toggle

Toggles push notifications on/off for the user.

## Usage

```tsx
import {useToggleNotificationsMutation} from '@/modules/notifications/api/mutations'

const toggleMutation = useToggleNotificationsMutation()
toggleMutation.mutate({enabled: true})
```
