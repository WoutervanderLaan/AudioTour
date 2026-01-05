import type {RouteProp} from '@react-navigation/native'

import type {TourModalName, TourModalParams} from '../routes.types'

/**
 * TourCameraPermissionScreenProps
 * Props for the TourCameraPermissionScreen
 */
export type TourCameraPermissionScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourModalParams, TourModalName.cameraPermission>
}
