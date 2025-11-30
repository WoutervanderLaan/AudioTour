import {ApiConfig} from '@/shared/api/config'

/**
 * Represents an error response from the API with status code and error details.
 *
 * This type is used throughout the application to handle API errors consistently.
 * It includes the HTTP status code, a human-readable error message, and optional
 * additional details from the API response body.
 */
export type ApiError = {
  /**
   * status
   */
  status: number
  /**
   * message
   */
  message: string
  /**
   * details
   */
  details?: unknown
}

/**
 * Processes a failed API response and throws a formatted ApiError.
 *
 * Attempts to extract a meaningful error message from the response body.
 * For JSON responses, it looks for common error properties (message, detail).
 * For non-JSON responses, it attempts to read the response as text.
 * Falls back to the HTTP statusText if no message can be extracted.
 *
 * @param {Response} res - The failed fetch Response object
 * @param {boolean} isJson - Whether the response Content-Type indicates JSON
 * @returns {Promise<void>} This function always throws and never returns normally
 * @throws {ApiError} Always throws an ApiError with status, message, and optional details
 */
async function handleResponseError(
  res: Response,
  isJson: boolean,
): Promise<void> {
  let message = res.statusText ?? 'Request failed'
  let details: unknown = undefined

  if (isJson) {
    try {
      const body = await res.json()

      message = body?.message || body?.detail || message
      details = body
    } catch (err) {
      console.warn('Error converting response to json in !res.ok block: ', err)
    }
  } else {
    try {
      const text = await res.text()
      if (text) message = text
    } catch (err) {
      console.warn('Error converting response to text in !res.ok block: ', err)
    }
  }

  throw {status: res.status, message, details} as ApiError
}

/**
 * Processes a fetch Response and returns the parsed response body.
 *
 * Checks the response status and Content-Type header to determine how to parse
 * the response body. For successful JSON responses, returns the parsed JSON.
 * For successful non-JSON responses, returns the response as a Blob.
 * For failed responses, delegates to handleResponseError to throw an ApiError.
 *
 * @template T - The expected type of the parsed response body
 * @param {Response} res - The fetch Response object to process
 * @returns {Promise<T>} A promise resolving to the parsed response body
 * @throws {ApiError} When the response status indicates failure (!res.ok)
 */
async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  if (!res.ok) {
    await handleResponseError(res, isJson)
  }

  if (isJson) {
    const payload = await res.json()
    console.log(payload)
    return payload as T
  }

  const blob = await res.blob()
  return blob as T
}

/**
 * HTTP client for interacting with the AudioTour backend API.
 *
 * This class provides methods for all API endpoints including:
 * - Photo upload and object recognition
 * - AI narrative generation
 * - Text-to-speech audio generation
 * - Museum object listing
 * - Personalized recommendations
 *
 * The client handles request formatting, response parsing, and error handling
 * consistently across all endpoints. It uses the configured API base URL from
 * ApiConfig and automatically parses JSON responses or returns Blobs for binary data.
 *
 * @example
 * ```typescript
 * const api = new ApiClient()
 * const result = await api.uploadPhoto({ uri: 'file://photo.jpg' })
 * console.log(result.object_id)
 * ```
 */
export class ApiClient {
  // TODO: add session based info and user data to instance of ApiClient
  // TODO: add interceptors

  private _url(path: string): string {
    return ApiConfig.getUrl(path)
  }

  async uploadPhoto(params: {
    uri: string
    metadata?: Record<string, unknown>
  }): Promise<{
    object_id: string
    recognition_confidence: number
  }> {
    const form = new FormData()
    const photo = await fetch(params.uri)
    const photoBlob = await photo.blob()

    form.append('photos', photoBlob, 'photo.jpg')
    form.append('photos', photoBlob, 'photo.jpg')

    const url = new URL(this._url('/process-artwork'))

    if (params.metadata) {
      url.searchParams.append('metadata', JSON.stringify(params.metadata))
    }

    const res = await fetch(url.toString(), {
      method: 'POST',
      body: form,
    })

    return handleResponse<{
      object_id: string
      recognition_confidence: number
    }>(res)
  }

  async generateNarrative(params: {
    object_id: string
    user_session_id: string
  }): Promise<{
    text: string
  }> {
    const res = await fetch(this._url('/generate-narrative'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    })

    return handleResponse<{text: string}>(res)
  }

  async generateAudio(params: {text: string}): Promise<{
    audio_url: string
  }> {
    const res = await fetch(this._url('/generate-audio'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    })

    return handleResponse<{audio_url: string}>(res)
  }

  async listMuseumObjects(museumId: string): Promise<
    {
      id: string
      name: string
      artist?: string
      date?: string
      image_url?: string
      generated_text?: string
      generated_audio?: string
      metadata?: Record<string, unknown>
    }[]
  > {
    const res = await fetch(
      this._url(`/museum-objects/${encodeURIComponent(museumId)}`),
    )

    return handleResponse<
      Array<{
        id: string
        name: string
        artist?: string
        date?: string
        image_url?: string
        generated_text?: string
        generated_audio?: string
        metadata?: Record<string, unknown>
      }>
    >(res)
  }

  async recommendations(params: {
    user_session_id: string
    current_museum_id?: string
  }): Promise<
    {
      object_id: string
      score?: number
    }[]
  > {
    const searchParams = new URLSearchParams()

    searchParams.append('user_session_id', params.user_session_id)

    if (params.current_museum_id) {
      searchParams.append('current_museum_id', params.current_museum_id)
    }

    const res = await fetch(
      this._url(`/recommendations?${searchParams.toString()}`),
    )

    return handleResponse<Array<{object_id: string; score?: number}>>(res)
  }
}
