import React from 'react'

import {useAddArtwork} from '../hooks/useAddArtwork'
import type {AddArtworkButtonProps} from './AddArtworkButton.types'

import {Button} from '@/shared/components/ui/pressable/Button'

/**
 * AddArtworkButton
 * Self-contained button component that handles adding artwork via camera or library.
 * Manages permission checks, requests, and launching the appropriate picker.
 * Shows an action sheet to let user choose between camera and photo library.
 *
 * @param props - Component props
 * @returns Add artwork button component
 */
export const AddArtworkButton = ({
  disabled = false,
  label = 'New Artwork',
  testID,
}: AddArtworkButtonProps): React.JSX.Element => {
  const {isLaunching, handleAddArtwork} = useAddArtwork()

  return (
    <Button
      label={label}
      onPress={handleAddArtwork}
      disabled={disabled || isLaunching}
      testID={testID}
    />
  )
}
