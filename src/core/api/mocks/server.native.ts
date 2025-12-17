import {setupServer} from 'msw/native'

import {globalHandlers} from './handlers'

import {authHandlers} from '@/modules/auth/api/mocks'
import {notificationHandlers} from '@/modules/notifications/api/mocks'

/**
 * MSW server instance configured for React Native environments.
 *
 * This server combines all mock handlers (global, auth, and notifications)
 * and is used for API mocking during development and testing in React Native.
 * Uses msw/native adapter for React Native compatibility.
 */
export const server = setupServer(
  ...globalHandlers,
  ...authHandlers,
  ...notificationHandlers,
)
