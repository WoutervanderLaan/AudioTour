import type {AuthStackParams} from './auth/routes'
import type {OldModalParams, OldStackParams} from './old/routes'

import {RootStackParams, StackNavigationRoutes} from '@/core/navigation/types'

/**
 * ModuleStackParams
 * Combined type of all route parameters from all registered modules.
 * This type is the union of all module-specific stack parameter types,
 * enabling type-safe navigation across all module routes.
 */
export type ModuleStackParams = AuthStackParams & OldStackParams

/**
 * ModalParams
 * Combined type of all modal route parameters from all registered modules.
 * This type is the union of all module-specific modal parameter types,
 * enabling type-safe modal navigation across all module routes.
 */
export type ModalParams = OldModalParams

export const modals: StackNavigationRoutes<RootStackParams> = {
  //   ...authModals,
}
