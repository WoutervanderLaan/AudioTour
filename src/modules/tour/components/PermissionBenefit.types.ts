import type MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * PermissionBenefitProps
 * Props for the PermissionBenefit component
 */
export type PermissionBenefitProps = {
  /**
   * Icon name from MaterialIcons
   */
  icon: keyof typeof MaterialIcons.glyphMap
  /**
   * Benefit title
   */
  title: string
  /**
   * Benefit description
   */
  description: string
} & TestProps<'PermissionBenefit'>
