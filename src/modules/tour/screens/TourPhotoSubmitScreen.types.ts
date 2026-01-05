import type {RouteProp} from '@react-navigation/native'

import type {TourModalName, TourModalParams} from '../routes.types'

/**
 * TourPhotoSubmitScreenProps
 * Props for the TourPhotoSubmitScreen
 */
export type TourPhotoSubmitScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourModalParams, TourModalName.photoSubmit>
}
