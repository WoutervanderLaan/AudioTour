# Notifications Services

This folder contains services for the notifications module.

## Files

- `notificationService.ts` - Singleton service for managing push notifications via Notifee

## NotificationService

The notification service provides:

- **Initialization** - Creates Android notification channels and sets up event handlers
- **Permission Management** - Request and check notification permissions
- **Local Notifications** - Display local notifications to the user
- **Badge Management** - Set and get app badge count (iOS)
- **Settings** - Open device notification settings

## Usage

```tsx
import {notificationService} from '@/modules/notifications/services/notificationService'

// Initialize the service (call once at app start)
await notificationService.initialize({
  onForegroundEvent: event => {
    console.log('Foreground event:', event)
  },
})

// Request permission
const status = await notificationService.requestPermission()

// Display a notification
await notificationService.displayNotification({
  title: 'Tour Complete!',
  body: 'You finished the Renaissance Gallery tour',
  channelId: NotificationChannelId.tours,
})

// Open device settings
await notificationService.openSettings()
```

## Android Notification Channels

The service creates the following Android notification channels:

| Channel ID      | Name            | Importance |
| --------------- | --------------- | ---------- |
| default         | Default         | DEFAULT    |
| tours           | Tour Updates    | HIGH       |
| narratives      | New Narratives  | DEFAULT    |
| recommendations | Recommendations | DEFAULT    |
| social          | Social Updates  | LOW        |
