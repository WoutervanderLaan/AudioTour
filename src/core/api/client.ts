import {
  ApiError,
  ApiResponse,
  IApiClient,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './types'

/**
 * ApiClient
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export class ApiClient implements IApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private authToken: string | null = null
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string | null): void {
    this.authToken = token
  }

  /**
   * Get current auth token
   */
  getAuthToken(): string | null {
    return this.authToken
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const url = new URL(endpoint, this.baseURL)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return url.toString()
  }

  /**
   * Build headers
   */
  private buildHeaders(
    customHeaders?: Record<string, string | undefined>,
  ): HeadersInit {
    const headers: Record<string, string | undefined> = {
      ...this.defaultHeaders,
      ...customHeaders,
    }

    // Remove headers that are explicitly set to undefined (needed for FormData)
    Object.keys(headers).forEach(key => {
      if (headers[key] === undefined) {
        delete headers[key]
      }
    })

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`
    }

    return headers as Record<string, string>
  }

  /**
   * Apply request interceptors
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
   * Apply response interceptors
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
   * Make HTTP request
   */
  // eslint-disable-next-line complexity
  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
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

      if (body) {
        // Don't JSON.stringify FormData - pass it directly to fetch
        requestConfig.body = isFormData ? body : JSON.stringify(body)
      }

      // Apply timeout if specified
      let timeoutId: NodeJS.Timeout | undefined
      if (config.timeout) {
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
        data = (await response.text()) as any
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      }
    } catch (error: any) {
      // Handle network errors
      if (error.name === 'AbortError') {
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
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config)
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body, config)
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body, config)
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, body, config)
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config)
  }
}

// Create singleton instance
export const apiClient = new ApiClient(
  process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
)

// Optional: Add global interceptors
apiClient.addRequestInterceptor((url, config) => {
  // Log requests in dev
  if (__DEV__) {
    console.log(`[API] ${config.method} ${url}`)
  }
  return {url, config}
})

apiClient.addResponseInterceptor(response => {
  // Log responses in dev
  if (__DEV__) {
    console.log(`[API] Response ${response.status} ${response.url}`)
  }
  return response
})
