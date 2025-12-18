/* eslint-disable complexity */
/* eslint-disable max-lines */
import {logger} from '../lib/logger'
import {ApiConfig} from './config'
import {
  ApiError,
  ApiResponse,
  IApiClient,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './types'

/**
 * Generic HTTP client for making API requests with advanced features.
 *
 * Provides a robust interface for all HTTP operations with built-in support for:
 * - Request/response interceptors for logging, auth, and transforms
 * - Authentication token management with Bearer token support
 * - FormData handling for file uploads (React Native compatible)
 * - Timeout configuration per request
 * - Automatic JSON parsing with fallback to text
 * - Consistent error handling with detailed error information
 *
 * @example Basic usage
 * ```typescript
 * const client = new ApiClient('https://api.example.com')
 * const response = await client.get('/users')
 * console.log(response.data)
 * ```
 *
 * @example With authentication
 * ```typescript
 * client.setAuthToken('your-jwt-token')
 * const response = await client.post('/protected-route', { data: 'value' })
 * ```
 *
 * @example File upload with FormData
 * ```typescript
 * const formData = new FormData()
 * formData.append('file', fileBlob, 'photo.jpg')
 * const response = await client.post('/upload', formData)
 * ```
 */
export class ApiClient implements IApiClient {
  private readonly baseURL: string = ApiConfig.apiBaseUrl
  private defaultHeaders: Record<string, string>
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  // Token refresh state
  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []

  constructor(defaultHeaders: Record<string, string> = {}) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  /**
   * Set authentication tokens for API requests
   *
   * @param accessToken - JWT access token for authenticating API requests
   * @param refreshToken - JWT refresh token for obtaining new access tokens
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  /**
   * Clear authentication tokens from the client
   *
   * @returns void
   */
  clearTokens(): void {
    this.accessToken = null
    this.refreshToken = null
  }

  /**
   * Get the current access token
   *
   * @returns The access token string if set, otherwise null
   */
  getAccessToken(): string | null {
    return this.accessToken
  }

  /**
   * Get the current refresh token
   *
   * @returns The refresh token string if set, otherwise null
   */
  getRefreshToken(): string | null {
    return this.refreshToken
  }

  /**
   * Add request interceptor to modify requests before they are sent.
   * Interceptors are executed in the order they are added.
   *
   * @param interceptor - Function that receives and returns modified request URL and config
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  /**
   * Add response interceptor to modify responses before they are returned.
   * Interceptors are executed in the order they are added.
   *
   * @param interceptor - Function that receives and returns modified response
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  /**
   * Subscribe to token refresh events.
   *
   * Adds a callback to the subscriber queue that will be notified when a token refresh completes.
   * Used to queue requests that are waiting for token refresh.
   *
   * @param callback - Function to call with the new access token when refresh completes
   */
  private subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback)
  }

  /**
   * Notify all subscribers of a new token.
   *
   * Calls all queued subscriber callbacks with the new access token and clears the subscriber queue.
   * This allows queued requests to retry with the refreshed token.
   *
   * @param token - The new access token to pass to subscribers
   */
  private onTokenRefreshed(token: string): void {
    this.refreshSubscribers.forEach(callback => callback(token))
    this.refreshSubscribers = []
  }

  /**
   * Refresh the access token using the refresh token.
   *
   * Makes a POST request to the /auth/refresh endpoint with the current refresh token.
   * Updates both access and refresh tokens if successful. Clears tokens on failure.
   *
   * @returns The new access token
   * @throws {Error} If no refresh token is available or if the refresh request fails
   */
  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        //TODO: add mock
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json() // TODO: type

      if (!data.accessToken) {
        throw new Error('Invalid refresh response')
      }

      this.accessToken = data.accessToken

      if (data.refreshToken) {
        this.refreshToken = data.refreshToken
      }

      return data.accessToken
    } catch (error) {
      this.clearTokens()
      throw error
    }
  }

  /**
   * Handle token refresh with request queueing.
   *
   * Ensures only one token refresh happens at a time. If a refresh is already in progress,
   * subsequent calls will wait for the ongoing refresh to complete rather than making
   * duplicate refresh requests.
   *
   * @returns The new access token (either from this refresh or the ongoing one)
   * @throws {Error} If the token refresh fails
   */
  private async handleTokenRefresh(): Promise<string> {
    if (!this.isRefreshing) {
      this.isRefreshing = true

      try {
        const newToken = await this.refreshAccessToken()
        this.isRefreshing = false
        this.onTokenRefreshed(newToken)
        return newToken
      } catch (error) {
        this.isRefreshing = false
        this.refreshSubscribers = []
        throw error
      }
    }

    // Wait for the ongoing refresh to complete
    return new Promise(resolve => {
      this.subscribeTokenRefresh((token: string) => {
        resolve(token)
      })
    })
  }

  /**
   * Build full URL with query parameters.
   * Combines base URL, endpoint, and optional query parameters.
   *
   * @param endpoint - API endpoint path
   * @param params - Optional query parameters to append to URL
   * @returns Complete URL string with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const url = new URL(endpoint, this.baseURL)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, JSON.stringify(value))
        }
      }
    }

    return url.toString()
  }

  /**
   * Build headers for request.
   * Merges default headers, custom headers, and authentication header.
   * Handles special case of undefined headers (needed for FormData).
   *
   * @param customHeaders - Optional custom headers to merge with defaults
   * @returns Complete headers object ready for fetch
   */
  private buildHeaders(
    customHeaders?: Record<string, string | undefined>,
  ): HeadersInit {
    const headers: Record<string, string | undefined> = {
      ...this.defaultHeaders,
      ...customHeaders,
    }

    // Remove headers that are explicitly set to undefined (needed for FormData)
    for (const key of Object.keys(headers)) {
      if (headers[key] === undefined) {
        delete headers[key]
      }
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    return headers as Record<string, string>
  }

  /**
   * Apply request interceptors sequentially.
   * Each interceptor can modify the URL and request config.
   *
   * @param url - Request URL
   * @param config - Request configuration
   * @returns Modified URL and config after all interceptors
   */
  private async applyRequestInterceptors(
    url: string,
    config: RequestInit,
  ): Promise<{url: string; config: RequestInit}> {
    let modifiedUrl = url
    let modifiedConfig = config

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(modifiedUrl, modifiedConfig)
      modifiedUrl = result.url
      modifiedConfig = result.config
    }

    return {url: modifiedUrl, config: modifiedConfig}
  }

  /**
   * Apply response interceptors sequentially.
   * Each interceptor can modify the response before it's returned.
   *
   * @param response - Response object from fetch
   * @returns Modified response after all interceptors
   */
  private async applyResponseInterceptors(
    response: Response,
  ): Promise<Response> {
    let modifiedResponse = response

    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse)
    }

    return modifiedResponse
  }

  /**
   * Make HTTP request with full feature support.
   * Handles FormData, timeouts, interceptors, auth, and error handling.
   *
   * @param method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param endpoint - API endpoint path
   * @param body - Optional request body (JSON object or FormData)
   * @param config - Optional request configuration (params, headers, timeout, signal)
   * @returns Promise resolving to API response with data, status, and headers
   * @throws ApiError for network errors, timeouts, or non-2xx status codes
   */
  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const startTime = Date.now()
    try {
      const url = this.buildUrl(endpoint, config.params)

      // Check if body is FormData to handle it specially
      // In React Native, FormData needs special handling:
      // 1. Don't JSON.stringify it
      // 2. Don't set Content-Type header (RN's fetch will set it with boundary)
      const isFormData = body instanceof FormData

      const requestConfig: RequestInit = {
        method,
        headers: this.buildHeaders(
          isFormData
            ? {...config.headers, 'Content-Type': undefined}
            : config.headers,
        ),
        signal: config.signal,
      }

      if (body != null) {
        // Don't JSON.stringify FormData - pass it directly to fetch
        requestConfig.body = isFormData ? body : JSON.stringify(body)
      }

      // Apply timeout if specified
      let timeoutId: NodeJS.Timeout | undefined
      if (config.timeout != null) {
        const controller = new AbortController()
        timeoutId = setTimeout(() => controller.abort(), config.timeout)
        requestConfig.signal = controller.signal
      }

      // Apply request interceptors
      const {url: interceptedUrl, config: interceptedConfig} =
        await this.applyRequestInterceptors(url, requestConfig)

      // Make request
      let response = await fetch(interceptedUrl, interceptedConfig)

      // Clear timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // Handle 401 with token refresh
      if (
        response.status === 401 &&
        !config.skipAuthRefresh &&
        this.refreshToken
      ) {
        try {
          // Attempt to refresh token
          await this.handleTokenRefresh()

          // Retry original request with new token
          requestConfig.headers = this.buildHeaders(config.headers)

          const {url: retryUrl, config: retryConfig} =
            await this.applyRequestInterceptors(interceptedUrl, requestConfig)

          response = await fetch(retryUrl, retryConfig)
        } catch (refreshError) {
          // Token refresh failed - will be handled by error below
          logger.error('[API] Token refresh failed:', refreshError)
        }
      }

      // Apply response interceptors
      response = await this.applyResponseInterceptors(response)

      // Handle errors
      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText || 'Request failed',
          status: response.status,
        }

        try {
          const errorData = await response.json()
          error.message = errorData.message || error.message
          error.code = errorData.code
          error.details = errorData
        } catch {
          // Response is not JSON
        }

        throw error
      }

      // Parse response
      let data: T
      const contentType = response.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        data = await response.json()
      } else {
        // For non-JSON responses, return text as T (caller must ensure T is string-compatible)
        data = (await response.text()) as T
      }

      // Log successful request with timing
      if (__DEV__) {
        const duration = Date.now() - startTime
        logger.success(
          `${method} ${endpoint} - ${response.status} (${duration}ms)`,
        )
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      }
    } catch (error: unknown) {
      // Log failed request with timing
      if (__DEV__) {
        const duration = Date.now() - startTime
        logger.error(`${method} ${endpoint} - Failed (${duration}ms)`, error)
      }

      // Handle network errors
      if (
        typeof error === 'object' &&
        !!error &&
        'name' in error &&
        error?.name === 'AbortError'
      ) {
        throw {
          message: 'Request timeout',
          code: 'TIMEOUT',
        } as ApiError
      }

      if (error instanceof TypeError) {
        throw {
          message: 'Network request failed',
          code: 'NETWORK_ERROR',
        } as ApiError
      }

      throw error
    }
  }

  /**
   * Perform GET request.
   *
   * @param endpoint - API endpoint path
   * @param config - Optional request configuration
   * @returns Promise resolving to API response
   */
  async get<T = unknown>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config)
  }

  /**
   * Perform POST request.
   *
   * @param endpoint - API endpoint path
   * @param body - Request body (JSON object or FormData)
   * @param config - Optional request configuration
   * @returns Promise resolving to API response
   */
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body, config)
  }

  /**
   * Perform PUT request.
   *
   * @param endpoint - API endpoint path
   * @param body - Request body (JSON object or FormData)
   * @param config - Optional request configuration
   * @returns Promise resolving to API response
   */
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body, config)
  }

  /**
   * Perform PATCH request.
   *
   * @param endpoint - API endpoint path
   * @param body - Request body (JSON object or FormData)
   * @param config - Optional request configuration
   * @returns Promise resolving to API response
   */
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, body, config)
  }

  /**
   * Perform DELETE request.
   *
   * @param endpoint - API endpoint path
   * @param config - Optional request configuration
   * @returns Promise resolving to API response
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config)
  }

  /**
   * Stream POST request with chunked response handling.
   * Handles Server-Sent Events (SSE) or newline-delimited JSON streams.
   * Invokes onChunk callback for each data chunk received.
   *
   * @param endpoint - API endpoint path
   * @param body - Request body (JSON object or FormData)
   * @param onChunk - Callback invoked for each chunk of data received
   * @param config - Optional request configuration
   * @returns Promise resolving when stream completes
   * @throws ApiError for network errors or non-2xx status codes
   */
  async streamPost<TChunk = unknown>(
    endpoint: string,
    body?: unknown,
    onChunk?: (chunk: TChunk) => void,
    config?: RequestConfig,
  ): Promise<void> {
    const startTime = Date.now()
    try {
      const url = this.buildUrl(endpoint, config?.params)
      const isFormData = body instanceof FormData

      const requestConfig: RequestInit = {
        method: 'POST',
        headers: this.buildHeaders(
          isFormData
            ? {...config?.headers, 'Content-Type': undefined}
            : config?.headers,
        ),
        signal: config?.signal,
      }

      if (body != null) {
        requestConfig.body = isFormData ? body : JSON.stringify(body)
      }

      // Apply request interceptors
      const {url: interceptedUrl, config: interceptedConfig} =
        await this.applyRequestInterceptors(url, requestConfig)

      // Make request
      const response = await fetch(interceptedUrl, interceptedConfig)

      // Handle 401 with token refresh (similar to regular request)
      if (
        response.status === 401 &&
        !config?.skipAuthRefresh &&
        this.refreshToken
      ) {
        try {
          await this.handleTokenRefresh()
          requestConfig.headers = this.buildHeaders(config?.headers)
          const {url: retryUrl, config: retryConfig} =
            await this.applyRequestInterceptors(interceptedUrl, requestConfig)
          const retryResponse = await fetch(retryUrl, retryConfig)

          if (!retryResponse.ok) {
            throw {
              message: retryResponse.statusText || 'Request failed',
              status: retryResponse.status,
            } as ApiError
          }

          return this.processStream(retryResponse, onChunk)
        } catch (refreshError) {
          logger.error('[API] Token refresh failed:', refreshError)
          throw refreshError
        }
      }

      // Handle errors
      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText || 'Request failed',
          status: response.status,
        }

        try {
          const errorData = await response.json()
          error.message = errorData.message || error.message
          error.code = errorData.code
          error.details = errorData
        } catch {
          // Response is not JSON
        }

        throw error
      }

      // Process the stream
      await this.processStream(response, onChunk)

      // Log successful request
      if (__DEV__) {
        const duration = Date.now() - startTime
        logger.success(`STREAM POST ${endpoint} - Complete (${duration}ms)`)
      }
    } catch (error: unknown) {
      // Log failed request
      if (__DEV__) {
        const duration = Date.now() - startTime
        logger.error(`STREAM POST ${endpoint} - Failed (${duration}ms)`, error)
      }

      if (
        typeof error === 'object' &&
        !!error &&
        'name' in error &&
        error?.name === 'AbortError'
      ) {
        throw {
          message: 'Request timeout',
          code: 'TIMEOUT',
        } as ApiError
      }

      if (error instanceof TypeError) {
        throw {
          message: 'Network request failed',
          code: 'NETWORK_ERROR',
        } as ApiError
      }

      throw error
    }
  }

  /**
   * Process streaming response body.
   * Reads response as a stream and parses newline-delimited JSON chunks.
   * Properly handles errors by attempting to flush remaining buffer content.
   *
   * @param response - Fetch Response object with readable body
   * @param onChunk - Callback invoked for each parsed chunk
   * @throws Error if response body is not readable or if stream reading fails
   */
  private async processStream<TChunk>(
    response: Response,
    onChunk?: (chunk: TChunk) => void,
  ): Promise<void> {
    if (!response.body) {
      throw new Error('Response body is not readable')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const {done, value} = await reader.read()

        if (done) {
          // Process any remaining data in buffer
          this.flushBuffer(buffer, onChunk)
          break
        }

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, {stream: true})

        // Process complete lines (newline-delimited JSON)
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          this.processStreamLine(line, onChunk)
        }
      }
    } catch (error) {
      // Attempt to process any remaining buffer content before throwing
      if (buffer.trim()) {
        logger.warn('[API] Stream error - attempting to flush buffer')
        this.flushBuffer(buffer, onChunk)
      }
      throw error
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * Process a single line from the stream.
   * Handles SSE format and plain newline-delimited JSON.
   *
   * @param line - Line to process
   * @param onChunk - Callback invoked with parsed chunk
   */
  private processStreamLine<TChunk>(
    line: string,
    onChunk?: (chunk: TChunk) => void,
  ): void {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith(':')) {
      // Skip empty lines and SSE comments
      return
    }

    // Handle SSE format (data: {...})
    const dataMatch = trimmedLine.match(/^data:\s*(.+)$/)
    const jsonStr = dataMatch ? dataMatch[1] : trimmedLine

    try {
      const chunk = JSON.parse(jsonStr) as TChunk
      if (onChunk) {
        onChunk(chunk)
      }
    } catch (parseError) {
      logger.warn('[API] Failed to parse chunk:', {
        line: trimmedLine,
        error: parseError,
      })
    }
  }

  /**
   * Flush remaining buffer content.
   * Attempts to parse any remaining data as a complete chunk.
   *
   * @param buffer - Buffer content to flush
   * @param onChunk - Callback invoked with parsed chunk
   */
  private flushBuffer<TChunk>(
    buffer: string,
    onChunk?: (chunk: TChunk) => void,
  ): void {
    const trimmed = buffer.trim()
    if (!trimmed || !onChunk) {
      return
    }

    try {
      const chunk = JSON.parse(trimmed) as TChunk
      onChunk(chunk)
    } catch (parseError) {
      logger.warn('[API] Failed to parse final buffer content:', {
        buffer: trimmed.substring(0, 100), // Log first 100 chars
        error: parseError,
      })
    }
  }
}

export const apiClient = new ApiClient()

// Request interceptor with detailed logging
apiClient.addRequestInterceptor((url, config) => {
  if (__DEV__) {
    logger.group(`API ${config.method} Request`)
    logger.info('Endpoint:', url)
    if (config.body && !(config.body instanceof FormData)) {
      logger.json(JSON.parse(config.body as string), 'Request Body')
    }
    logger.groupEnd()
  }
  return {url, config}
})

// Response interceptor with detailed logging
apiClient.addResponseInterceptor(response => {
  if (__DEV__) {
    logger.group(`API ${response.status} Response`)
    logger.info('URL:', response.url)
    logger.info('Status:', `${response.status} ${response.statusText}`)
    logger.info('Content-Type:', response.headers.get('content-type') || 'N/A')
    logger.groupEnd()
  }
  return response
})
