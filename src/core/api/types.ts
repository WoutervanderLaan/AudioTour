/**
 * ApiResponse
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
}

/**
 * IApiClient
 * TODO: describe what this type represents.
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

  // Token/auth management
  setAuthToken(token: string | null): void
  getAuthToken(): string | null

  // Interceptors
  addRequestInterceptor(interceptor: RequestInterceptor): void
  addResponseInterceptor(interceptor: ResponseInterceptor): void
}

/**
 * RequestInterceptor
 * TODO: describe what this type represents.
 */
export type RequestInterceptor = (
  url: string,
  config: RequestInit,
) =>
  | {url: string; config: RequestInit}
  | Promise<{url: string; config: RequestInit}>

/**
 * ResponseInterceptor
 * TODO: describe what this type represents.
 */
export type ResponseInterceptor = (
  response: Response,
) => Response | Promise<Response>
