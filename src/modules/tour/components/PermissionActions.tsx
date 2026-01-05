import React from 'react'

import type {PermissionActionsProps} from './PermissionActions.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'

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
      testID={`${testID}Container`}>
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
