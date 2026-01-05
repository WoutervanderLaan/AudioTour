import type {TestProps} from '@/shared/types/TestProps'

/**
 * PermissionActionsProps
 * Props for the PermissionActions component
 */
export type PermissionActionsProps = {
  /**
   * Label for the primary action button
   */
  primaryButtonLabel: string
  /**
   * Whether actions are disabled (during request)
   */
  isDisabled: boolean
  /**
   * Handler for primary action (enable permission)
   */
  onPrimaryAction: () => void
  /**
   * Handler for skip action
   */
  onSkip: () => void
  /**
   * Handler for opening settings
   */
  onOpenSettings: () => void
} & TestProps<'PermissionActions'>
