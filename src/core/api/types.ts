/**
 * ApiResponse
 * Generic type representing a successful API response with data, status code, and headers.
 */
export type ApiResponse<T = unknown> = {
  /**
   * data
   */
  data: T
  /**
   * status
   */
  status: number
  /**
   * headers
   */
  headers: Headers
}

/**
 * ApiError
 * Type representing an API error with message, status code, error code, and additional details.
 */
export type ApiError = {
  /**
   * message
   */
  message: string
  /**
   * status
   */
  status?: number
  /**
   * code
   */
  code?: string
  /**
   * details
   */
  details?: unknown
}

/**
 * RequestConfig
 * Configuration options for API requests including headers, query parameters, abort signal, and timeout.
 */
export type RequestConfig = {
  /**
   * headers
   */
  headers?: Record<string, string>
  /**
   * params
   */
  params?: Record<string, unknown>
  /**
   * signal
   */
  signal?: AbortSignal
  /**
   * timeout
   */
  timeout?: number
  /**
   * skipAuthRefresh
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
