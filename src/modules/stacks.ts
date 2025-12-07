import type {AuthStackParams} from './auth/routes'
import type {OldModalParams, OldStackParams} from './old/routes'

import {RootStackParams, StackNavigationRoutes} from '@/core/navigation/types'

/**
 * ModuleStackParams
 * TODO: describe what this type represents.
 */
export type ModuleStackParams = AuthStackParams & OldStackParams

/**
 * ModalParams
 * TODO: describe what this type represents.
 */
export type ModalParams = OldModalParams

export const modals: StackNavigationRoutes<RootStackParams> = {
  //   ...authModals,
}
