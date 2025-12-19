import {useState} from 'react'

/**
 * UsePhotoGalleryResult
 * Return type for usePhotoGallery hook
 */
export type UsePhotoGalleryResult = {
  /**
   * Currently active photo index
   */
  activePhotoIndex: number
  /**
   * Sets the active photo index
   */
  setActivePhotoIndex: (index: number) => void
}

/**
 * usePhotoGallery
 * Hook for managing photo gallery state
 *
 * @returns Photo gallery state and handlers
 */
export const usePhotoGallery = (): UsePhotoGalleryResult => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  return {
    activePhotoIndex,
    setActivePhotoIndex,
  }
}
