import {Linking, Platform} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import {logger} from '@/core/lib/logger'

/**
 * MediaSourceType
 * Type of media source to launch
 */
export enum MediaSourceType {
  camera = 'camera',
  library = 'library',
}

/**
 * PermissionStatus
 * Possible permission states for camera/library access
 */
export type PermissionStatus = 'granted' | 'denied' | 'not_determined'

/**
 * CameraLaunchResult
 * Result from launching camera or library picker
 */
export type CameraLaunchResult = {
  /**
   * Whether the user canceled the picker
   */
  canceled: boolean
  /**
   * URI of the selected/captured image, if successful
   */
  uri?: string
}

/** Singleton service for managing camera and photo library permissions */
class CameraService {
  /**
   * Requests camera permission from the user
   *
   * @returns A promise that resolves to the permission status after the request
   */
  async requestCameraPermission(): Promise<PermissionStatus> {
    try {
      const {status} = await ImagePicker.requestCameraPermissionsAsync()
      const permissionStatus = this.mapPermissionStatus(status)

      if (permissionStatus === 'granted') {
        logger.success('[CameraService] Camera permission granted')
      } else {
        logger.warn(`[CameraService] Camera permission ${permissionStatus}`)
      }

      return permissionStatus
    } catch (error) {
      logger.error('[CameraService] Camera permission request failed:', error)
      return 'denied'
    }
  }

  /**
   * Requests media library permission from the user
   *
   * @returns A promise that resolves to the permission status after the request
   */
  async requestLibraryPermission(): Promise<PermissionStatus> {
    try {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
      const permissionStatus = this.mapPermissionStatus(status)

      if (permissionStatus === 'granted') {
        logger.success('[CameraService] Library permission granted')
      } else {
        logger.warn(`[CameraService] Library permission ${permissionStatus}`)
      }

      return permissionStatus
    } catch (error) {
      logger.error(
        '[CameraService] Library permission request failed:',
        error,
      )
      return 'denied'
    }
  }

  /**
   * Checks the current camera permission status without prompting
   *
   * @returns A promise that resolves to the current permission status
   */
  async checkCameraPermission(): Promise<PermissionStatus> {
    try {
      const {status} = await ImagePicker.getCameraPermissionsAsync()
      return this.mapPermissionStatus(status)
    } catch (error) {
      logger.error('[CameraService] Check camera permission failed:', error)
      return 'denied'
    }
  }

  /**
   * Checks the current media library permission status without prompting
   *
   * @returns A promise that resolves to the current permission status
   */
  async checkLibraryPermission(): Promise<PermissionStatus> {
    try {
      const {status} = await ImagePicker.getMediaLibraryPermissionsAsync()
      return this.mapPermissionStatus(status)
    } catch (error) {
      logger.error('[CameraService] Check library permission failed:', error)
      return 'denied'
    }
  }

  /**
   * Maps ImagePicker permission status to PermissionStatus
   *
   * @param status - The ImagePicker permission status to map
   * @returns The corresponding PermissionStatus value
   */
  private mapPermissionStatus(
    status: ImagePicker.PermissionStatus,
  ): PermissionStatus {
    if (status === ImagePicker.PermissionStatus.GRANTED) return 'granted'
    if (status === ImagePicker.PermissionStatus.DENIED) return 'denied'
    return 'not_determined'
  }

  /**
   * Opens the device settings for this app
   *
   * @returns A promise that resolves when the settings screen is opened
   */
  async openSettings(): Promise<void> {
    try {
      await Linking.openSettings()
      logger.debug('[CameraService] Opening app settings')
    } catch (error) {
      logger.error('[CameraService] Failed to open settings:', error)
    }
  }

  /**
   * Launches the camera to capture a photo
   *
   * @returns A promise that resolves to the camera result
   */
  async launchCamera(): Promise<CameraLaunchResult> {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (result.canceled) {
        logger.debug('[CameraService] Camera canceled by user')
        return {canceled: true}
      }

      const uri = result.assets?.[0]?.uri
      if (uri) {
        logger.success('[CameraService] Photo captured:', uri)
        return {canceled: false, uri}
      }

      logger.warn('[CameraService] No photo URI in result')
      return {canceled: true}
    } catch (error) {
      logger.error('[CameraService] Failed to launch camera:', error)
      throw error
    }
  }

  /**
   * Launches the photo library picker
   *
   * @returns A promise that resolves to the picker result
   */
  async launchLibrary(): Promise<CameraLaunchResult> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (result.canceled) {
        logger.debug('[CameraService] Library picker canceled by user')
        return {canceled: true}
      }

      const uri = result.assets?.[0]?.uri
      if (uri) {
        logger.success('[CameraService] Photo selected:', uri)
        return {canceled: false, uri}
      }

      logger.warn('[CameraService] No photo URI in result')
      return {canceled: true}
    } catch (error) {
      logger.error('[CameraService] Failed to launch library:', error)
      throw error
    }
  }
}

/**
 * Singleton instance of the CameraService
 */
export const cameraService = new CameraService()
