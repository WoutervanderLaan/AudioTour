import {setupServer} from 'msw/node'

import {globalHandlers} from './handlers'

import {authHandlers} from '@/modules/auth/api/mocks'
import {notificationHandlers} from '@/modules/notifications/api/mocks'

/**
 * MSW server instance configured for Node.js environments.
 *
 * This server combines all mock handlers (global, auth, and notifications)
 * and is used for API mocking during Jest testing in Node.js environment.
 * Uses msw/node adapter for Node.js compatibility.
 */
export const server = setupServer(
  ...globalHandlers,
  ...authHandlers,
  ...notificationHandlers,
)
