import {http, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {wait} from '@/shared/utils/wait'

const TIMEOUT = 500

/**
 * MSW POST request handlers for notification-related API endpoints.
 * Includes handlers for device registration, unregistration, and toggling notification preferences.
 */
const notificationPostHandlers = [
  http.post(createHandler('/notifications/register-device'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      success: true,
      message: 'Device registered successfully',
    })
  }),

  http.post(createHandler('/notifications/unregister-device'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      success: true,
      message: 'Device unregistered successfully',
    })
  }),

  http.post(createHandler('/notifications/toggle'), async ({request}) => {
    await wait(TIMEOUT)

    const body = (await request.json()) as {enabled: boolean}
    const enabled = body?.enabled ?? false

    return HttpResponse.json({
      success: true,
      preferences: {
        pushEnabled: enabled,
      },
    })
  }),
]

/**
 * MSW GET request handlers for notification-related API endpoints.
 * Includes handler for fetching user notification preferences.
 */
const notificationGetHandlers = [
  http.get(createHandler('/notifications/preferences'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      pushEnabled: false,
    })
  }),
]

/**
 * Combined array of all notification-related MSW request handlers.
 * Used by MSW server configuration for mocking notification API endpoints in development.
 */
export const notificationHandlers = [
  ...notificationPostHandlers,
  ...notificationGetHandlers,
]
