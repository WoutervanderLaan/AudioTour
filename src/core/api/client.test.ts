/* eslint-disable max-lines */
// Mock datetime module before importing ApiClient
jest.mock('@/core/lib/datetime', () => ({
  datetime: {
    timestamp: jest.fn(() => Date.now()),
  },
}))

// Mock logger module before importing ApiClient
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

import {ApiClient, apiClient} from './client'
import type {ApiError, ApiResponse} from './types'

/**
 * Mock Headers class for Response objects
 */
class MockHeaders {
  private map = new Map<string, string>()

  get(name: string): string | null {
    return this.map.get(name) ?? null
  }

  set(name: string, value: string): void {
    this.map.set(name, value)
  }

  has(name: string): boolean {
    return this.map.has(name)
  }
}

/**
 * Create a mock Response object
 *
 * @param body - Response body (object will be JSON stringified)
 * @param status - HTTP status code
 * @param headers - Response headers
 * @returns Mock Response object
 */
const createMockResponse = (
  body: unknown,
  status = 200,
  headers: Record<string, string> = {'content-type': 'application/json'},
): Response => {
  const headersMap = new MockHeaders()
  for (const [key, value] of Object.entries(headers)) {
    headersMap.set(key, value)
  }

  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: headersMap as unknown as Headers,
    url: 'http://localhost:8000/test',
    json: jest.fn().mockResolvedValue(body),
    text: jest.fn().mockResolvedValue(JSON.stringify(body)),
  } as unknown as Response
}

