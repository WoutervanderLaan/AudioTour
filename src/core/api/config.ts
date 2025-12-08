const API_BASE_URL_DEV = 'http://localhost:8000'

/**
 * API configuration object containing base URL and URL construction helpers.
 *
 * The base URL is configurable via the EXPO_PUBLIC_API_BASE_URL environment
 * variable and defaults to localhost:8000 for development.
 */
export const ApiConfig = {
  /**
   * The base URL for all API requests.
   *
   * Configured via EXPO_PUBLIC_API_BASE_URL environment variable,
   * defaults to http://localhost:8000 in development.
   */
  apiBaseUrl:
    (process.env.EXPO_PUBLIC_API_BASE_URL as string | undefined) ||
    API_BASE_URL_DEV,

  /**
   * Constructs a full API URL from a relative path.
   *
   * Automatically handles leading slashes in the path parameter.
   *
   * @param path - The API endpoint path (with or without leading slash)
   * @returns The complete API URL
   *
   * @example
   * ```ts
   * ApiConfig.getUrl('/auth/login') // 'http://localhost:8000/auth/login'
   * ApiConfig.getUrl('auth/login')  // 'http://localhost:8000/auth/login'
   * ```
   */
  getUrl(path: string): string {
    const trimmed = path.startsWith('/') ? path.slice(1) : path

    return `${this.apiBaseUrl}/${trimmed}`
  },
}
