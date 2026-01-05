import type {RouteProp} from '@react-navigation/native'

import type {TourRouteName, TourStackParams} from '../routes.types'

/**
 * TourObjectDetailScreenProps
 * Props for the TourObjectDetailScreen
 */
export type TourObjectDetailScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, TourRouteName.objectDetail>
}
