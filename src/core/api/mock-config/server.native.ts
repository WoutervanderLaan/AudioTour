import {setupServer} from 'msw/native'

import {handlers} from './handlers'

/**
 * MSW server instance configured for React Native environments.
 *
 * This server combines all mock handlers (global, auth, and notifications)
 * and is used for API mocking during development and testing in React Native.
 * Uses msw/native adapter for React Native compatibility.
 */
export const server = setupServer(...handlers)