describe('ApiClient', () => {
  let client: ApiClient
  let fetchMock: jest.SpyInstance

  beforeEach(() => {
    // Create a fresh client instance for each test
    client = new ApiClient()

    // Mock global fetch
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(jest.fn())

    // Clear all timers
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should create instance with default headers', () => {
      const newClient = new ApiClient()
      expect(newClient).toBeInstanceOf(ApiClient)
    })

    it('should create instance with custom default headers', () => {
      const customHeaders = {'X-Custom-Header': 'custom-value'}
      const newClient = new ApiClient(customHeaders)
      expect(newClient).toBeInstanceOf(ApiClient)
    })
  })

  describe('token management', () => {
    it('should set tokens correctly', () => {
      const accessToken = 'access-token-123'
      const refreshToken = 'refresh-token-456'

      client.setTokens(accessToken, refreshToken)

      expect(client.getAccessToken()).toBe(accessToken)
      expect(client.getRefreshToken()).toBe(refreshToken)
    })

    it('should clear tokens correctly', () => {
      client.setTokens('access', 'refresh')
      client.clearTokens()

      expect(client.getAccessToken()).toBeNull()
      expect(client.getRefreshToken()).toBeNull()
    })

    it('should include Authorization header when token is set', async () => {
      const mockResponse = createMockResponse({success: true})
      fetchMock.mockResolvedValue(mockResponse)

      client.setTokens('test-token', 'refresh-token')
      await client.get('/test')

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        }),
      )
    })

    it('should not include Authorization header when token is not set', async () => {
      const mockResponse = createMockResponse({success: true})
      fetchMock.mockResolvedValue(mockResponse)

      await client.get('/test')

      const callHeaders = (fetchMock.mock.calls[0][1] as RequestInit)
        .headers as Record<string, string>
      expect(callHeaders.Authorization).toBeUndefined()
    })
  })

  describe('HTTP methods', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))
    })

    it('should perform GET request', async () => {
      const response = await client.get<{success: boolean}>('/test')

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({method: 'GET'}),
      )
      expect(response.data).toEqual({success: true})
      expect(response.status).toBe(200)
    })

    it('should perform POST request with body', async () => {
      const body = {name: 'test', value: 123}
      await client.post('/test', body)

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        }),
      )
    })

    it('should perform PUT request with body', async () => {
      const body = {id: 1, name: 'updated'}
      await client.put('/test/1', body)

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(body),
        }),
      )
    })

    it('should perform PATCH request with body', async () => {
      const body = {name: 'patched'}
      await client.patch('/test/1', body)

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(body),
        }),
      )
    })

    it('should perform DELETE request', async () => {
      await client.delete('/test/1')

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({method: 'DELETE'}),
      )
    })
  })

  describe('query parameters', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))
    })

    it('should append query parameters to URL', async () => {
      await client.get('/test', {
        params: {page: 1, limit: 10},
      })

      const calledUrl = fetchMock.mock.calls[0][0] as string
      expect(calledUrl).toContain('page')
      expect(calledUrl).toContain('limit')
    })

    it('should skip null and undefined query parameters', async () => {
      await client.get('/test', {
        params: {page: 1, skip: null, undefined: undefined},
      })

      const calledUrl = fetchMock.mock.calls[0][0] as string
      expect(calledUrl).toContain('page')
      expect(calledUrl).not.toContain('skip')
      expect(calledUrl).not.toContain('undefined')
    })
  })

  describe('custom headers', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))
    })

    it('should merge custom headers with default headers', async () => {
      await client.get('/test', {
        headers: {'X-Custom': 'value'},
      })

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Custom': 'value',
          }),
        }),
      )
    })

    it('should allow overriding default headers', async () => {
      await client.post(
        '/test',
        {},
        {
          headers: {'Content-Type': 'text/plain'},
        },
      )

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'text/plain',
          }),
        }),
      )
    })
  })

  describe('FormData handling', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))
    })

    it('should handle FormData body correctly', async () => {
      const formData = new FormData()
      formData.append('file', 'test-file-content')

      await client.post('/upload', formData)

      const callConfig = fetchMock.mock.calls[0][1] as RequestInit
      expect(callConfig.body).toBe(formData)

      // Content-Type should not be set for FormData
      const headers = callConfig.headers as Record<string, string>
      expect(headers['Content-Type']).toBeUndefined()
    })

    it('should not JSON.stringify FormData', async () => {
      const formData = new FormData()
      formData.append('key', 'value')

      await client.post('/upload', formData)

      const callConfig = fetchMock.mock.calls[0][1] as RequestInit
      expect(typeof callConfig.body).not.toBe('string')
    })
  })

  describe('error handling', () => {
    it('should throw ApiError for non-2xx status codes', async () => {
      const errorResponse = createMockResponse(
        {message: 'Not found', code: 'NOT_FOUND'},
        404,
      )
      fetchMock.mockResolvedValue(errorResponse)

      await expect(client.get('/test')).rejects.toMatchObject({
        message: 'Not found',
        status: 404,
        code: 'NOT_FOUND',
      } as ApiError)
    })

    it('should handle non-JSON error responses', async () => {
      const errorResponse = createMockResponse('Plain text error', 500, {
        'content-type': 'text/plain',
      })
      errorResponse.json = jest.fn().mockRejectedValue(new Error('Not JSON'))
      fetchMock.mockResolvedValue(errorResponse)

      await expect(client.get('/test')).rejects.toMatchObject({
        status: 500,
      } as ApiError)
    })

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValue(new TypeError('Network error'))

      await expect(client.get('/test')).rejects.toMatchObject({
        message: 'Network request failed',
        code: 'NETWORK_ERROR',
      } as ApiError)
    })

    it('should handle timeout errors', async () => {
      const abortError = new Error('Aborted')
      abortError.name = 'AbortError'
      fetchMock.mockRejectedValue(abortError)

      await expect(client.get('/test', {timeout: 1000})).rejects.toMatchObject({
        message: 'Request timeout',
        code: 'TIMEOUT',
      } as ApiError)
    })
  })

  describe('response parsing', () => {
    it('should parse JSON responses', async () => {
      const data = {id: 1, name: 'Test'}
      fetchMock.mockResolvedValue(createMockResponse(data))

      const response = await client.get<typeof data>('/test')

      expect(response.data).toEqual(data)
    })

    it('should parse text responses for non-JSON content-type', async () => {
      const textResponse = createMockResponse('Plain text', 200, {
        'content-type': 'text/plain',
      })
      fetchMock.mockResolvedValue(textResponse)

      const response = await client.get<string>('/test')

      expect(typeof response.data).toBe('string')
    })

    it('should return response headers', async () => {
      const headers = {
        'content-type': 'application/json',
        'x-custom-header': 'custom-value',
      }
      fetchMock.mockResolvedValue(
        createMockResponse({success: true}, 200, headers),
      )

      const response = await client.get('/test')

      expect(response.headers).toBeDefined()
      expect(response.headers.get('x-custom-header')).toBe('custom-value')
    })
  })

  describe('request interceptors', () => {
    it('should apply request interceptors', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const interceptor = jest.fn((url, config) => ({
        url: `${url}?intercepted=true`,
        config,
      }))

      client.addRequestInterceptor(interceptor)
      await client.get('/test')

      expect(interceptor).toHaveBeenCalled()
      const calledUrl = fetchMock.mock.calls[0][0] as string
      expect(calledUrl).toContain('intercepted=true')
    })

    it('should apply multiple request interceptors in order', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const interceptor1 = jest.fn((url, config) => ({
        url: `${url}?first=true`,
        config,
      }))

      const interceptor2 = jest.fn((url, config) => ({
        url: `${url}&second=true`,
        config,
      }))

      client.addRequestInterceptor(interceptor1)
      client.addRequestInterceptor(interceptor2)
      await client.get('/test')

      expect(interceptor1).toHaveBeenCalled()
      expect(interceptor2).toHaveBeenCalled()

      const calledUrl = fetchMock.mock.calls[0][0] as string
      expect(calledUrl).toContain('first=true')
      expect(calledUrl).toContain('second=true')
    })

    it('should support async request interceptors', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const asyncInterceptor = jest.fn(async (url, config) => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return {url: `${url}?async=true`, config}
      })

      client.addRequestInterceptor(asyncInterceptor)
      await client.get('/test')

      expect(asyncInterceptor).toHaveBeenCalled()
    })
  })

  describe('response interceptors', () => {
    it('should apply response interceptors', async () => {
      const mockResponse = createMockResponse({success: true})
      fetchMock.mockResolvedValue(mockResponse)

      const interceptor = jest.fn(response => response)

      client.addResponseInterceptor(interceptor)
      await client.get('/test')

      expect(interceptor).toHaveBeenCalledWith(mockResponse)
    })

    it('should apply multiple response interceptors in order', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const order: number[] = []
      const interceptor1 = jest.fn(response => {
        order.push(1)
        return response
      })

      const interceptor2 = jest.fn(response => {
        order.push(2)
        return response
      })

      client.addResponseInterceptor(interceptor1)
      client.addResponseInterceptor(interceptor2)
      await client.get('/test')

      expect(order).toEqual([1, 2])
    })

    it('should support async response interceptors', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const asyncInterceptor = jest.fn(async response => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return response
      })

      client.addResponseInterceptor(asyncInterceptor)
      await client.get('/test')

      expect(asyncInterceptor).toHaveBeenCalled()
    })
  })

  describe('token refresh', () => {
    it('should refresh token on 401 response', async () => {
      const unauthorizedResponse = createMockResponse(
        {message: 'Unauthorized'},
        401,
      )
      const successResponse = createMockResponse({data: 'success'})
      const refreshResponse = createMockResponse({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      })

      fetchMock
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce(refreshResponse)
        .mockResolvedValueOnce(successResponse)

      client.setTokens('old-access-token', 'old-refresh-token')

      const response = await client.get<{data: string}>('/test')

      expect(response.data).toEqual({data: 'success'})
      expect(client.getAccessToken()).toBe('new-access-token')
      expect(client.getRefreshToken()).toBe('new-refresh-token')
      expect(fetchMock).toHaveBeenCalledTimes(3)
    })

    it('should skip token refresh when skipAuthRefresh is true', async () => {
      const unauthorizedResponse = createMockResponse(
        {message: 'Unauthorized'},
        401,
      )
      fetchMock.mockResolvedValue(unauthorizedResponse)

      client.setTokens('access-token', 'refresh-token')

      await expect(
        client.get('/test', {skipAuthRefresh: true}),
      ).rejects.toMatchObject({
        status: 401,
      } as ApiError)

      // Should only make one request, no refresh attempt
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    it('should clear tokens when refresh fails', async () => {
      const unauthorizedResponse = createMockResponse(
        {message: 'Unauthorized'},
        401,
      )
      const refreshFailedResponse = createMockResponse(
        {message: 'Refresh failed'},
        401,
      )

      fetchMock
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce(refreshFailedResponse)

      client.setTokens('access-token', 'refresh-token')

      await expect(client.get('/test')).rejects.toMatchObject({
        status: 401,
      } as ApiError)

      expect(client.getAccessToken()).toBeNull()
      expect(client.getRefreshToken()).toBeNull()
    })

    it('should not attempt refresh without refresh token', async () => {
      const unauthorizedResponse = createMockResponse(
        {message: 'Unauthorized'},
        401,
      )
      fetchMock.mockResolvedValue(unauthorizedResponse)

      await expect(client.get('/test')).rejects.toMatchObject({
        status: 401,
      } as ApiError)

      // Should only make one request
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('timeout', () => {
    it('should apply timeout to requests', async () => {
      const abortError = new Error('Aborted')
      abortError.name = 'AbortError'

      // Mock a slow request that will timeout
      fetchMock.mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(abortError), 2000)
          }),
      )

      await expect(client.get('/test', {timeout: 100})).rejects.toMatchObject({
        code: 'TIMEOUT',
      } as ApiError)
    }, 10000)
  })

  describe('AbortSignal', () => {
    it('should accept custom AbortSignal', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const controller = new AbortController()
      await client.get('/test', {signal: controller.signal})

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: controller.signal,
        }),
      )
    })
  })

  describe('singleton instance', () => {
    it('should export a default singleton instance', () => {
      expect(apiClient).toBeInstanceOf(ApiClient)
    })

    it('should have interceptors configured', () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      // The singleton has interceptors added, they should be called
      return apiClient.get('/test').then(() => {
        expect(fetchMock).toHaveBeenCalled()
      })
    })
  })

  describe('edge cases', () => {
    it('should handle empty response body', async () => {
      const emptyResponse = createMockResponse(null)
      fetchMock.mockResolvedValue(emptyResponse)

      const response = await client.get('/test')

      expect(response.data).toBeNull()
    })

    it('should handle requests without body', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      await client.post('/test')

      const callConfig = fetchMock.mock.calls[0][1] as RequestInit
      expect(callConfig.body).toBeUndefined()
    })

    it('should handle responses with no content-type header', async () => {
      const response = createMockResponse({data: 'test'}, 200, {})
      fetchMock.mockResolvedValue(response)

      const result = await client.get<string>('/test')

      expect(result.data).toBeDefined()
    })

    it('should preserve response status code', async () => {
      const response = createMockResponse({data: 'created'}, 201)
      fetchMock.mockResolvedValue(response)

      const result = await client.post('/test', {data: 'new'})

      expect(result.status).toBe(201)
    })
  })

  describe('complex scenarios', () => {
    it('should handle concurrent requests with token refresh', async () => {
      const unauthorizedResponse = createMockResponse(
        {message: 'Unauthorized'},
        401,
      )
      const refreshResponse = createMockResponse({
        accessToken: 'new-token',
      })
      const successResponse = createMockResponse({success: true})

      fetchMock
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce(unauthorizedResponse)
        .mockResolvedValueOnce(refreshResponse)
        .mockResolvedValueOnce(successResponse)
        .mockResolvedValueOnce(successResponse)

      client.setTokens('old-token', 'refresh-token')

      // Make two concurrent requests
      const [result1, result2] = await Promise.all([
        client.get('/test1'),
        client.get('/test2'),
      ])

      expect(result1.data).toEqual({success: true})
      expect(result2.data).toEqual({success: true})
    })

    it('should handle request with all options combined', async () => {
      fetchMock.mockResolvedValue(createMockResponse({success: true}))

      const controller = new AbortController()
      await client.post(
        '/test',
        {data: 'value'},
        {
          params: {query: 'param'},
          headers: {'X-Custom': 'header'},
          timeout: 5000,
          signal: controller.signal,
        },
      )

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('query'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-Custom': 'header',
          }),
          body: JSON.stringify({data: 'value'}),
        }),
      )
    })
  })

  describe('type safety', () => {
    it('should return correctly typed response data', async () => {
      type User = {id: number; name: string}
      const userData: User = {id: 1, name: 'Test User'}

      fetchMock.mockResolvedValue(createMockResponse(userData))

      const response: ApiResponse<User> = await client.get<User>('/users/1')

      expect(response.data.id).toBe(1)
      expect(response.data.name).toBe('Test User')
    })
  })
})
