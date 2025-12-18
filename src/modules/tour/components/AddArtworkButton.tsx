import React from 'react'

import {useAddArtwork} from '../hooks/useAddArtwork'

import {Button} from '@/shared/components/ui/pressable'

/**
 * AddArtworkButtonProps
 * Props for the AddArtworkButton component
 */
type AddArtworkButtonProps = {
  /**
   * Optional disabled state
   */
  disabled?: boolean
  /**
   * Optional label override
   */
  label?: string
}

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
}: AddArtworkButtonProps): React.JSX.Element => {
  const {isLaunching, handleAddArtwork} = useAddArtwork()

  return (
    <Button
      label={label}
      onPress={handleAddArtwork}
      disabled={disabled || isLaunching}
    />
  )
}
