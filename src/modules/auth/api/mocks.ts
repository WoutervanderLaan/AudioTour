import {http, HttpResponse} from 'msw'

import {createHandler} from '@/core/api/mocks/createHandler'
import {wait} from '@/shared/utils/wait'

const TIMEOUT = 2000

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
      expiresAt: (Date.now() + 1000 * 60 * 60).toLocaleString(),
    })
  }),
  http.get(createHandler('/auth/verify'), () => {
    return HttpResponse.json({message: 'Verified'}, {status: 200})
  }),
]

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
      accessTokenExpiresAt: (Date.now() + 1000 * 60 * 60).toLocaleString(),
    })
  }),
]

export const authHandlers = [...authGetHandlers, ...authPostHandlers]
