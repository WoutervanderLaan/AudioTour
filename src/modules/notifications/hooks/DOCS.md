# Notifications Hooks

This folder contains React hooks for the notifications module.

## Files

- `useNotifications.ts` - Main hook for managing notification state and actions

## Usage

```tsx
import {useNotifications} from '@/modules/notifications/hooks/useNotifications'

const {isEnabled, toggleNotifications, requestPermission, registerDevice} =
  useNotifications()

// Toggle notifications
toggleNotifications(true)

// Request permission modal
requestPermission()
```
