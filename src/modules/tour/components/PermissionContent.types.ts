import type {PermissionContent as PermissionContentType} from '../utils/permissionContent'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * PermissionContentProps
 * Props for the PermissionContent component
 */
export type PermissionContentProps = {
  /**
   * Permission content configuration
   */
  content: PermissionContentType
} & TestProps<'PermissionContent'>
