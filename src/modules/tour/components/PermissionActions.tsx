import React from 'react'

import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'
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

/**
 * PermissionActions
 * Displays the action buttons for permission requests
 *
 * @param props - Component props
 * @returns Permission action buttons
 */
export const PermissionActions = ({
  primaryButtonLabel,
  isDisabled,
  onPrimaryAction,
  onSkip,
  onOpenSettings,
  testID,
}: PermissionActionsProps): React.JSX.Element => {
  return (
    <Column
      gap="sm"
      testID={`${testID}ContainerColumn`}>
      <Button
        label={primaryButtonLabel}
        onPress={onPrimaryAction}
        disabled={isDisabled}
        testID={`${testID}PrimaryButton`}
      />
      <Button
        label="Not Now"
        variant="secondary"
        onPress={onSkip}
        disabled={isDisabled}
        testID={`${testID}NotNowButton`}
      />
      <Button
        label="Open Settings"
        variant="secondary"
        onPress={onOpenSettings}
        disabled={isDisabled}
        testID={`${testID}OpenSettingsButton`}
      />
    </Column>
  )
}
