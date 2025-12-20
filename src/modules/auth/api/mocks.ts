import {http, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mock-config/createHandler'
import {datetime} from '@/core/lib/datetime'
import {wait} from '@/shared/utils/wait'

const TIMEOUT = 2000

/**
 * MSW (Mock Service Worker) handlers for authentication GET endpoints.
 *
 * Provides mock responses for:
 * - GET /auth/profile - Returns mock user profile data
 * - GET /auth/session - Returns mock session with user and expiration
 * - GET /auth/verify - Returns verification success response
 */
const authGetHandlers = [
  http.get(createHandler('/auth/profile'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      id: 'user-123',
      email: 'test@example.com',
      name: 'John Doe',
    })
  }),
  http.get(createHandler('/auth/session'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      user: {id: 'user-123', email: 'test@example.com', name: 'John Doe'},
      expiresAt: datetime().add(1, 'hour').format(),
    })
  }),
  http.get(createHandler('/auth/verify'), () => {
    return HttpResponse.json({message: 'Verified'}, {status: 200})
  }),
]

/**
 * MSW (Mock Service Worker) handlers for authentication POST endpoints.
 *
 * Provides mock responses for:
 * - POST /auth/login - Returns mock user data and authentication tokens
 * - POST /auth/logout - Returns success message for logout
 * - POST /auth/register - Returns mock user data and tokens for new user
 * - POST /auth/refresh - Returns refreshed access and refresh tokens
 */
const authPostHandlers = [
  http.post(createHandler('/auth/login'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      user: {id: 'user-123', email: 'test@example.com', name: 'John Doe'},
      tokens: {
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
      },
    })
  }),
  http.post(createHandler('/auth/logout'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json(
      {message: 'Successfully logged out'},
      {status: 200},
    )
  }),
  http.post(createHandler('/auth/register'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      user: {id: 'user-123', email: 'test@example.com', name: 'John Doe'},
      tokens: {
        accessToken: 'access-token-abc',
        refreshToken: 'refresh-token-xyz',
      },
    })
  }),
  http.post(createHandler('/auth/refresh'), async () => {
    await wait(TIMEOUT)

    return HttpResponse.json({
      accessToken: 'access-token-abc',
      refreshToken: 'refresh-token-xyz',
      accessTokenExpiresAt: datetime().add(1, 'hour').format(),
    })
  }),
]

/**
 * Combined array of all authentication MSW mock handlers.
 *
 * Combines both GET and POST handlers to provide a complete set of
 * authentication endpoint mocks for development and testing.
 */
export const authHandlers = [...authGetHandlers, ...authPostHandlers]
