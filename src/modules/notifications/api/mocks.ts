import {http, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {wait} from '@/shared/utils/wait'

const TIMEOUT = 500

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
        tourNotifications: true,
        narrativeNotifications: true,
        recommendationNotifications: true,
        socialNotifications: true,
      },
    })
  }),
]

const notificationGetHandlers = [
  http.get(createHandler('/notifications/preferences'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      pushEnabled: false,
      tourNotifications: true,
      narrativeNotifications: true,
      recommendationNotifications: true,
      socialNotifications: true,
    })
  }),
]

export const notificationHandlers = [
  ...notificationPostHandlers,
  ...notificationGetHandlers,
]
