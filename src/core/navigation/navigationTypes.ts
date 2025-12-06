import type {ModuleRoute} from './types'

/**
 * Helper type to extract parameter types from an array of module routes.
 * Converts ModuleRoute[] into a ParamList object where keys are route names
 * and values are their parameter types.
 *
 * This is a compile-time-only utility type used to generate RootStackParamList
 * and HomeTabsParamList from module route definitions. It provides full type
 * safety for navigation parameters without any runtime overhead.
 *
 * @example
 * const routes = [
 *   {name: 'Home', params: undefined, ...},
 *   {name: 'Profile', params: {userId: string}, ...}
 * ] as const
 *
 * type ParamList = ExtractParamList<typeof routes>
 * // Result: {Home: undefined, Profile: {userId: string}}
 */
export type ExtractParamList<T extends readonly ModuleRoute[]> = {
  [K in T[number]['name']]: Extract<T[number], {name: K}>['params']
}
