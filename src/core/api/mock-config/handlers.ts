import {http, passthrough} from 'msw'

import {authHandlers} from '@/modules/auth/api/mocks'
import {communityHandlers} from '@/modules/community/api/mocks'
import {historyHandlers} from '@/modules/history/api/mocks'
import {notificationHandlers} from '@/modules/notifications/api/mocks'
import {tourHandlers} from '@/modules/tour/api/mocks'

const globalHandlers = [http.all('/symbolicate', passthrough)]

/**
 * Combined array of all MSW request handlers for API mocking.
 * Includes handlers from all modules (auth, history, notifications, tour) plus global handlers.
 * Used by MSW server configuration for intercepting and mocking API requests in development.
 */
export const handlers = [
  ...globalHandlers,
  ...authHandlers,
  ...communityHandlers,
  ...historyHandlers,
  ...notificationHandlers,
  ...tourHandlers,
]
