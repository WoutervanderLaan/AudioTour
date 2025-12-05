import type {ModuleRoute} from '@/shared/types/module'

/**
 * Helper type to extract parameter types from an array of module routes.
 * Converts ModuleRoute[] into a ParamList object where keys are route names
 * and values are their parameter types.
 *
 * @example
 * const routes = [
 *   {name: 'Home', params: undefined, ...},
 *   {name: 'Profile', params: {userId: string}, ...}
 * ]
 * // Result: {Home: undefined, Profile: {userId: string}}
 */
export type ExtractParamList<T extends readonly ModuleRoute[]> = {
  [K in T[number]['name']]: Extract<T[number], {name: K}>['params']
}

/**
 * Utility to build a param list type from module routes at runtime.
 * This is used to dynamically generate RootStackParamList and HomeTabsParamList
 * from module configurations.
 *
 * @param routes - Array of module routes
 * @returns Type-safe param list object
 */
export const buildParamList = <T extends readonly ModuleRoute[]>(
  routes: T,
): ExtractParamList<T> => {
  return {} as ExtractParamList<T>
}
