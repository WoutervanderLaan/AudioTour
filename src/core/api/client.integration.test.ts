// Silence the real logger so expected 401s don't spam the test output
jest.mock('@/core/lib/logger/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    group: jest.fn(),
    groupCollapsed: jest.fn(),
    groupEnd: jest.fn(),
    table: jest.fn(),
    json: jest.fn(),
  },
}))

import '@/core/api/mock-config/msw.polyfills'

import {http, HttpResponse} from 'msw'

import {ApiClient} from './client'
import {createHandler} from './mock-config/createHandler'
import {server} from './mock-config/server.node'

/**
 * End-to-end coverage of the client's silent token-refresh path against the MSW
 * server. Unlike client.test.ts (which stubs global fetch), these tests drive the
 * real request pipeline through mock handlers to verify the 401 -> /auth/refresh
 * -> retry flow and the onTokensChanged callback wiring.
 */
describe('ApiClient integration (MSW)', () => {
  beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('silently refreshes an expired token and reports the new tokens', async () => {
    let protectedCalls = 0

    server.use(
      http.get(createHandler('/protected'), () => {
        protectedCalls += 1
        if (protectedCalls === 1) {
          return HttpResponse.json({message: 'Unauthorized'}, {status: 401})
        }
        return HttpResponse.json({data: 'ok'})
      }),
      http.post(createHandler('/auth/refresh'), () =>
        HttpResponse.json({
          accessToken: 'fresh-access',
          refreshToken: 'fresh-refresh',
          accessTokenExpiresAt: '2030-01-01T00:00:00Z',
        }),
      ),
    )

    const client = new ApiClient()
    const onTokensChanged = jest.fn()
    client.setOnTokensChanged(onTokensChanged)
    client.setTokens('stale-access', 'stale-refresh')

    const response = await client.get<{data: string}>('/protected')

    expect(response.data).toEqual({data: 'ok'})
    expect(client.getAccessToken()).toBe('fresh-access')
    expect(client.getRefreshToken()).toBe('fresh-refresh')
    expect(onTokensChanged).toHaveBeenCalledWith({
      accessToken: 'fresh-access',
      refreshToken: 'fresh-refresh',
      accessTokenExpiresAt: '2030-01-01T00:00:00Z',
      refreshTokenExpiresAt: undefined,
    })
  })

  it('clears tokens and reports null when the refresh endpoint rejects', async () => {
    server.use(
      http.get(createHandler('/protected'), () =>
        HttpResponse.json({message: 'Unauthorized'}, {status: 401}),
      ),
      http.post(createHandler('/auth/refresh'), () =>
        HttpResponse.json({message: 'Refresh rejected'}, {status: 401}),
      ),
    )

    const client = new ApiClient()
    const onTokensChanged = jest.fn()
    client.setOnTokensChanged(onTokensChanged)
    client.setTokens('stale-access', 'stale-refresh')

    await expect(client.get('/protected')).rejects.toMatchObject({
      status: 401,
    })

    expect(client.getAccessToken()).toBeNull()
    expect(client.getRefreshToken()).toBeNull()
    expect(onTokensChanged).toHaveBeenCalledWith(null)
  })
})
