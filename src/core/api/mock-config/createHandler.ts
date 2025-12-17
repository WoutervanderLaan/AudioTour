import {ApiConfig} from '../config'

/**
 * createHandler
 * A simple utility that appends the provided path to the base url.
 *
 * @param path - API path (e.g., '/user')
 * @returns Full URL string
 */
export const createHandler = (path: string): string => {
  return ApiConfig.getUrl(path)
}
