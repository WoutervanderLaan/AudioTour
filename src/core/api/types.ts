/**
 * ApiResponse
 * Generic type representing a successful API response with data, status code, and headers.
 */
export type ApiResponse<T = unknown> = {
  /**
   * Response payload data returned from the API
   */
  data: T
  /**
   * HTTP status code of the response (e.g., 200, 404, 500)
   */
  status: number
  /**
   * HTTP response headers containing metadata about the response
   */
  headers: Headers
}

/**
 * ApiError
 * Type representing an API error with message, status code, error code, and additional details.
 */
export type ApiError = {
  /**
   * Human-readable error message describing what went wrong
   */
  message: string
  /**
   * HTTP status code of the failed request (e.g., 400, 401, 500)
   */
  status?: number
  /**
   * Machine-readable error code for programmatic error handling (e.g., 'TIMEOUT', 'NETWORK_ERROR')
   */
  code?: string
  /**
   * Additional error details or context from the API response
   */
  details?: unknown
}

/**
 * RequestConfig
 * Configuration options for API requests including headers, query parameters, abort signal, and timeout.
 */
export type RequestConfig = {
  /**
   * Custom HTTP headers to include in the request
   */
  headers?: Record<string, string>
  /**
   * Query parameters to append to the request URL
   */
  params?: Record<string, unknown>
  /**
   * AbortSignal to cancel the request if needed
   */
  signal?: AbortSignal
  /**
   * Request timeout in milliseconds before aborting
   */
  timeout?: number
  /**
   * When true, skips automatic token refresh on 401 responses
   */
  skipAuthRefresh?: boolean
}

/**
 * IApiClient
 * Interface defining the contract for an API client with HTTP methods, authentication, and interceptor support.
 */
export type IApiClient = {
  get<T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>
  post<T = unknown>(
    url: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>
  put<T = unknown>(
    url: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>
  patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>
  delete<T = unknown>(
    url: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>

  // Token management
  setTokens(accessToken: string, refreshToken: string): void
  clearTokens(): void
  getAccessToken(): string | null
  getRefreshToken(): string | null

  // Interceptors
  addRequestInterceptor(interceptor: RequestInterceptor): void
  addResponseInterceptor(interceptor: ResponseInterceptor): void
}

/**
 * RequestInterceptor
 * Function type that intercepts and modifies outgoing API requests before they are sent.
 */
export type RequestInterceptor = (
  url: string,
  config: RequestInit,
) =>
  | {url: string; config: RequestInit}
  | Promise<{url: string; config: RequestInit}>

/**
 * ResponseInterceptor
 * Function type that intercepts and processes API responses before they are returned to the caller.
 */
export type ResponseInterceptor = (
  response: Response,
) => Response | Promise<Response>
