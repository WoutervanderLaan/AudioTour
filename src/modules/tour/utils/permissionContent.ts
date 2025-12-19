import type MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {MediaSourceType} from '../services/cameraService'

/**
 * PermissionBenefit
 * Represents a single benefit of granting permission
 */
export type PermissionBenefit = {
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
}

/**
 * PermissionContent
 * Configuration for permission screen content
 */
export type PermissionContent = {
  /**
   * Screen title
   */
  title: string
  /**
   * Header icon name
   */
  icon: keyof typeof MaterialIcons.glyphMap
  /**
   * Description text
   */
  description: string
  /**
   * Primary action button label
   */
  primaryButtonLabel: string
  /**
   * List of benefits
   */
  benefits: PermissionBenefit[]
}

/**
 * CAMERA_PERMISSION_BENEFITS
 * List of benefits for camera permission
 */
const CAMERA_PERMISSION_BENEFITS: PermissionBenefit[] = [
  {
    icon: 'camera-alt',
    title: 'Capture Objects',
    description: 'Take photos of artworks and exhibits to add to your tour',
  },
  {
    icon: 'auto-stories',
    title: 'AI-Generated Narratives',
    description: 'Get personalized stories about each object you capture',
  },
  {
    icon: 'headphones',
    title: 'Audio Tours',
    description: 'Listen to immersive audio content as you explore',
  },
]

/**
 * LIBRARY_PERMISSION_BENEFITS
 * List of benefits for photo library permission
 */
const LIBRARY_PERMISSION_BENEFITS: PermissionBenefit[] = [
  {
    icon: 'camera-alt',
    title: 'Capture Objects',
    description: 'Take photos of artworks and exhibits to add to your tour',
  },
  {
    icon: 'auto-stories',
    title: 'AI-Generated Narratives',
    description: 'Get personalized stories about each object you capture',
  },
  {
    icon: 'headphones',
    title: 'Audio Tours',
    description: 'Listen to immersive audio content as you explore',
  },
]

/**
 * getPermissionContent
 * Returns the appropriate content configuration based on the source type
 *
 * @param sourceType - The media source type (camera or library)
 * @returns Permission content configuration
 */
export const getPermissionContent = (
  sourceType: MediaSourceType,
): PermissionContent => {
  const isCamera = sourceType === MediaSourceType.camera

  return {
    title: isCamera
      ? 'Camera Access Required'
      : 'Photo Library Access Required',
    icon: isCamera ? 'photo-camera' : 'photo-library',
    description: isCamera
      ? 'To capture photos of museum objects, we need access to your camera. This allows you to create personalized audio tours.'
      : 'To select photos of museum objects, we need access to your photo library. This allows you to create personalized audio tours.',
    primaryButtonLabel: isCamera ? 'Enable Camera' : 'Enable Photo Library',
    benefits: isCamera
      ? CAMERA_PERMISSION_BENEFITS
      : LIBRARY_PERMISSION_BENEFITS,
  }
}
