# Notifications Module

## Overview

The notifications module handles push notification functionality for the AudioTour app. It provides:

- Permission request flow with user-friendly modal
- Device token registration with backend
- Toggle notifications on/off
- Notification preferences management
- Zustand store for notification state persistence

## Architecture

```
notifications/
├── api/
│   ├── keys.ts          # TanStack Query keys
│   ├── mutations.ts     # API mutations (register, toggle, unregister)
│   └── mocks.ts         # MSW handlers for development
├── hooks/
│   └── useNotifications.ts  # Main hook for notification management
├── screens/
│   ├── NotificationPermissionScreen.tsx  # Permission request modal
│   └── NotificationSettingsScreen.tsx    # Settings screen
├── store/
│   └── useNotificationStore.ts  # Zustand store
├── types.ts             # TypeScript types
├── routes.types.ts      # Navigation route types
├── screenConfig.ts      # Screen configuration
├── index.ts             # Module configuration
└── DOCS.md              # This file
```

## Usage

### Basic Usage

```tsx
import {useNotifications} from '@/modules/notifications/hooks/useNotifications'

const MyComponent = () => {
  const {isEnabled, toggleNotifications, requestPermission} = useNotifications()

  return (
    <Switch
      value={isEnabled}
      onChange={toggleNotifications}
    />
  )
}
```

### Accessing Store Directly

```tsx
import {useNotificationStore} from '@/modules/notifications/store/useNotificationStore'

const MyComponent = () => {
  const {preferences, deviceToken} = useNotificationStore()

  // Access notification state
}
```

### Navigation

```tsx
import {
  NotificationRouteName,
  NotificationModalName,
} from '@/modules/notifications/routes.types'

// Navigate to settings
navigation.navigate(NotificationRouteName.settings)

// Open permission modal
navigation.navigate(NotificationModalName.permission)
```

## API Endpoints

The module expects the following backend endpoints:

### POST /notifications/register-device

Register a device for push notifications.

**Request:**

```json
{
  "deviceToken": "string",
  "platform": "ios" | "android"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Device registered successfully"
}
```

### POST /notifications/unregister-device

Unregister a device from push notifications.

**Request:**

```json
{
  "deviceToken": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Device unregistered successfully"
}
```

### POST /notifications/toggle

Toggle push notifications on/off.

**Request:**

```json
{
  "enabled": true
}
```

**Response:**

```json
{
  "success": true,
  "preferences": {
    "pushEnabled": true,
    "tourNotifications": true,
    "narrativeNotifications": true,
    "recommendationNotifications": true,
    "socialNotifications": true
  }
}
```

## Backend Implementation Guide

### Database Schema

```sql
CREATE TABLE device_push_tokens (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_token VARCHAR(500) UNIQUE NOT NULL,
    platform ENUM('ios', 'android') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_used_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    push_enabled BOOLEAN DEFAULT false,
    tour_notifications BOOLEAN DEFAULT true,
    narrative_notifications BOOLEAN DEFAULT true,
    recommendation_notifications BOOLEAN DEFAULT true,
    social_notifications BOOLEAN DEFAULT true,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Firebase Cloud Messaging Setup

1. Create a Firebase project
2. Add iOS app with APNs key
3. Add Android app with google-services.json
4. Install firebase-admin SDK on backend
5. Send notifications via FCM API

### Example Backend Code (Node.js)

```javascript
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

async function sendNotification(userId, title, body, data) {
  const tokens = await db
    .collection('device_tokens')
    .where('userId', '==', userId)
    .where('isActive', '==', true)
    .get()

  const messages = tokens.docs.map(doc => ({
    token: doc.data().deviceToken,
    notification: {title, body},
    data,
  }))

  return admin.messaging().sendAll(messages)
}
```

## Future Enhancements

- [ ] Add Notifee for rich notification display
- [ ] Implement notification history screen
- [ ] Add notification categories/channels
- [ ] Support quiet hours
- [ ] Add notification analytics
